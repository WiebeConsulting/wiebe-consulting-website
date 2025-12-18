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

## Version Tracking
**Current Version:** v1.09
**Next Version:** v1.10

All future edits will increment the version number and be documented here.
