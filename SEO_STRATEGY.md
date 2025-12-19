# Wiebe Consulting SEO Strategy & Implementation Plan

## 1. Summary: Main SEO Weaknesses & Highest-ROI Fixes

### Critical Issues Fixed ✅
- **No robots.txt** → Created `/public/robots.txt`
- **No sitemap.xml** → Created `/app/sitemap.ts` (auto-generates at `/sitemap.xml`)
- **No canonical tags** → Added via Next.js metadata
- **Missing Open Graph/Twitter cards** → Added full social meta
- **No structured data** → Added 5 schema types (Organization, Service, FAQPage, BreadcrumbList, WebPage)
- **Weak title tag** → Optimized for primary keyword "Sports PT Consulting"
- **Generic meta description** → Rewritten for click-through from PT clinic owners

### Remaining High-ROI Actions
1. **Create content hub** with 10-15 blog posts targeting long-tail keywords
2. **Add case study pages** (3-5) for social proof and "PT consulting results" keywords
3. **Submit sitemap to Google Search Console**
4. **Create OG image** (`/public/og-image.png`) for social sharing
5. **Add Google Search Console verification** code to metadata

---

## 2. Keyword Strategy & Page Map

### Primary Keyword Clusters for Sports PT Consulting

| Cluster | Primary Keyword | Monthly Search Volume (Est.) | Intent |
|---------|----------------|------------------------------|--------|
| Core Service | sports PT consulting | 50-100 | Commercial |
| Core Service | physical therapy consulting | 200-400 | Commercial |
| Problem | PT patient retention | 100-200 | Informational/Commercial |
| Problem | reduce PT no-shows | 50-100 | Informational |
| Problem | patient reactivation PT | 20-50 | Commercial |
| Solution | PT revenue system | 20-50 | Commercial |
| Solution | EMR patient data optimization | 10-30 | Informational |

### Page-Level Keyword Assignments

| Page | URL | Primary Keyword | Supporting Keywords | Page Role |
|------|-----|-----------------|---------------------|-----------|
| Home | `/` | sports PT consulting | PT patient retention, ortho PT revenue, physical therapy consulting, PT no-show reduction | Main conversion page |
| Blog Hub | `/blog` | PT clinic growth tips | PT practice management, clinic owner resources | Content hub |
| Case Studies | `/results` | PT consulting results | clinic revenue increase, patient retention case study | Social proof |
| Resources | `/resources` | PT clinic resources | EMR optimization, patient communication templates | Lead magnet |

---

## 3. On-Page SEO Recommendations (Implemented)

### Homepage (/)

| Element | Before | After |
|---------|--------|-------|
| **Title Tag** | `Wiebe Consulting \| Add $30K+ in 60 Days for Sports PT Clinics` | `Sports PT Consulting \| Add $30K in 60 Days \| Wiebe Consulting` |
| **Meta Description** | `Revenue & Retention System for owner-led sports & ortho PT clinics. Cut no-shows, complete more plans, reactivate lapsed patients. 60-day guarantee.` | `Done-for-you patient retention system for sports & ortho PT clinics. Cut no-shows, complete more plans of care, reactivate lapsed patients. Pay only if we hit targets.` |
| **Canonical** | Missing | `https://wiebe-consulting.com` |
| **OG/Twitter** | Missing | Full implementation |

### Image Alt Text Recommendations

| Image | Current Alt | Recommended Alt |
|-------|-------------|-----------------|
| Logo | None | "Wiebe Consulting - Sports PT Revenue Consulting" |
| Any future hero images | - | "Sports physical therapy clinic owner reviewing patient retention dashboard" |
| Process diagrams | - | "60-day PT revenue sprint process: diagnose, build, optimize" |

---

## 4. Content Hub & Proof Plan (New Pages)

### Blog Topics (10 Posts)

| # | Target Keyword | Intent | URL Slug | H1 | Outline |
|---|---------------|--------|----------|-----|---------|
| 1 | PT no-show rate | Info | `/blog/pt-no-show-rate-benchmarks` | What's a Normal No-Show Rate for PT Clinics? (And How to Beat It) | • Industry benchmarks (10-20%) • Cost per no-show calculation • 5 causes • 3 solutions • CTA: Book fit call |
| 2 | patient retention PT | Info | `/blog/patient-retention-strategies-pt` | 7 Patient Retention Strategies for Sports PT Clinics | • Why retention > acquisition • Reminder sequences • Progress education • Re-engagement campaigns • Staff scripts • CTA |
| 3 | reactivate lapsed patients | Comm | `/blog/reactivate-lapsed-pt-patients` | How to Reactivate Lapsed Patients in Your PT Clinic | • Define lapsed (6-24 months) • Pull the list from EMR • 30-day campaign structure • Offer ideas • Expected response rates |
| 4 | PT plan of care completion | Info | `/blog/plan-of-care-completion-rate` | Why Athletes Drop Off Mid-Plan (And How to Keep Them) | • Typical completion rates • Reasons for drop-off • Milestone messaging • Staff intervention points |
| 5 | PT internal marketing | Comm | `/blog/pt-internal-marketing-campaigns` | Internal Marketing for PT Clinics: The Fastest Path to $30K+ | • What is internal marketing • Reactivation vs external • Campaign examples • ROI comparison |
| 6 | EMR patient data | Info | `/blog/use-emr-data-grow-pt-clinic` | Your EMR Is a Goldmine: How to Use Patient Data to Grow Revenue | • Data you already have • Segment by status • Automated sequences • Privacy considerations |
| 7 | PT reminder systems | Info | `/blog/pt-appointment-reminder-system` | The Ultimate PT Appointment Reminder System (SMS + Email) | • Timing best practices • Message templates • Multi-touch vs single • Automation tools |
| 8 | sports PT niche | Comm | `/blog/why-niche-sports-pt` | Why Niching Down to Sports PT Is Your Biggest Revenue Lever | • Referral quality • Patient LTV • Premium positioning • Internal vs external patients |
| 9 | PT front desk scripts | Info | `/blog/pt-front-desk-scripts-no-shows` | Front Desk Scripts That Reduce No-Shows and Save Cancellations | • Confirmation call script • Same-day reminder • Cancellation save script • Rebook script |
| 10 | PT revenue per visit | Info | `/blog/increase-pt-revenue-per-visit` | How to Increase Revenue Per Visit Without Raising Prices | • Visit utilization • Package programs • Cash-pay add-ons • Completion bonuses |

### Case Study Templates (5 Pages)

| # | Target Keyword | URL Slug | H1 | Template Outline |
|---|---------------|----------|-----|------------------|
| 1 | PT retention case study | `/results/sports-pt-retention-case-study` | Case Study: Sports PT Clinic Adds $42K in 60 Days | • Clinic profile (size, location, baseline) • Problem (no-shows, drop-offs) • Solution implemented • 60-day results • Testimonial quote |
| 2 | PT reactivation results | `/results/pt-reactivation-campaign-results` | Case Study: 127 Lapsed Patients Reactivated in 30 Days | • Clinic profile • Dormant patient count • Campaign structure • Response rate • Revenue recovered |
| 3 | ortho PT case study | `/results/ortho-pt-revenue-case-study` | Case Study: Ortho PT Clinic Cuts No-Shows by 65% | • Clinic profile • No-show rate before/after • Reminder system • Staff training • Monthly savings |
| 4 | multi-location PT | `/results/multi-location-pt-case-study` | Case Study: 3-Location PT Group Adds $97K Across Sites | • Group profile • Standardization challenge • System rollout • Per-location results |
| 5 | PT completion rates | `/results/pt-completion-rate-improvement` | Case Study: Plan Completion Jumps from 4.2 to 7.8 Visits | • Clinic profile • Baseline completion • Messaging strategy • Staff prompts • Outcome improvement |

### Internal Linking Strategy

Every blog post and case study should include:
1. **In-content link** to homepage with anchor text from existing copy (e.g., "Revenue & Retention System")
2. **CTA box** at bottom: "See if the 60-Day Sprint can work for your clinic → Book a Fit Call"
3. **Related posts** section linking to 2-3 other blog posts

---

## 5. Schema & Rich Snippets (Implemented)

### Schema Types Added

| Schema Type | Location | Purpose |
|-------------|----------|---------|
| **Organization** | All pages | Brand entity, logo, founder, service types |
| **ProfessionalService** | Homepage | Local business signals for consulting |
| **Service** | Homepage | Defines the 60-Day Sprint offering with pricing |
| **FAQPage** | Homepage | Rich snippet eligibility for FAQ section |
| **BreadcrumbList** | All pages | Navigation structure |
| **WebPage** | Homepage | Page-level entity |

### Future Schema to Add
- **Article** schema for blog posts
- **HowTo** schema for process-oriented posts
- **Review/Testimonial** schema when case studies have quotes

---

## 6. Technical SEO Checklist

### Completed ✅
- [x] robots.txt created
- [x] XML sitemap auto-generated
- [x] Canonical tags added
- [x] Open Graph meta tags
- [x] Twitter Card meta tags
- [x] JSON-LD structured data (5 types)
- [x] Mobile-responsive (Tailwind)
- [x] Image optimization (Next.js Image)
- [x] Font optimization (display: swap)

### To Do (Manual Steps)
- [ ] Create `/public/og-image.png` (1200x630) for social sharing
- [ ] Submit sitemap to Google Search Console
- [ ] Add Google Search Console verification code
- [ ] Set up Bing Webmaster Tools
- [ ] Create Google Business Profile (if applicable)
- [ ] Request indexing of homepage in Search Console

---

## 7. Conversion Layout Recommendations

### Current CTA Placement
1. Navbar (sticky) ✅
2. Hero section ✅
3. Pricing section ✅
4. About section (link to #pricing)
5. Final CTA section ✅

### Recommended Enhancements (No Copy Changes)

| Location | Current | Recommendation |
|----------|---------|----------------|
| After Problem Section | None | Add CTA button linking to #pricing |
| After System Section | Text only | Add CTA button |
| Mobile sticky footer | None | Consider sticky "Book Fit Call" bar on mobile |
| FAQ section | None | Add CTA after FAQs |

### Section Order Optimization

Current order is strong for the sales narrative. Consider:
- Moving "Who This Is For" section higher (before Pricing) to pre-qualify → **Already in correct position**
- The guarantee section placement is ideal (builds confidence before final CTA)

---

## 8. Next Steps Priority Order

1. **Deploy current changes** to production
2. **Create OG image** for social sharing
3. **Submit to Google Search Console** and request indexing
4. **Write first 3 blog posts** (no-show rate, retention strategies, reactivation)
5. **Create first case study template** (even with hypothetical data structure)
6. **Add blog listing page** at `/blog`
7. **Set up Google Business Profile** if you have a physical office

---

## Appendix: File Changes Made

| File | Change |
|------|--------|
| `/public/robots.txt` | Created |
| `/app/sitemap.ts` | Created |
| `/app/layout.tsx` | Enhanced metadata |
| `/components/SchemaMarkup.tsx` | Created |
| `/app/page.tsx` | Added SchemaMarkup component |
