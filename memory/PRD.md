# Eurogulf Mobility Group — Corporate Website PRD

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI (port 3000, craco build)
- **Backend**: FastAPI + MongoDB (port 8001)
- **Brand Colors**: #EE5A01 (orange), #000000 (black), #666666 (gray), #2d8c3c (Europcar green)
- **Build**: `yarn build` (craco build) — 0 warnings, 0 errors. Output: 315 kB JS + 18 kB CSS gzipped.

## Completed (Final Audit — Sept 2026)
- [x] **Build passes clean**: Zero ESLint warnings, zero compilation errors
- [x] **All 7 partner logos self-hosted**: SVGs under /public/partners/ — no external CDN dependency
- [x] **Meta tags cleaned**: index.html title/description use pipes (|), no em-dashes, updated to "12,000+ vehicles"
- [x] **ESLint warnings fixed**: AdminDashboardPage, MediaCenterPage — `API` removed from dependency arrays
- [x] **CareersPage bug fixed**: Undefined `i` variable in data-testid replaced with job title slug
- [x] **File uploads migrated**: From ephemeral pod storage to MongoDB (base64) for persistence across deploys
- [x] **Deployment check**: PASS — env vars, CORS, ports, supervisor, MongoDB all verified

## Completed (Model Build Upgrade — June 2026)
- [x] Logo & Trust Overhaul: 7 named partner logos, "Live Trust Signal" bar
- [x] Dual-Action Hero Widget: "Private Journey (B2C)" + "Corporate Solutions (B2B)"
- [x] Mobile Sticky Contact Bar: WhatsApp + Call buttons (md:hidden)
- [x] Fleet Savings Calculator on /leasing with slider and dropdowns
- [x] Impact-Driven Headers: "Mobility Engineered for the UAE", "A Legacy of Movement"
- [x] Copy Cleanup: All em-dashes/en-dashes removed from 30+ pages
- [x] EGMG Naming Audit: 100% "Eurogulf Mobility Group" in all public text
- [x] SEO Meta Titles: All pages use pipe separators (|)
- [x] Service-to-CTA Flow: Every service section ends with specific CTA

## Previously Completed (June 2026)
- [x] 30+ page corporate site aligned to strategy docs
- [x] Component splitting for code quality
- [x] 5 SEO landing pages
- [x] Arabic version: /ar (homepage, about, contact)
- [x] B2B/B2C mega-menu navigation
- [x] LeadConnector chat widget

## Upcoming
- [ ] Full Arabic Content Implementation (P1)
- [ ] WhatsApp Business API live chat integration (P1)
- [ ] Google Analytics / Tag Manager (P2)
- [ ] Portal Authentication Systems (P2)
