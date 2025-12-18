# DNS Records for wiebe-consulting.com

**IMPORTANT:** Add these exact records to your domain registrar's DNS settings.

## Overview

You need to add **4 DNS records** total:
- 1 DKIM record (TXT)
- 1 SPF record (TXT)
- 1 MX record for sending
- 1 MX record for receiving

---

## Record 1: DKIM (Domain Keys Identified Mail)

This verifies that emails are actually from your domain.

**Settings:**
- **Type:** `TXT`
- **Name/Host:** `resend._domainkey`
- **Value/Content:** `p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD0GaEPDv0VxG29ZfXxvZ02elPUQGyTMHN6RKIDdHGxLLPAYUifp7wmoi84n4cT/J7AFxjuEM745rIFqWeGcmAs5vM6j+/A1t3zwUaYUICxu9bZsk6O6pJu0uqoiCDkW6uRjQlPUqPAMPrnZlaNVHM1CHd9ecEzQNxwgnqd5yGMiwIDAQAB`
- **TTL:** `Auto` or `3600`
- **Priority:** (leave blank for TXT records)

---

## Record 2: SPF (Sender Policy Framework)

This specifies which mail servers can send emails on behalf of your domain.

**Settings:**
- **Type:** `TXT`
- **Name/Host:** `send`
- **Value/Content:** `v=spf1 include:amazonses.com ~all`
- **TTL:** `Auto` or `3600`
- **Priority:** (leave blank for TXT records)

---

## Record 3: MX Record for Sending

This routes outgoing email through Amazon SES.

**Settings:**
- **Type:** `MX`
- **Name/Host:** `send`
- **Value/Content:** `feedback-smtp.us-east-1.amazonses.com`
- **TTL:** `Auto` or `3600`
- **Priority:** `10`

---

## Record 4: MX Record for Receiving (Root Domain)

This routes incoming email through Amazon SES.

**Settings:**
- **Type:** `MX`
- **Name/Host:** `@` (this means your root domain)
- **Value/Content:** `inbound-smtp.us-east-1.amazonaws.com`
- **TTL:** `Auto` or `3600`
- **Priority:** `0`

---

## Quick Copy-Paste Format

### For Most DNS Providers:

```
Record 1 - DKIM:
Type: TXT
Name: resend._domainkey
Value: p=MIGfMA0GCSqGSIb3DQEBAQUAA4GNADCBiQKBgQD0GaEPDv0VxG29ZfXxvZ02elPUQGyTMHN6RKIDdHGxLLPAYUifp7wmoi84n4cT/J7AFxjuEM745rIFqWeGcmAs5vM6j+/A1t3zwUaYUICxu9bZsk6O6pJu0uqoiCDkW6uRjQlPUqPAMPrnZlaNVHM1CHd9ecEzQNxwgnqd5yGMiwIDAQAB

Record 2 - SPF:
Type: TXT
Name: send
Value: v=spf1 include:amazonses.com ~all

Record 3 - MX Sending:
Type: MX
Name: send
Value: feedback-smtp.us-east-1.amazonses.com
Priority: 10

Record 4 - MX Receiving:
Type: MX
Name: @
Value: inbound-smtp.us-east-1.amazonaws.com
Priority: 0
```

---

## Step-by-Step Instructions by Registrar

### If using **GoDaddy:**

1. Log in to GoDaddy
2. Go to **My Products** → **Domains**
3. Click **DNS** next to wiebe-consulting.com
4. Scroll down to **Records** section
5. Click **Add** for each record:
   - For TXT records: Choose "TXT", enter Name and Value
   - For MX records: Choose "MX", enter Name, Value, and Priority
6. Click **Save** after each record

### If using **Namecheap:**

1. Log in to Namecheap
2. Go to **Domain List** → Click **Manage** next to wiebe-consulting.com
3. Click **Advanced DNS** tab
4. Click **Add New Record** for each:
   - Select record Type (TXT or MX)
   - Enter Host (the "Name" field)
   - Enter Value/Target
   - For MX: Enter Priority
5. Click green checkmark to save each record

### If using **Cloudflare:**

1. Log in to Cloudflare
2. Select **wiebe-consulting.com** domain
3. Go to **DNS** tab
4. Click **Add record** for each:
   - Type: Select TXT or MX
   - Name: Enter the host
   - Content/Mail server: Enter the value
   - For MX: Set Priority
   - **Important for MX records:** Turn OFF the orange cloud (click to make it gray) - MX records must be DNS-only
5. Click **Save**

### If using **Other Registrar:**

Look for:
- "DNS Management"
- "DNS Records"
- "Advanced DNS"
- "Domain Settings"

Then add the 4 records with the exact values listed above.

---

## After Adding Records

### Verify DNS Propagation

1. Wait 5-15 minutes after adding records
2. Check propagation at: https://dnschecker.org
3. Enter `wiebe-consulting.com` and select record type (TXT or MX)
4. Click **Search**
5. Green checkmarks mean the record has propagated

### Verify in Resend

1. Go to Resend dashboard
2. Click **Domains**
3. You should see wiebe-consulting.com
4. Click **Verify** or it may verify automatically
5. Once verified, you'll see a green "Verified" badge

### Test Email Sending

After verification is complete:
1. Start your dev server: `npm run dev`
2. Go to http://localhost:3005
3. Click "Book Fit Call"
4. Create a test booking with your email
5. Check your inbox for the confirmation email

---

## Troubleshooting

### Records not showing up:
- Wait longer (DNS can take up to 24 hours)
- Double-check for typos in Name or Value fields
- Make sure there are NO extra spaces before or after values
- Verify TTL is set (use 3600 if Auto doesn't work)

### Cloudflare-specific:
- MX records MUST have orange cloud OFF (gray, DNS-only mode)
- TXT records can have cloud on or off

### Domain not verifying in Resend:
- All 4 records must be added
- Check DNS propagation tool
- Try clicking "Verify" again after waiting
- Contact Resend support if still having issues

### Emails not sending:
- Domain must show "Verified" in Resend dashboard
- Check that RESEND_API_KEY is in your .env.local file
- Restart your development server after adding .env.local
- Check Resend dashboard "Logs" for error messages

---

## Summary Checklist

- [ ] Record 1: DKIM TXT record added (`resend._domainkey`)
- [ ] Record 2: SPF TXT record added (`send`)
- [ ] Record 3: MX record for sending added (`send`)
- [ ] Record 4: MX record for receiving added (`@`)
- [ ] Waited 5-15 minutes for DNS propagation
- [ ] Checked DNS propagation at dnschecker.org
- [ ] Domain shows "Verified" in Resend dashboard
- [ ] Added RESEND_API_KEY to .env.local
- [ ] Tested email sending with a booking

---

## Need Help?

- **DNS Propagation Checker:** https://dnschecker.org
- **Resend Documentation:** https://resend.com/docs/dashboard/domains/introduction
- **Resend Support:** support@resend.com
- **Your Registrar Support:** Check your domain registrar's help docs

Once all records are added and verified, your email system will be fully operational!
