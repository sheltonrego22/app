# Eurogulf Mobility Group (EGMG) — Corporate Website PRD

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI (port 3000)
- **Backend**: FastAPI + MongoDB (port 8001)
- **Brand Colors**: #EE5A01 (orange), #000000 (black), #666666 (gray), #2d8c3c (Europcar green)

## Completed (Model Build Upgrade - June 2026)
- [x] **Logo & Trust Overhaul**: 7 named partner logos (Al Khoory Automobiles, IMT Dubai, Europcar, ADNOC, Emirates, DP World, Dubai Holding) with self-hosted SVGs. "Live Trust Signal" bar: "12,000+ Vehicles | 1,200+ Professionals | Moving the UAE since 1976."
- [x] **Dual-Action Hero Widget**: "Private Journey (B2C)" → /book-chauffeur, "Corporate Solutions (B2B)" → /contact
- [x] **Mobile Sticky Contact Bar**: WhatsApp + Call buttons, hidden on desktop (md:hidden)
- [x] **Fleet Savings Calculator**: Renamed from "ROI Calculator" on /leasing, slider for fleet size (1-100), dropdowns for term (12-60 months) & vehicle class, dynamic savings display
- [x] **Impact-Driven Headers**: "Mobility Engineered for the UAE" (/services), "A Legacy of Movement" (/about)
- [x] **Copy Cleanup**: All em-dashes (—), en-dashes (–), and hyphens removed from headings, body text, meta titles, dropdown options, and iframe titles across 30+ pages
- [x] **EGMG Naming Audit**: 100% "Eurogulf Mobility Group" in all public-facing text (headings, body, alt text, meta titles, navigation). No standalone "EGMG" abbreviations.
- [x] **SEO Meta Titles**: All page titles use pipe separators (|) instead of em-dashes
- [x] **Service-to-CTA Flow**: Every service description ends with a specific CTA (e.g., "Customize Your Lease", "Book Your Rental", "Book a Chauffeur")

## Previously Completed (June 2026)
- [x] 30+ page corporate site with all content aligned to strategy docs
- [x] Component splitting: BookChauffeurPage (677→130 lines), AdminDashboard (350→120 lines)
- [x] 5 SEO landing pages: /car-rental-dubai, /monthly-car-rental-dubai, /chauffeur-service-dubai, /commercial-vehicle-leasing-uae, /car-leasing-dubai
- [x] Arabic version: /ar (homepage), /ar/about, /ar/contact — full RTL with ME Arabic translations
- [x] Navigation: MOBILITY SOLUTIONS mega-menu (B2B/B2C), SUPPORT & RESOURCES
- [x] Brand logos: Europcar, Goldcar uploaded and deployed
- [x] LeadConnector chat widget, Health endpoint, Code quality fixes

## Upcoming
- [ ] Full Arabic Content Implementation (P1)
- [ ] WhatsApp Business API live chat integration (P1)
- [ ] Google Analytics / Tag Manager (P2)
- [ ] Portal Authentication Systems (P2)
