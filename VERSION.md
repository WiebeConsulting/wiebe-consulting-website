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

## Version Tracking
**Current Version:** v1.03
**Next Version:** v1.04

All future edits will increment the version number and be documented here.
