import { Resend } from 'resend'

// Initialize Resend only when API key is available (not during build)
const getResendClient = () => {
  if (!process.env.RESEND_API_KEY) {
    console.warn('RESEND_API_KEY not configured')
    return null
  }
  return new Resend(process.env.RESEND_API_KEY)
}

interface SendEmailParams {
  to: string
  subject: string
  html: string
  text: string
  from?: string
  replyTo?: string
}

export async function sendEmail({
  to,
  subject,
  html,
  text,
  from = process.env.EMAIL_FROM || 'Ben Wiebe <ben@wiebe-consulting.com>',
  replyTo = process.env.EMAIL_REPLY_TO || 'ben@wiebe-consulting.com'
}: SendEmailParams) {
  try {
    const resend = getResendClient()
    if (!resend) {
      console.warn('Email not sent - Resend not configured')
      return { success: false, error: 'Resend not configured' }
    }

    const data = await resend.emails.send({
      from,
      to,
      replyTo,
      subject,
      html,
      text
    })

    console.log('Email sent successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error sending email:', error)
    return { success: false, error }
  }
}

interface ScheduleEmailParams extends SendEmailParams {
  scheduledFor: Date
}

export async function scheduleEmail({
  to,
  subject,
  html,
  text,
  scheduledFor,
  from,
  replyTo
}: ScheduleEmailParams) {
  try {
    const resend = getResendClient()
    if (!resend) {
      console.warn('Email not scheduled - Resend not configured')
      return { success: false, error: 'Resend not configured' }
    }

    // Resend supports scheduled emails via their API
    const data = await resend.emails.send({
      from: from || process.env.EMAIL_FROM || 'Ben Wiebe <ben@wiebe-consulting.com>',
      to,
      replyTo: replyTo || process.env.EMAIL_REPLY_TO || 'ben@wiebe-consulting.com',
      subject,
      html,
      text,
      scheduledAt: scheduledFor.toISOString()
    })

    console.log('Email scheduled successfully:', data)
    return { success: true, data }
  } catch (error) {
    console.error('Error scheduling email:', error)
    return { success: false, error }
  }
}
