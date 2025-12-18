# Version History - Wiebe Consulting Website

## v1.0.0 - Initial Release (2024-12-18)
**Status:** Deployed to Bitbucket

### Features
- ✅ Next.js 15 with React 19 & TypeScript
- ✅ Tailwind CSS 3.4 with custom blue/purple theme
- ✅ Framer Motion 11 animations
- ✅ 11 complete sections (Hero, Problem, System, Process, Qualification, Pricing, Requirements, About, FAQ, CTA, Footer)
- ✅ Professional futuristic design for Sports PT consulting niche
- ✅ Fully responsive mobile-first design
- ✅ SEO optimized with proper meta tags
- ✅ Animated background effects and smooth transitions
- ✅ Production-ready configuration

### Tech Stack
- Framework: Next.js 15.1.0
- UI Library: React 19.0.0
- Styling: Tailwind CSS 3.4.17
- Animations: Framer Motion 11.15.0
- Icons: Lucide React 0.469.0
- Language: TypeScript 5.7.2

### Deployment
- Repository: https://bitbucket.org/wiebe-consulting/website.git
- Branch: main
- Files: 23 files, 7,358 lines of code

---

## v1.01 - Hero Section Update (2024-12-18)
**Status:** In Development

### Changes
- ✏️ Updated hero headline to display "Add $30,000+ In 60 Days" on a single line
- 📝 Improved visual hierarchy and readability of main value proposition

### Files Modified
- `components/HeroSection.tsx` - Removed line break between "$30,000+" and "In 60 Days"
- `package.json` - Updated version to 1.01.0

---

## v1.02 - Navigation Menu & Logo (2024-12-18)
**Status:** Completed

### Changes
- ➕ Added clickable navigation menu with responsive design
- 🎨 Integrated Wiebe Consulting logo in header
- 🔗 Added section anchor links (How It Works, Pricing, FAQ, About)
- 📱 Mobile-responsive navbar (hides nav links on small screens)

### Files Modified
- `components/Navbar.tsx` - Added logo, navigation links, and responsive CTA button
- `components/ProcessSection.tsx` - Added id="process" for navigation
- `components/PricingSection.tsx` - Added id="pricing" for navigation
- `components/FAQSection.tsx` - Added id="faq" for navigation
- `components/AboutSection.tsx` - Added id="about" for navigation
- `public/logo.png` - Added company logo asset
- `package.json` - Updated version to 1.02.0

---

## v1.03 - Hero Headline Sizing (2024-12-18)
**Status:** Completed

### Changes
- 📏 Reduced hero headline font size for better readability
- 📐 Increased max-width from 5xl to 6xl for wider text area

### Files Modified
- `components/HeroSection.tsx` - Updated headline font sizes and container width
- `package.json` - Updated version to 1.03.0

---

## v1.04 - Hero Section Enhancements (2024-12-18)
**Status:** Completed

### Changes
- 📐 Increased hero section width from max-w-6xl to max-w-7xl
- 📝 Updated subtitle punctuation (comma to em dash)
- 📏 Expanded subtitle max-width from 4xl to 5xl
- 📏 Expanded trust box max-width from 4xl to 5xl
- 🔤 Changed "done-for-you" to "DONE-FOR-YOU" (all caps) throughout

### Files Modified
- `components/HeroSection.tsx` - Increased widths and updated text styling
- `components/SystemSection.tsx` - Capitalized "DONE-FOR-YOU"
- `package.json` - Updated version to 1.04.0

---

## v1.05 - Hero Text Refinements (2024-12-18)
**Status:** Completed

### Changes
- 📏 Expanded subtitle width from max-w-5xl to max-w-6xl
- 📝 Removed em dash from subtitle (changed to regular text flow)
- 💬 Moved guarantee text to second line in trust box with line break

### Files Modified
- `components/HeroSection.tsx` - Updated subtitle width and trust box formatting
- `package.json` - Updated version to 1.05.0

---

## v1.06 - Trust Box Width Alignment (2024-12-18)
**Status:** Completed

### Changes
- 📏 Expanded trust box width from max-w-5xl to max-w-6xl to match subtitle width

### Files Modified
- `components/HeroSection.tsx` - Updated trust box max-width
- `package.json` - Updated version to 1.06.0

---

## v1.07 - Trust Box Width & Alignment (2024-12-18)
**Status:** Completed

### Changes
- 📏 Reduced trust box width from max-w-6xl to max-w-4xl for better focus
- 🎯 Centered text and icon in trust box (changed from left-aligned to centered)

### Files Modified
- `components/HeroSection.tsx` - Reduced trust box max-width and centered content
- `package.json` - Updated version to 1.07.0

---

## v1.08 - Trust Box Checkmark Redesign (2024-12-18)
**Status:** Completed

### Changes
- 🎨 Replaced small centered checkmark with large left-aligned checkmark
- 🔍 Made checkmark semi-transparent (30% opacity) to blend with box
- 📏 Increased checkmark size to 64px (w-16 h-16) to span both text lines

### Files Modified
- `components/HeroSection.tsx` - Updated trust box layout and checkmark styling
- `package.json` - Updated version to 1.08.0

---

## v1.09 - Text Updates & Icon Centering (2024-12-18)
**Status:** Completed

### Changes
- ✏️ Changed "plans of care" to "plans-of-care" in hero subtitle
- ✏️ Changed "Brings back" to "Bring back" in ProblemSection
- 🎯 Centered icons above text in SystemSection cards
- 📐 Made feature lists left-aligned inline blocks for better layout

### Files Modified
- `components/HeroSection.tsx` - Updated "plans of care" to "plans-of-care"
- `components/ProblemSection.tsx` - Updated verb tense to "Bring back"
- `components/SystemSection.tsx` - Centered icons and adjusted text alignment
- `package.json` - Updated version to 1.09.0

---

## v1.10 - Mobile Optimization & Hamburger Menu (2024-12-18)
**Status:** Completed

### Changes
- 📱 Added responsive hamburger menu for mobile devices
- 🔒 Implemented scroll lock when mobile menu is open
- 🎯 Added Menu and X icons from lucide-react
- 📐 Ensured proper spacing with fixed navbar (pt-32 on hero)
- 🆔 Added id="hero" to HeroSection for navigation
- ✨ Animated mobile menu with smooth transitions
- 👆 Mobile menu closes automatically on link click

### Files Modified
- `components/Navbar.tsx` - Added mobile hamburger menu with state management and scroll lock
- `components/HeroSection.tsx` - Added id="hero" for navigation
- `package.json` - Updated version to 1.10.0

### Mobile Features
- Hamburger menu toggles navigation on mobile screens
- Full-width mobile menu with prominent CTA button
- Body scroll prevention when menu is open
- Smooth animations for menu open/close
- Touch-friendly button sizes (44px minimum)
- All sections already responsive with Tailwind breakpoints

---

## v1.11 - Dark/Light Mode Toggle (2024-12-18)
**Status:** Completed

### Changes
- 🌓 Added dark/light mode toggle button in navbar
- 💾 Theme preference saved to localStorage
- 🎨 Sun icon for light mode, Moon icon for dark mode
- ✨ Smooth theme transitions with Framer Motion
- 🔄 Respects system theme preference on first load

### Files Modified
- `components/ThemeToggle.tsx` - New component for theme switching
- `components/Navbar.tsx` - Added ThemeToggle component to navbar
- `package.json` - Updated version to 1.11.0

### Theme Toggle Features
- Button positioned in navbar next to mobile menu/CTA
- Persists theme choice across page reloads
- Animated hover and tap effects
- Accessible with aria-label
- Works on both mobile and desktop

---

## v1.12 - Comprehensive Booking System (2024-12-18)
**Status:** Completed

### Changes
- 📅 Added complete Google Calendar API integration for appointment booking
- 🎥 Integrated Zoom API for automatic meeting generation
- 📧 Email notifications with confirmation and Zoom links
- ⏰ Automated reminders (3 days, 24 hours, 6 hours, 1 hour before)
- 🕐 EST timezone support with Sunday-Thursday 7am-4pm, Friday 7am-10am availability
- 📋 5-field booking form (First name, Last name, Work email, Clinic name, Cell phone)
- ✨ Beautiful booking modal with calendar view
- 🔄 Real-time availability checking
- ✅ Success confirmation with custom message

### New Files Created
- `components/BookingModal.tsx` - Interactive booking calendar and form component
- `app/api/calendar/availability/route.ts` - API endpoint for checking available time slots
- `app/api/calendar/book/route.ts` - API endpoint for creating bookings with Zoom meetings
- `BOOKING_SETUP.md` - Comprehensive setup documentation for Google Calendar and Zoom APIs
- `.env.local.example` - Environment variable template

### Files Modified
- `app/page.tsx` - Added booking modal state management and props
- `components/Navbar.tsx` - Updated CTA buttons to trigger booking modal
- `components/HeroSection.tsx` - Updated booking button to trigger modal
- `components/CTASection.tsx` - Updated booking button to trigger modal
- `components/PricingSection.tsx` - Added booking click prop support
- `package.json` - Added dependencies: @googleapis/calendar, date-fns, date-fns-tz, zod, updated version to 1.12.0

### New Dependencies
- `@googleapis/calendar@^14.2.0` - Google Calendar API client
- `date-fns@^4.1.0` - Date manipulation library
- `date-fns-tz@^3.2.0` - Timezone utilities
- `zod@^4.2.1` - Schema validation

### Booking System Features
- **Calendar Interface**: Week view with date selection, available time slots in 30-minute increments (booked as 45 minutes)
- **Business Hours**: Automatically respects configured hours (EST timezone)
- **Real-time Availability**: Checks Google Calendar for existing appointments
- **Zoom Integration**: Generates unique Zoom meeting for each booking
- **Email Automation**: Google Calendar sends invite with Zoom link
- **Reminder System**: Multiple automated reminders via Google Calendar
- **Custom Confirmation**: Displays specific message about replying with revenue/EMR data
- **Mobile Responsive**: Full functionality on all device sizes
- **Dark Mode Support**: Works with existing theme toggle

### Setup Required
See `BOOKING_SETUP.md` for detailed instructions on:
1. Google Cloud Console configuration
2. Service account creation and calendar sharing
3. Zoom Server-to-Server OAuth app setup
4. Environment variables configuration
5. Testing and troubleshooting

### Environment Variables Needed
```
GOOGLE_CLIENT_EMAIL
GOOGLE_PRIVATE_KEY
GOOGLE_CALENDAR_ID
ZOOM_ACCOUNT_ID
ZOOM_CLIENT_ID
ZOOM_CLIENT_SECRET
ZOOM_ACCESS_TOKEN
```

---

## v1.13 - Custom Email Sequences with Resend (2024-12-18)
**Status:** Completed

### Changes
- 📧 Replaced Google Calendar email notifications with custom email sequences
- ✉️ Integrated Resend API for professional email delivery
- 📝 Created 5 custom email templates matching exact specifications
- ⏰ Automated scheduled emails at 3 days, 24 hours, 6 hours, and 1 hour before
- 🎨 Professional HTML email designs with plain text fallbacks
- 🔄 Immediate confirmation email sent on booking

### New Files Created
- `lib/email-templates.ts` - All 5 custom email templates with HTML/text versions
- `lib/email-service.ts` - Resend integration for sending and scheduling emails

### Files Modified
- `app/api/calendar/book/route.ts` - Added email sending logic for all 5 sequences
- `BOOKING_SETUP.md` - Added Part 4: Resend Email API Setup with complete instructions
- `.env.local.example` - Added Resend configuration variables
- `package.json` - Added resend@^6.6.0 dependency, updated version to 1.13.0

### New Dependencies
- `resend@^6.6.0` - Email delivery service

### Email Sequence Details

**1. Immediate Confirmation** (sent instantly)
- Subject: "You're booked: Revenue & Retention Gameplan on [DAY]"
- Content: Meeting details, Zoom link, call agenda
- Purpose: Instant confirmation and set expectations

**2. 3 Days Before** (scheduled)
- Subject: "Quick prep before our call on [DAY]"
- Content: Homework request (monthly revenue, EMR patient count)
- Purpose: Get prospect to engage and think about their numbers

**3. 24 Hours Before** (scheduled)
- Subject: "Confirming our call tomorrow at [TIME]"
- Content: Confirmation, reschedule option
- Purpose: Reduce no-shows, final confirmation

**4. 6 Hours Before** (scheduled)
- Subject: "Still good for [TIME] today?"
- Content: Brief reminder, Zoom link, computer recommendation
- Purpose: Day-of reminder and preparation

**5. 1 Hour Before** (scheduled)
- Subject: "Starting in 60 minutes"
- Content: Ultra-short - just time and Zoom link
- Purpose: Final reminder before call

### Email Features
- Professional HTML formatting with brand colors
- Plain text fallbacks for all emails
- Automated footer: "This is an automated reminder from Wiebe Consulting's scheduling system"
- Personalized with first name, date, time, Zoom link
- Reply-to set to ben@wiebe-consulting.com
- Reschedule links included where appropriate

### Environment Variables Added
```
RESEND_API_KEY
EMAIL_FROM
EMAIL_REPLY_TO
RESCHEDULE_LINK
```

### Setup Required
- Create Resend account at resend.com
- Verify domain (wiebe-consulting.com) with DNS records
- Create API key with full access permissions
- Configure environment variables

---

## v1.14 - Enhanced Booking UX & Resend Setup Guide (2024-12-18)
**Status:** Completed

### Changes
- 📅 Updated booking calendar to show 2 weeks instead of 1 week
- 🎯 Improved booking flow - form only appears after time selection
- 📋 Created comprehensive Resend setup guide with DNS instructions
- 📝 Added .env.local template file for easy configuration
- ✨ Better visual hierarchy - calendar takes full width until form is needed

### Files Modified
- `components/BookingModal.tsx` - Updated to show 2-week calendar and conditional form display
  - Changed from 7-day to 14-day calendar view
  - Split into two week rows with labels
  - Added `showForm` state that triggers after time selection
  - Form now appears in right column only after user selects a time
  - Calendar takes full width when form is hidden
  - Navigation buttons now jump 2 weeks instead of 1

### New Files Created
- `RESEND_SETUP_GUIDE.md` - Complete walkthrough for Resend configuration
  - Step-by-step domain verification instructions
  - DNS record templates for SPF, DKIM, and DMARC
  - Registrar-specific instructions (GoDaddy, Namecheap, Cloudflare)
  - API key creation guide
  - Troubleshooting section
  - Email delivery testing instructions
- `.env.local.template` - Clean template with all required environment variables
  - Organized by service (Google, Zoom, Resend)
  - Includes helpful comments
  - Ready to copy and fill in

### UX Improvements

**Before:**
- Calendar showed 1 week at a time
- Form visible immediately, taking up half the modal
- Had to scroll to see all time slots on mobile

**After:**
- Calendar shows 2 full weeks at a time
- Calendar takes full width initially - better visibility
- Form only appears after selecting a time (cleaner, less overwhelming)
- Two-column layout activates when form shows
- Easier to scan available dates and times

### Booking Flow

1. User clicks "Book Fit Call" → Modal opens
2. User sees 2-week calendar (full width, clean)
3. User selects a date → Time slots appear below
4. User selects a time → Form slides in on the right
5. User fills form → Clicks "Confirm Booking"
6. Success confirmation appears

### Setup Documentation

**RESEND_SETUP_GUIDE.md includes:**
- Account access instructions
- Domain verification process
- DNS record configuration (with examples)
- API key creation steps
- Environment variable setup
- Testing procedures
- Troubleshooting guide
- Email sequence overview

**Resend DNS Records Required:**
1. SPF (TXT) - Sender authentication
2. DKIM (TXT, 1-2 records) - Email signing
3. DMARC (TXT) - Email policy

---

## v1.14.1 - DNS Records & Quick Start Guide (2024-12-18)
**Status:** Completed

### Changes
- 📋 Added exact DNS records from Resend for copy-paste setup
- 🚀 Created Quick Start Guide for immediate setup
- 📝 Documented all 4 required DNS records with exact values
- ✅ Step-by-step checklist for getting system operational

### New Files Created
- `DNS_RECORDS_TO_ADD.md` - Exact DNS records with values from Resend
  - DKIM TXT record with full public key
  - SPF TXT record for sender verification
  - MX record for email sending (Amazon SES)
  - MX record for email receiving (Amazon SES)
  - Registrar-specific instructions (GoDaddy, Namecheap, Cloudflare)
  - DNS propagation checking guide
  - Troubleshooting section

- `QUICK_START.md` - Fast-track setup guide
  - 7-step checklist from DNS to deployment
  - Priority ordering (email first, calendar/zoom later)
  - Time estimates for each step
  - Quick troubleshooting tips
  - File reference guide

### DNS Records Documented

**Record 1 - DKIM:**
- Type: TXT
- Name: `resend._domainkey`
- Value: Full DKIM public key from Resend

**Record 2 - SPF:**
- Type: TXT
- Name: `send`
- Value: `v=spf1 include:amazonses.com ~all`

**Record 3 - MX Sending:**
- Type: MX
- Name: `send`
- Mail Server: `feedback-smtp.us-east-1.amazonses.com`
- Priority: 10

**Record 4 - MX Receiving:**
- Type: MX
- Name: `@`
- Mail Server: `inbound-smtp.us-east-1.amazonaws.com`
- Priority: 0

### Quick Start Priority

1. Add DNS records (5 min)
2. Verify domain in Resend (2 min)
3. Create Resend API key (1 min)
4. Configure .env.local (3 min)
5. Test email system (2 min)
6. Google Calendar setup (later)
7. Zoom setup (later)

**Total time to working email system: ~15 minutes + DNS propagation**

---

## Version Tracking
**Current Version:** v1.14.1
**Next Version:** v1.15

All future edits will increment the version number and be documented here.
