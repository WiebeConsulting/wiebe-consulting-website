import { format } from 'date-fns'

interface EmailTemplateProps {
  firstName: string
  date: Date
  timeSlot: string
  timezone: string
  zoomLink: string
  rescheduleLink?: string
  yourName?: string
}

export const emailTemplates = {
  // 1) Immediate confirmation (on booking)
  immediateConfirmation: ({
    firstName,
    date,
    timeSlot,
    timezone,
    zoomLink,
    rescheduleLink = '#',
    yourName = 'Ben Wiebe'
  }: EmailTemplateProps) => ({
    subject: `You're booked: Revenue & Retention Gameplan on ${format(date, 'EEEE')}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <p style="font-size: 16px; line-height: 1.6;">Hey ${firstName},</p>

        <p style="font-size: 16px; line-height: 1.6;">You're all set for your 15‑minute <strong>Revenue & Retention Gameplan Call</strong>.</p>

        <div style="background: #f8fafc; border-left: 4px solid #0ea5e9; padding: 20px; margin: 24px 0;">
          <p style="margin: 8px 0;"><strong>When:</strong> ${format(date, 'EEEE, MMMM d, yyyy')} at ${timeSlot} ${timezone}</p>
          <p style="margin: 8px 0;"><strong>Who:</strong> ${yourName}</p>
          <p style="margin: 8px 0;"><strong>Where:</strong> Zoom – <a href="${zoomLink}" style="color: #0ea5e9; text-decoration: none;">${zoomLink}</a></p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;"><strong>On this call we'll:</strong></p>
        <ul style="font-size: 16px; line-height: 1.8; padding-left: 20px;">
          <li>Get a rough picture of your no‑shows, drop‑offs, and lapsed patients</li>
          <li>Estimate how much additional revenue is sitting in your EMR</li>
          <li>See if the 60‑Day Sports PT Revenue & Retention Sprint makes sense for your clinic</li>
        </ul>

        <p style="font-size: 16px; line-height: 1.6;">If this time no longer works, you can reschedule here: <a href="${rescheduleLink}" style="color: #0ea5e9; text-decoration: none;">Reschedule Link</a></p>

        <p style="font-size: 16px; line-height: 1.6; margin-top: 32px;">Talk soon,<br>${yourName}</p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        <p style="font-size: 12px; color: #64748b; line-height: 1.5;">This is an automated reminder from Wiebe Consulting's scheduling system.</p>
      </div>
    `,
    text: `Hey ${firstName},

You're all set for your 15‑minute Revenue & Retention Gameplan Call.

When: ${format(date, 'EEEE, MMMM d, yyyy')} at ${timeSlot} ${timezone}
Who: ${yourName}
Where: Zoom – ${zoomLink}

On this call we'll:
- Get a rough picture of your no‑shows, drop‑offs, and lapsed patients
- Estimate how much additional revenue is sitting in your EMR
- See if the 60‑Day Sports PT Revenue & Retention Sprint makes sense for your clinic

If this time no longer works, you can reschedule here: ${rescheduleLink}

Talk soon,
${yourName}

---
This is an automated reminder from Wiebe Consulting's scheduling system.`
  }),

  // 2) 3 days before – light homework + value
  threeDaysBefore: ({
    firstName,
    date,
    timeSlot,
    timezone,
    zoomLink,
    yourName = 'Ben Wiebe'
  }: EmailTemplateProps) => ({
    subject: `Quick prep before our call on ${format(date, 'EEEE')}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <p style="font-size: 16px; line-height: 1.6;">Hey ${firstName},</p>

        <p style="font-size: 16px; line-height: 1.6;">Looking forward to our <strong>Revenue & Retention Gameplan Call</strong> on ${format(date, 'EEEE')} at ${timeSlot} ${timezone}.</p>

        <div style="background: #fef3c7; border-left: 4px solid #f59e0b; padding: 20px; margin: 24px 0;">
          <p style="font-size: 16px; line-height: 1.6; margin-top: 0;"><strong>To make this 15 minutes actually useful, can you hit reply with:</strong></p>
          <ol style="font-size: 16px; line-height: 1.8; margin-bottom: 0;">
            <li>Roughly what your clinic collects in an average month?</li>
            <li>Roughly how many active + past patients are in your EMR?</li>
          </ol>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">Doesn't need to be perfect. Ballpark is fine.</p>

        <p style="font-size: 16px; line-height: 1.6;">This lets me come to the call with a rough estimate of how much hidden revenue is sitting in your existing patient list.</p>

        <p style="font-size: 16px; line-height: 1.6;">Zoom link (for easy copy/paste): <a href="${zoomLink}" style="color: #0ea5e9; text-decoration: none;">${zoomLink}</a></p>

        <p style="font-size: 16px; line-height: 1.6; margin-top: 32px;">– ${yourName}</p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        <p style="font-size: 12px; color: #64748b; line-height: 1.5;">This is an automated reminder from Wiebe Consulting's scheduling system.</p>
      </div>
    `,
    text: `Hey ${firstName},

Looking forward to our Revenue & Retention Gameplan Call on ${format(date, 'EEEE')} at ${timeSlot} ${timezone}.

To make this 15 minutes actually useful, can you hit reply with:

1. Roughly what your clinic collects in an average month?
2. Roughly how many active + past patients are in your EMR?

Doesn't need to be perfect. Ballpark is fine.

This lets me come to the call with a rough estimate of how much hidden revenue is sitting in your existing patient list.

Zoom link (for easy copy/paste): ${zoomLink}

– ${yourName}

---
This is an automated reminder from Wiebe Consulting's scheduling system.`
  }),

  // 3) 24 hours before – confirmation
  oneDayBefore: ({
    firstName,
    date,
    timeSlot,
    timezone,
    zoomLink,
    rescheduleLink = '#',
    yourName = 'Ben Wiebe'
  }: EmailTemplateProps) => ({
    subject: `Confirming our call tomorrow at ${timeSlot} ${timezone}`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <p style="font-size: 16px; line-height: 1.6;">Hey ${firstName},</p>

        <p style="font-size: 16px; line-height: 1.6;">Quick confirmation for your <strong>Revenue & Retention Gameplan Call</strong> tomorrow:</p>

        <div style="background: #f0fdf4; border-left: 4px solid #10b981; padding: 20px; margin: 24px 0;">
          <p style="margin: 8px 0;"><strong>When:</strong> ${format(date, 'EEEE, MMMM d, yyyy')} at ${timeSlot} ${timezone}</p>
          <p style="margin: 8px 0;"><strong>Where:</strong> Zoom – <a href="${zoomLink}" style="color: #0ea5e9; text-decoration: none;">${zoomLink}</a></p>
        </div>

        <p style="font-size: 16px; line-height: 1.6;">We'll walk through your no‑show / drop‑off / lapsed‑patient picture and what a 60‑day sprint could realistically do for your clinic.</p>

        <p style="font-size: 16px; line-height: 1.6;">If anything changes and you can't make it, please reschedule here so we can open the spot for another clinic: <a href="${rescheduleLink}" style="color: #0ea5e9; text-decoration: none;">Reschedule Link</a></p>

        <p style="font-size: 16px; line-height: 1.6; margin-top: 32px;">– ${yourName}</p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        <p style="font-size: 12px; color: #64748b; line-height: 1.5;">This is an automated reminder from Wiebe Consulting's scheduling system. Google Calendar will also fire its own reminder.</p>
      </div>
    `,
    text: `Hey ${firstName},

Quick confirmation for your Revenue & Retention Gameplan Call tomorrow:

When: ${format(date, 'EEEE, MMMM d, yyyy')} at ${timeSlot} ${timezone}
Where: Zoom – ${zoomLink}

We'll walk through your no‑show / drop‑off / lapsed‑patient picture and what a 60‑day sprint could realistically do for your clinic.

If anything changes and you can't make it, please reschedule here so we can open the spot for another clinic: ${rescheduleLink}

– ${yourName}

---
This is an automated reminder from Wiebe Consulting's scheduling system. Google Calendar will also fire its own reminder.`
  }),

  // 4) 6 hours before – short nudge
  sixHoursBefore: ({
    firstName,
    timeSlot,
    timezone,
    zoomLink,
    yourName = 'Ben Wiebe'
  }: EmailTemplateProps) => ({
    subject: `Still good for ${timeSlot} ${timezone} today?`,
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <p style="font-size: 16px; line-height: 1.6;">Hey ${firstName},</p>

        <p style="font-size: 16px; line-height: 1.6;">Just a reminder that your <strong>Revenue & Retention Gameplan Call</strong> is today at ${timeSlot} ${timezone}.</p>

        <p style="font-size: 16px; line-height: 1.6;"><strong>Zoom link:</strong> <a href="${zoomLink}" style="color: #0ea5e9; text-decoration: none;">${zoomLink}</a></p>

        <p style="font-size: 16px; line-height: 1.6;">If you're the owner, please try to join from a computer so we can review numbers quickly.</p>

        <p style="font-size: 16px; line-height: 1.6; margin-top: 32px;">– ${yourName}</p>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        <p style="font-size: 12px; color: #64748b; line-height: 1.5;">This is an automated reminder from Wiebe Consulting's scheduling system.</p>
      </div>
    `,
    text: `Hey ${firstName},

Just a reminder that your Revenue & Retention Gameplan Call is today at ${timeSlot} ${timezone}.

Zoom link: ${zoomLink}

If you're the owner, please try to join from a computer so we can review numbers quickly.

– ${yourName}

---
This is an automated reminder from Wiebe Consulting's scheduling system.`
  }),

  // 5) 1 hour before – ultra‑short
  oneHourBefore: ({
    firstName,
    timeSlot,
    timezone,
    zoomLink,
    yourName = 'Ben Wiebe'
  }: EmailTemplateProps) => ({
    subject: 'Starting in 60 minutes',
    html: `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif; max-width: 600px; margin: 0 auto; color: #1e293b;">
        <p style="font-size: 16px; line-height: 1.6;">Your call with ${yourName} is in 60 minutes.</p>

        <div style="background: #fee2e2; border-left: 4px solid #ef4444; padding: 20px; margin: 24px 0;">
          <p style="margin: 8px 0;"><strong>Time:</strong> ${timeSlot} ${timezone}</p>
          <p style="margin: 8px 0;"><strong>Zoom:</strong> <a href="${zoomLink}" style="color: #0ea5e9; text-decoration: none;">${zoomLink}</a></p>
        </div>

        <hr style="border: none; border-top: 1px solid #e2e8f0; margin: 32px 0;">
        <p style="font-size: 12px; color: #64748b; line-height: 1.5;">This is an automated reminder from Wiebe Consulting's scheduling system.</p>
      </div>
    `,
    text: `Your call with ${yourName} is in 60 minutes.

Time: ${timeSlot} ${timezone}
Zoom: ${zoomLink}

---
This is an automated reminder from Wiebe Consulting's scheduling system.`
  })
}
