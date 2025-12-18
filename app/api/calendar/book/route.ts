import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'

const TIMEZONE = 'America/New_York' // EST/EDT
const CALENDAR_EMAIL = 'ben@wiebe-consulting.com'

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

// Create Zoom meeting
async function createZoomMeeting(firstName: string, lastName: string, startTime: Date) {
  try {
    const response = await fetch('https://api.zoom.us/v2/users/me/meetings', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.ZOOM_ACCESS_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        topic: `Fit Call with ${firstName} ${lastName}`,
        type: 2, // Scheduled meeting
        start_time: startTime.toISOString(),
        duration: 45, // 45 minutes (displayed as 30 to client)
        timezone: TIMEZONE,
        settings: {
          host_video: true,
          participant_video: true,
          join_before_host: false,
          mute_upon_entry: true,
          watermark: false,
          use_pmi: false,
          approval_type: 0, // Automatically approve
          audio: 'both',
          auto_recording: 'cloud',
        },
      }),
    })

    if (!response.ok) {
      throw new Error('Failed to create Zoom meeting')
    }

    const data = await response.json()
    return {
      joinUrl: data.join_url,
      meetingId: data.id,
    }
  } catch (error) {
    console.error('Zoom meeting creation error:', error)
    // Return null if Zoom fails - we'll still create the calendar event
    return null
  }
}

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { dateTime, firstName, lastName, email, clinicName, phone } = body

    // Validate required fields
    if (!dateTime || !firstName || !lastName || !email || !clinicName || !phone) {
      return NextResponse.json(
        { error: 'All fields are required' },
        { status: 400 }
      )
    }

    // Parse datetime and create 45-minute event
    const startTime = new Date(dateTime)
    const endTime = new Date(startTime.getTime() + 45 * 60000) // 45 minutes in milliseconds

    // Create Zoom meeting
    const zoomMeeting = await createZoomMeeting(firstName, lastName, startTime)

    // Prepare event description
    const description = `
Fit Call with ${firstName} ${lastName}

Clinic: ${clinicName}
Email: ${email}
Phone: ${phone}

${zoomMeeting ? `Zoom Link: ${zoomMeeting.joinUrl}` : 'Zoom link will be added separately'}

---
Action Required: Please reply to the confirmation email with:
- Your best guess at current monthly revenue
- How many active patients are in your EMR
    `.trim()

    // Create Google Calendar event
    const calendar = getCalendarClient()

    const event = {
      summary: `Fit Call - ${firstName} ${lastName} (${clinicName})`,
      description,
      start: {
        dateTime: startTime.toISOString(),
        timeZone: TIMEZONE,
      },
      end: {
        dateTime: endTime.toISOString(),
        timeZone: TIMEZONE,
      },
      attendees: [
        { email, displayName: `${firstName} ${lastName}` },
      ],
      reminders: {
        useDefault: false,
        overrides: [
          { method: 'email', minutes: 60 }, // 1 hour before
          { method: 'email', minutes: 360 }, // 6 hours before
          { method: 'email', minutes: 1440 }, // 24 hours before
          { method: 'email', minutes: 4320 }, // 3 days before
          { method: 'popup', minutes: 60 }, // 1 hour before
        ],
      },
      conferenceData: zoomMeeting
        ? {
            entryPoints: [
              {
                entryPointType: 'video',
                uri: zoomMeeting.joinUrl,
                label: 'Zoom Meeting',
              },
            ],
            conferenceSolution: {
              name: 'Zoom Meeting',
              iconUri: 'https://zoom.us/favicon.ico',
            },
          }
        : undefined,
      guestsCanModify: false,
      guestsCanInviteOthers: false,
      guestsCanSeeOtherGuests: false,
    }

    const response = await calendar.events.insert({
      calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
      requestBody: event,
      sendUpdates: 'all', // Send email to attendees
      conferenceDataVersion: zoomMeeting ? 1 : 0,
    })

    return NextResponse.json({
      success: true,
      eventId: response.data.id,
      eventLink: response.data.htmlLink,
      zoomLink: zoomMeeting?.joinUrl,
      message: 'Booking confirmed! Calendar invite sent to your email.',
    })

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking. Please try again or contact support.' },
      { status: 500 }
    )
  }
}
