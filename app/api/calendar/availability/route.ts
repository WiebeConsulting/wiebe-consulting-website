import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const TIMEZONE = 'America/New_York' // EST/EDT

// Initialize Google Calendar API
function getCalendarClient() {
  const auth = new google.auth.GoogleAuth({
    credentials: {
      client_email: process.env.GOOGLE_CLIENT_EMAIL,
      private_key: process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    },
    scopes: ['https://www.googleapis.com/auth/calendar'],
  })

  return google.calendar({ version: 'v3', auth })
}

// Business hours configuration
const BUSINESS_HOURS = {
  // Sunday-Thursday: 7am-4pm EST
  0: { start: 7, end: 16 }, // Sunday
  1: { start: 7, end: 16 }, // Monday
  2: { start: 7, end: 16 }, // Tuesday
  3: { start: 7, end: 16 }, // Wednesday
  4: { start: 7, end: 16 }, // Thursday
  5: { start: 7, end: 10 }, // Friday: 7am-10am EST
  6: null, // Saturday: closed
}

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const date = searchParams.get('date')

    if (!date) {
      return NextResponse.json({ error: 'Date parameter required' }, { status: 400 })
    }

    // Parse the requested date
    const requestedDate = new Date(date + 'T00:00:00')
    const dayOfWeek = requestedDate.getDay()

    // Check if day is available
    const hours = BUSINESS_HOURS[dayOfWeek as keyof typeof BUSINESS_HOURS]
    if (!hours) {
      return NextResponse.json({ bookedSlots: [], availableSlots: [] })
    }

    // Get calendar events for the day
    const calendar = getCalendarClient()

    const startOfDay = new Date(date + 'T00:00:00')
    const endOfDay = new Date(date + 'T23:59:59')

    const response = await calendar.events.list({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      timeMin: startOfDay.toISOString(),
      timeMax: endOfDay.toISOString(),
      singleEvents: true,
      orderBy: 'startTime',
      timeZone: TIMEZONE,
    })

    const events = response.data.items || []

    // Extract booked time slots
    const bookedSlots: string[] = []
    events.forEach((event) => {
      if (event.start?.dateTime) {
        const eventStart = new Date(event.start.dateTime)
        const timeString = eventStart.toISOString().split('T')[1].substring(0, 5)
        bookedSlots.push(`${date}T${timeString}`)
      }
    })

    return NextResponse.json({
      bookedSlots,
      businessHours: hours,
    })

  } catch (error) {
    console.error('Calendar availability error:', error)
    return NextResponse.json(
      { error: 'Failed to fetch availability' },
      { status: 500 }
    )
  }
}
