import { NextRequest, NextResponse } from 'next/server'
import { google } from 'googleapis'
import { format } from 'date-fns'
import { sendEmail, scheduleEmail } from '@/lib/email-service'
import { emailTemplates } from '@/lib/email-templates'

const TIMEZONE = 'America/New_York' // EST/EDT
const CALENDAR_EMAIL = 'ben@wiebe-consulting.com'
const YOUR_NAME = 'Ben Wiebe'
const RESCHEDULE_LINK = process.env.RESCHEDULE_LINK || 'https://wiebe-consulting.com'
const ZOOM_PMI_LINK = 'https://zoom.us/j/4473767236'

// Initialize Google Calendar API (returns null if not configured)
function getCalendarClient() {
  if (!process.env.GOOGLE_CLIENT_EMAIL || !process.env.GOOGLE_PRIVATE_KEY) {
    console.warn('Google Calendar not configured - skipping calendar event creation')
    return null
  }

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

    // Create Google Calendar event (if configured)
    const calendar = getCalendarClient()
    let calendarEventId = null
    let calendarEventLink = null

    if (calendar) {
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

      try {
        const response = await calendar.events.insert({
          calendarId: process.env.GOOGLE_CALENDAR_ID || 'primary',
          requestBody: event,
          sendUpdates: 'none', // We'll send our own custom emails
          conferenceDataVersion: zoomMeeting ? 1 : 0,
        })
        calendarEventId = response.data.id
        calendarEventLink = response.data.htmlLink
      } catch (calendarError) {
        console.error('Google Calendar error (continuing without calendar):', calendarError)
      }
    }

    // Format time slot for emails
    const timeSlot = format(startTime, 'h:mm a')

    // Prepare email template data (use PMI link, or Zoom API link if available)
    const emailData = {
      firstName,
      date: startTime,
      timeSlot,
      timezone: 'EST',
      zoomLink: zoomMeeting?.joinUrl || ZOOM_PMI_LINK,
      rescheduleLink: RESCHEDULE_LINK,
      yourName: YOUR_NAME
    }

    // 1) Send immediate confirmation email
    const immediateEmail = emailTemplates.immediateConfirmation(emailData)
    await sendEmail({
      to: email,
      subject: immediateEmail.subject,
      html: immediateEmail.html,
      text: immediateEmail.text
    })

    // 2) Schedule 3 days before email
    const threeDaysBeforeTime = new Date(startTime.getTime() - 3 * 24 * 60 * 60 * 1000)
    const threeDaysEmail = emailTemplates.threeDaysBefore(emailData)
    await scheduleEmail({
      to: email,
      subject: threeDaysEmail.subject,
      html: threeDaysEmail.html,
      text: threeDaysEmail.text,
      scheduledFor: threeDaysBeforeTime
    })

    // 3) Schedule 24 hours before email
    const oneDayBeforeTime = new Date(startTime.getTime() - 24 * 60 * 60 * 1000)
    const oneDayEmail = emailTemplates.oneDayBefore(emailData)
    await scheduleEmail({
      to: email,
      subject: oneDayEmail.subject,
      html: oneDayEmail.html,
      text: oneDayEmail.text,
      scheduledFor: oneDayBeforeTime
    })

    // 4) Schedule 6 hours before email
    const sixHoursBeforeTime = new Date(startTime.getTime() - 6 * 60 * 60 * 1000)
    const sixHoursEmail = emailTemplates.sixHoursBefore(emailData)
    await scheduleEmail({
      to: email,
      subject: sixHoursEmail.subject,
      html: sixHoursEmail.html,
      text: sixHoursEmail.text,
      scheduledFor: sixHoursBeforeTime
    })

    // 5) Schedule 1 hour before email
    const oneHourBeforeTime = new Date(startTime.getTime() - 60 * 60 * 1000)
    const oneHourEmail = emailTemplates.oneHourBefore(emailData)
    await scheduleEmail({
      to: email,
      subject: oneHourEmail.subject,
      html: oneHourEmail.html,
      text: oneHourEmail.text,
      scheduledFor: oneHourBeforeTime
    })

    return NextResponse.json({
      success: true,
      eventId: calendarEventId,
      eventLink: calendarEventLink,
      zoomLink: zoomMeeting?.joinUrl,
      message: 'Booking confirmed! Check your email for confirmation and Zoom link.',
    })

  } catch (error) {
    console.error('Booking error:', error)
    return NextResponse.json(
      { error: 'Failed to create booking. Please try again or contact support.' },
      { status: 500 }
    )
  }
}
