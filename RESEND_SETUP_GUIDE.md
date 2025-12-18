# Resend Setup Guide for Wiebe Consulting

This guide will walk you through setting up Resend for email delivery.

## Step 1: Access Your Resend Account

You've already created an account with ben@wiebe-consulting.com.

1. Go to [resend.com/login](https://resend.com/login)
2. Click "Login with Google"
3. Select ben@wiebe-consulting.com

## Step 2: Add and Verify Your Domain

### Add Domain

1. In Resend dashboard, click "Domains" in the left sidebar
2. Click "Add Domain" button
3. Enter: `wiebe-consulting.com` (without www)
4. Click "Add"

### DNS Records to Configure

Resend will provide you with DNS records. You need to add these to your domain registrar (where you bought wiebe-consulting.com).

**You'll need to add 3-4 DNS records:**

#### 1. SPF Record (TXT)
- **Type**: TXT
- **Name/Host**: `@` or leave blank (depending on your registrar)
- **Value**: Something like `v=spf1 include:_spf.resend.com ~all`
- **TTL**: 3600 (or default)

#### 2. DKIM Records (2 TXT records)
- **First DKIM Record**:
  - **Type**: TXT
  - **Name/Host**: `resend._domainkey` (or as provided by Resend)
  - **Value**: Long string starting with `p=` (copy exactly from Resend)
  - **TTL**: 3600

- **Second DKIM Record** (if provided):
  - **Type**: TXT
  - **Name/Host**: As provided by Resend
  - **Value**: As provided by Resend
  - **TTL**: 3600

#### 3. DMARC Record (TXT)
- **Type**: TXT
- **Name/Host**: `_dmarc`
- **Value**: `v=DMARC1; p=none; rua=mailto:ben@wiebe-consulting.com`
- **TTL**: 3600

### How to Add DNS Records

This depends on your domain registrar. Common ones:

**GoDaddy:**
1. Log in to GoDaddy
2. Go to "My Products" → "DNS"
3. Click "Add" for each record
4. Select "TXT" as type
5. Enter Name and Value
6. Save

**Namecheap:**
1. Log in to Namecheap
2. Go to Domain List → Manage
3. Advanced DNS tab
4. Add New Record
5. Select TXT Record
6. Enter Host and Value
7. Save

**Cloudflare:**
1. Log in to Cloudflare
2. Select your domain
3. Go to DNS tab
4. Click "Add record"
5. Type: TXT
6. Name and Content as provided
7. Save

### Verify Domain

After adding all DNS records:
1. Wait 5-30 minutes for DNS propagation
2. Go back to Resend dashboard
3. Click "Verify" next to your domain
4. If verification fails, wait longer and try again (can take up to 24 hours)

## Step 3: Create API Key

1. In Resend dashboard, go to "API Keys" in left sidebar
2. Click "Create API Key"
3. Settings:
   - **Name**: `Booking System Production`
   - **Permission**: Select "Full Access" (allows sending and scheduling)
   - **Domain**: Select `wiebe-consulting.com`
4. Click "Create"
5. **IMPORTANT**: Copy the API key immediately
   - It starts with `re_`
   - You'll only see it once
   - If you lose it, you'll need to create a new one

## Step 4: Configure Environment Variables

1. In your project folder, create a file named `.env.local`
2. Copy the contents from `.env.local.example`
3. Fill in these values:

```bash
# Resend Email API Configuration
RESEND_API_KEY=re_[paste your API key here]
EMAIL_FROM=Ben Wiebe <ben@wiebe-consulting.com>
EMAIL_REPLY_TO=ben@wiebe-consulting.com
RESCHEDULE_LINK=https://wiebe-consulting.com
```

**Example:**
```bash
RESEND_API_KEY=re_AbCdEfGh123456789
EMAIL_FROM=Ben Wiebe <ben@wiebe-consulting.com>
EMAIL_REPLY_TO=ben@wiebe-consulting.com
RESCHEDULE_LINK=https://wiebe-consulting.com
```

## Step 5: Test Email Delivery

After domain verification and API key setup:

1. Start your development server: `npm run dev`
2. Go to http://localhost:3005
3. Click "Book Fit Call"
4. Make a test booking with your own email
5. Check your inbox for the confirmation email

### Troubleshooting

**Domain not verifying:**
- Wait longer (up to 24 hours)
- Double-check DNS records are correct
- Make sure no extra spaces in values
- Check TTL is set (3600 is standard)

**Emails not sending:**
- Verify domain is marked as "Verified" in Resend
- Check RESEND_API_KEY is correct in .env.local
- Restart dev server after changing .env.local
- Check Resend dashboard "Logs" for errors

**Emails going to spam:**
- Takes time for domain reputation to build
- Ensure all 3 DNS records are configured
- Send test emails gradually to warm up domain
- Check spam folder and mark as "Not Spam"

**Scheduled emails not working:**
- Scheduled emails may require Resend Pro plan
- Check Resend dashboard for scheduled emails
- Emails must be scheduled for future times

## DNS Record Cheat Sheet

Copy these templates and replace with YOUR values from Resend:

```
Record 1 (SPF):
Type: TXT
Name: @
Value: [copy from Resend]

Record 2 (DKIM 1):
Type: TXT
Name: [copy from Resend, usually resend._domainkey]
Value: [copy from Resend]

Record 3 (DKIM 2, if provided):
Type: TXT
Name: [copy from Resend]
Value: [copy from Resend]

Record 4 (DMARC):
Type: TXT
Name: _dmarc
Value: v=DMARC1; p=none; rua=mailto:ben@wiebe-consulting.com
```

## What Emails Will Be Sent?

Once configured, your booking system will automatically send:

1. **Immediate**: Confirmation with meeting details
2. **3 days before**: Homework request (revenue & EMR data)
3. **24 hours before**: Final confirmation
4. **6 hours before**: Day-of reminder
5. **1 hour before**: Ultra-short final reminder

All emails include:
- Professional HTML design
- Your branding colors
- Zoom link
- Reply-to: ben@wiebe-consulting.com
- Footer: "This is an automated reminder from Wiebe Consulting's scheduling system"

## Next Steps

After Resend is configured:
1. Set up Google Calendar API (see BOOKING_SETUP.md Part 1)
2. Set up Zoom API (see BOOKING_SETUP.md Part 2)
3. Test the complete booking flow
4. Deploy to production

## Support

- Resend Documentation: https://resend.com/docs
- Resend Support: support@resend.com
- DNS Propagation Checker: https://dnschecker.org
