# Booking System Setup Guide

This guide explains how to set up the Google Calendar API and Zoom API integration for the booking system.

## Overview

The booking system allows visitors to:
- View available 30-minute time slots (booked as 45 minutes)
- Book appointments directly on your Google Calendar
- Automatically generate Zoom meetings for each booking
- Receive email confirmations with Zoom links
- Get automated reminders at 3 days, 24 hours, 6 hours, and 1 hour before

## Prerequisites

- Google Workspace account (ben@wiebe-consulting.com)
- Zoom Pro account
- Access to Google Cloud Console
- Access to Zoom Marketplace
- Resend account for email delivery (recommended) or SMTP credentials

---

## Part 1: Google Calendar API Setup

### Step 1: Create Google Cloud Project

1. Go to [Google Cloud Console](https://console.cloud.google.com)
2. Sign in with ben@wiebe-consulting.com
3. Click "Select a project" → "New Project"
4. Project name: "Wiebe Consulting Booking System"
5. Click "Create"

### Step 2: Enable Google Calendar API

1. In the project dashboard, go to "APIs & Services" → "Library"
2. Search for "Google Calendar API"
3. Click on it and press "Enable"

### Step 3: Create Service Account

1. Go to "APIs & Services" → "Credentials"
2. Click "Create Credentials" → "Service Account"
3. Service account details:
   - Name: `wiebe-booking-system`
   - ID: `wiebe-booking-system`
   - Description: "Service account for website booking system"
4. Click "Create and Continue"
5. Grant role: "Editor" (or create custom role with Calendar permissions)
6. Click "Continue" → "Done"

### Step 4: Generate Service Account Key

1. Click on the service account you just created
2. Go to "Keys" tab
3. Click "Add Key" → "Create new key"
4. Choose "JSON" format
5. Click "Create" - a JSON file will download
6. **IMPORTANT**: Keep this file secure - it contains sensitive credentials

### Step 5: Share Calendar with Service Account

1. Open [Google Calendar](https://calendar.google.com)
2. Go to Settings → Select your calendar (usually "ben@wiebe-consulting.com")
3. Scroll to "Share with specific people"
4. Click "Add people"
5. Enter the service account email from the JSON file (format: `wiebe-booking-system@project-id.iam.gserviceaccount.com`)
6. Set permission to "Make changes to events"
7. Click "Send"

### Step 6: Extract Credentials

From the downloaded JSON file, you need:
- `client_email` - Service account email
- `private_key` - Private key (long string starting with `-----BEGIN PRIVATE KEY-----`)

---

## Part 2: Zoom API Setup

### Step 1: Create Zoom Server-to-Server OAuth App

1. Go to [Zoom Marketplace](https://marketplace.zoom.us/)
2. Sign in with your Zoom account
3. Click "Develop" → "Build App"
4. Choose "Server-to-Server OAuth"
5. App name: "Wiebe Consulting Booking System"
6. Click "Create"

### Step 2: Configure App Information

1. Fill in required fields:
   - Short description: "Automated booking system"
   - Company name: "Wiebe Consulting"
   - Developer contact: ben@wiebe-consulting.com
2. Click "Continue"

### Step 3: Add Scopes

Add the following scopes:
- `meeting:write:admin` - Create meetings
- `meeting:read:admin` - Read meeting details
- `user:read:admin` - Read user information

Click "Continue"

### Step 4: Get Credentials

1. Copy the following from the "App Credentials" page:
   - Account ID
   - Client ID
   - Client Secret
2. **IMPORTANT**: Keep these secure

### Step 5: Activate App

1. Click "Continue" through remaining steps
2. On the final page, click "Activate your app"
3. Your app is now ready to use

### Step 6: Generate Access Token

The access token needs to be generated programmatically. You can use this curl command:

\`\`\`bash
curl --request POST \
  --url 'https://zoom.us/oauth/token?grant_type=account_credentials&account_id=YOUR_ACCOUNT_ID' \
  --header 'Authorization: Basic BASE64_ENCODED(CLIENT_ID:CLIENT_SECRET)' \
  --header 'Content-Type: application/x-www-form-urlencoded'
\`\`\`

Or use this Node.js script (run once to get token):

\`\`\`javascript
const accountId = 'YOUR_ACCOUNT_ID'
const clientId = 'YOUR_CLIENT_ID'
const clientSecret = 'YOUR_CLIENT_SECRET'

const credentials = Buffer.from(\`\${clientId}:\${clientSecret}\`).toString('base64')

fetch(\`https://zoom.us/oauth/token?grant_type=account_credentials&account_id=\${accountId}\`, {
  method: 'POST',
  headers: {
    'Authorization': \`Basic \${credentials}\`,
    'Content-Type': 'application/x-www-form-urlencoded'
  }
})
.then(res => res.json())
.then(data => console.log('Access Token:', data.access_token))
\`\`\`

**Note**: Server-to-Server OAuth tokens expire after 1 hour. For production, implement automatic token refresh.

---

## Part 3: Environment Variables Setup

Create a `.env.local` file in the root of your project with the following variables:

\`\`\`bash
# Google Calendar API
GOOGLE_CLIENT_EMAIL=wiebe-booking-system@project-id.iam.gserviceaccount.com
GOOGLE_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\nYOUR_PRIVATE_KEY_HERE\n-----END PRIVATE KEY-----\n"
GOOGLE_CALENDAR_ID=ben@wiebe-consulting.com

# Zoom API
ZOOM_ACCOUNT_ID=your_account_id
ZOOM_CLIENT_ID=your_client_id
ZOOM_CLIENT_SECRET=your_client_secret
ZOOM_ACCESS_TOKEN=your_access_token
\`\`\`

### Important Notes:

1. **GOOGLE_PRIVATE_KEY**:
   - Must include the full key with `-----BEGIN PRIVATE KEY-----` and `-----END PRIVATE KEY-----`
   - Keep the `\n` characters - they're important
   - Wrap the entire value in double quotes

2. **GOOGLE_CALENDAR_ID**:
   - Use `ben@wiebe-consulting.com` or your calendar ID
   - To find your calendar ID: Google Calendar → Settings → Calendar → "Integrate calendar" → Calendar ID

3. **ZOOM_ACCESS_TOKEN**:
   - Expires after 1 hour
   - For production, implement token refresh logic
   - Consider using Zoom's JWT app type for longer-lived tokens

---

## Part 4: Resend Email API Setup

The booking system uses Resend for sending custom email sequences with confirmations and reminders.

### Step 1: Create Resend Account

1. Go to [Resend](https://resend.com)
2. Sign up with ben@wiebe-consulting.com
3. Verify your email address

### Step 2: Add Your Domain

1. In Resend dashboard, go to "Domains"
2. Click "Add Domain"
3. Enter your domain: `wiebe-consulting.com`
4. Add the DNS records provided by Resend to your domain registrar:
   - SPF record (TXT)
   - DKIM records (TXT)
   - DMARC record (TXT)
5. Wait for verification (usually 5-30 minutes)

### Step 3: Create API Key

1. Go to "API Keys" in Resend dashboard
2. Click "Create API Key"
3. Name: "Booking System Production"
4. Permission: "Full Access" (for sending and scheduling emails)
5. Click "Create"
6. **IMPORTANT**: Copy the API key immediately - you won't see it again

### Step 4: Configure Email Settings

In your `.env.local` file, add:

```bash
# Resend Email API
RESEND_API_KEY=re_xxxxxxxxxxxxxxxxxxxxx
EMAIL_FROM=Ben Wiebe <ben@wiebe-consulting.com>
EMAIL_REPLY_TO=ben@wiebe-consulting.com
RESCHEDULE_LINK=https://wiebe-consulting.com
```

### Email Sequence Overview

The system sends 5 automated emails:

1. **Immediate Confirmation** - Sent instantly when booking is created
   - Subject: "You're booked: Revenue & Retention Gameplan on [DAY]"
   - Includes: Meeting details, Zoom link, what to expect

2. **3 Days Before** - "Homework" email
   - Subject: "Quick prep before our call on [DAY]"
   - Asks for: Monthly revenue estimate, number of patients in EMR

3. **24 Hours Before** - Confirmation reminder
   - Subject: "Confirming our call tomorrow at [TIME]"
   - Reinforces meeting details and reschedule option

4. **6 Hours Before** - Short nudge
   - Subject: "Still good for [TIME] today?"
   - Brief reminder with Zoom link

5. **1 Hour Before** - Ultra-short final reminder
   - Subject: "Starting in 60 minutes"
   - Just time and Zoom link

### Email Scheduling

Resend supports scheduled emails natively. All reminder emails are scheduled automatically when the booking is created:
- 3 days before: `startTime - 72 hours`
- 24 hours before: `startTime - 24 hours`
- 6 hours before: `startTime - 6 hours`
- 1 hour before: `startTime - 60 minutes`

### Testing Email Delivery

1. Send a test booking with your own email
2. Check inbox for immediate confirmation
3. Verify scheduled emails appear in Resend dashboard under "Scheduled"
4. Monitor delivery in Resend "Logs" section

### Troubleshooting Email Issues

**Emails not sending:**
- Verify RESEND_API_KEY is correct
- Check domain is verified in Resend dashboard
- Look for errors in server logs (console.log in email-service.ts)

**Emails going to spam:**
- Ensure all DNS records (SPF, DKIM, DMARC) are properly configured
- Add your domain to email whitelist during testing
- Warm up your domain by sending test emails gradually

**Scheduled emails not working:**
- Verify Resend API supports scheduling (requires paid plan for some features)
- Check scheduled email timestamps are in the future
- View scheduled emails in Resend dashboard

---

## Part 5: Test the System

### Test Availability Endpoint

\`\`\`bash
curl http://localhost:3005/api/calendar/availability?date=2025-12-20
\`\`\`

Expected response:
\`\`\`json
{
  "bookedSlots": [],
  "businessHours": { "start": 7, "end": 16 }
}
\`\`\`

### Test Booking Endpoint

\`\`\`bash
curl -X POST http://localhost:3005/api/calendar/book \
  -H "Content-Type: application/json" \
  -d '{
    "dateTime": "2025-12-20T10:00",
    "firstName": "Test",
    "lastName": "User",
    "email": "test@example.com",
    "clinicName": "Test Clinic",
    "phone": "+1234567890"
  }'
\`\`\`

---

## Part 5: Production Deployment

### For Vercel/Netlify:

1. Add all environment variables to your deployment platform
2. Make sure to add `.env.local` to `.gitignore`
3. **NEVER** commit API credentials to Git

### Security Best Practices:

1. Use environment variables for all secrets
2. Rotate keys periodically
3. Monitor API usage in Google Cloud Console and Zoom Marketplace
4. Set up billing alerts to prevent unexpected charges
5. Implement rate limiting on API endpoints

---

## Troubleshooting

### Google Calendar Issues

**Error: "Calendar not found"**
- Make sure you shared the calendar with the service account email
- Verify `GOOGLE_CALENDAR_ID` matches your calendar

**Error: "Invalid credentials"**
- Check that `GOOGLE_PRIVATE_KEY` includes `\n` characters
- Verify the key is wrapped in double quotes
- Make sure the service account JSON is from the correct project

**Events not appearing**
- Check calendar permissions
- Verify timezone settings (should be America/New_York)
- Look for events in Google Calendar directly

### Zoom Issues

**Error: "Invalid access token"**
- Token may have expired (1 hour limit)
- Regenerate token using the script above
- Consider implementing automatic token refresh

**Meetings not created**
- Verify all three Zoom credentials are correct
- Check that scopes include `meeting:write:admin`
- Ensure app is activated in Zoom Marketplace

**No Zoom link in calendar**
- Check that Zoom API returned successfully
- Calendar event will still be created even if Zoom fails
- Check console logs for Zoom API errors

### General Issues

**Slots showing as unavailable**
- Check that current time is within business hours (7am-4pm EST Sun-Thu, 7am-10am Fri)
- Verify timezone conversion is working correctly
- Check for existing events in Google Calendar

**Email notifications not sent**
- Ensure `sendUpdates: 'all'` in calendar event creation
- Check attendee email is valid
- Look in spam folder
- Verify reminders are configured correctly

---

## Business Hours Configuration

Currently configured as:
- **Sunday-Thursday**: 7:00 AM - 4:00 PM EST
- **Friday**: 7:00 AM - 10:00 AM EST
- **Saturday**: Closed

To modify, edit `app/api/calendar/availability/route.ts`:

\`\`\`typescript
const BUSINESS_HOURS = {
  0: { start: 7, end: 16 }, // Sunday
  1: { start: 7, end: 16 }, // Monday
  2: { start: 7, end: 16 }, // Tuesday
  3: { start: 7, end: 16 }, // Wednesday
  4: { start: 7, end: 16 }, // Thursday
  5: { start: 7, end: 10 }, // Friday
  6: null, // Saturday (closed)
}
\`\`\`

---

## Email Reminder Schedule

Configured reminders:
- 3 days before (4320 minutes)
- 24 hours before (1440 minutes)
- 6 hours before (360 minutes)
- 1 hour before (60 minutes)

Reminders are set via Google Calendar's native reminder system.

---

## Support

If you encounter issues:
1. Check the console logs in your browser and server
2. Verify all environment variables are set correctly
3. Test API endpoints directly using curl
4. Check Google Cloud Console logs
5. Review Zoom Marketplace app logs

For additional help, contact: ben@wiebe-consulting.com
