# Quick Start Guide - Wiebe Consulting Booking System

This is your step-by-step checklist to get the booking system working.

## Prerequisites Checklist

- [x] Resend account created (ben@wiebe-consulting.com)
- [ ] DNS records added to domain registrar
- [ ] Resend domain verified
- [ ] Resend API key created
- [ ] Google Calendar API configured
- [ ] Zoom API configured
- [ ] Environment variables configured

---

## Step 1: Add DNS Records (DO THIS FIRST)

**Time: 5 minutes + 15 minute wait**

1. Open **[DNS_RECORDS_TO_ADD.md](DNS_RECORDS_TO_ADD.md)** - this has the EXACT records
2. Log into your domain registrar (where you bought wiebe-consulting.com)
3. Find "DNS Settings" or "DNS Management"
4. Add all 4 records:
   - DKIM TXT record
   - SPF TXT record
   - MX record for sending
   - MX record for receiving
5. Save changes
6. Wait 15 minutes for DNS to propagate
7. Check propagation: https://dnschecker.org

**File to use:** [DNS_RECORDS_TO_ADD.md](DNS_RECORDS_TO_ADD.md)

---

## Step 2: Verify Domain in Resend

**Time: 2 minutes**

1. Go to https://resend.com/login
2. Login with Google (ben@wiebe-consulting.com)
3. Click "Domains" in sidebar
4. You should see "wiebe-consulting.com"
5. Click "Verify" button
6. Wait for green "Verified" badge
7. If not verified yet, wait longer and try again

---

## Step 3: Create Resend API Key

**Time: 1 minute**

1. In Resend dashboard, click "API Keys" in sidebar
2. Click "Create API Key" button
3. Settings:
   - **Name:** `Booking System Production`
   - **Permission:** `Full Access`
   - **Domain:** `wiebe-consulting.com`
4. Click "Create"
5. **COPY THE KEY NOW** (starts with `re_`) - you'll only see it once
6. Keep it safe for next step

---

## Step 4: Configure Environment Variables

**Time: 3 minutes**

1. In your project folder, find `.env.local.template`
2. Make a copy and rename it to `.env.local`
3. Open `.env.local` in a text editor
4. Fill in at minimum:

```bash
# Resend (you have this now)
RESEND_API_KEY=re_[paste your key here]
EMAIL_FROM=Ben Wiebe <ben@wiebe-consulting.com>
EMAIL_REPLY_TO=ben@wiebe-consulting.com
RESCHEDULE_LINK=https://wiebe-consulting.com

# Leave these empty for now (configure later)
GOOGLE_CLIENT_EMAIL=
GOOGLE_PRIVATE_KEY=
GOOGLE_CALENDAR_ID=

ZOOM_ACCOUNT_ID=
ZOOM_CLIENT_ID=
ZOOM_CLIENT_SECRET=
ZOOM_ACCESS_TOKEN=
```

5. Save the file
6. **NEVER commit .env.local to Git!**

---

## Step 5: Test Email System

**Time: 2 minutes**

1. Open terminal/command prompt
2. Navigate to project folder:
   ```bash
   cd "c:\Users\wiebe\OneDrive\Desktop\Website Creator\wiebe-consulting-v1"
   ```
3. Start development server:
   ```bash
   npm run dev
   ```
4. Open browser to http://localhost:3005
5. Click "Book Fit Call"
6. Fill in the form with YOUR email address
7. Complete a test booking
8. Check your email inbox - you should receive confirmation

**If email doesn't arrive:**
- Check spam folder
- Verify domain is "Verified" in Resend
- Check Resend dashboard → Logs for errors
- Make sure .env.local has RESEND_API_KEY
- Restart dev server (`Ctrl+C` then `npm run dev`)

---

## Step 6: Configure Google Calendar (Later)

**Time: 20 minutes**

Follow: **[BOOKING_SETUP.md Part 1](BOOKING_SETUP.md#part-1-google-calendar-api-setup)**

You'll need to:
1. Create Google Cloud project
2. Enable Calendar API
3. Create service account
4. Download credentials JSON
5. Share calendar with service account
6. Add credentials to .env.local

---

## Step 7: Configure Zoom (Later)

**Time: 15 minutes**

Follow: **[BOOKING_SETUP.md Part 2](BOOKING_SETUP.md#part-2-zoom-api-setup)**

You'll need to:
1. Create Server-to-Server OAuth app
2. Get Account ID, Client ID, Client Secret
3. Generate access token
4. Add credentials to .env.local

---

## Current Status

After completing Steps 1-5, you'll have:
- ✅ Professional email delivery system
- ✅ All 5 automated email sequences
- ✅ Domain verified and ready
- ✅ Booking form working on your site
- ⏳ Calendar integration (pending Steps 6-7)
- ⏳ Zoom integration (pending Steps 6-7)

**Note:** The booking system will work for collecting leads even without Google Calendar/Zoom. You'll just need to manually create calendar events and Zoom links until those are configured.

---

## Files Reference

- **[DNS_RECORDS_TO_ADD.md](DNS_RECORDS_TO_ADD.md)** - Exact DNS records to add
- **[RESEND_SETUP_GUIDE.md](RESEND_SETUP_GUIDE.md)** - Detailed Resend instructions
- **[BOOKING_SETUP.md](BOOKING_SETUP.md)** - Complete setup for all APIs
- **[.env.local.template](.env.local.template)** - Environment variables template

---

## Troubleshooting

### DNS records not verifying:
- Wait longer (can take up to 24 hours)
- Check for typos in record values
- Use https://dnschecker.org to verify propagation
- See [DNS_RECORDS_TO_ADD.md](DNS_RECORDS_TO_ADD.md) troubleshooting section

### Emails not sending:
- Domain must show "Verified" in Resend
- RESEND_API_KEY must be in .env.local
- Restart development server
- Check Resend dashboard Logs

### Booking form not appearing:
- Clear browser cache
- Hard refresh (Ctrl+Shift+R or Cmd+Shift+R)
- Check browser console for errors

---

## Next Steps

1. ✅ Complete Steps 1-5 (Resend setup and testing)
2. Configure Google Calendar API (Step 6)
3. Configure Zoom API (Step 7)
4. Do a full end-to-end test
5. Deploy to production (Vercel/Netlify)

**Priority:** Focus on Steps 1-5 first. Email system is the most important part for capturing leads!

---

## Support

- **Resend Issues:** support@resend.com
- **DNS Issues:** Your domain registrar's support
- **System Issues:** Check error logs in browser console and Resend dashboard

Good luck! 🚀
