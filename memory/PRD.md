# Eurogulf Mobility Group (EGMG) — Corporate Website PRD

## Original Problem Statement
Build a premium, futuristic multi-page corporate website for Eurogulf Mobility Group. The website positions "Eurogulf Mobility" as the master brand above its sub-brands. Production-ready with dynamic booking forms, CMS-backed Media Center, SEO optimisation, and strict brand guidelines.

## Core Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI (port 3000)
- **Backend**: FastAPI + MongoDB (port 8001)
- **Brand Colors**: Primary Orange #EE5A01, Secondary Black #000000, Europcar Green #2d8c3c (Europcar page only)
- **Fonts**: Outfit (headings), Roboto (body), JetBrains Mono (accents)

## Navigation Structure
HOME | ABOUT EGMG | OUR BRANDS | MOBILITY SOLUTIONS | SUPPORT & RESOURCES | CAREERS | PARTNER WITH US | CONTACT

### MOBILITY SOLUTIONS (Mega-Menu - B2B/B2C Split)
**Corporate / B2B:** Fleet Consultancy, Customised Commercial Vehicle Leasing, Corporate Rental, Staff Transport & Mobility Solutions, Managed Transport for Events & Delegations, Digital Fleet Management & Tracking
**Retail / B2C:** Rent a Car (Europcar/Goldcar), Book Your Monthly Rental, Book Your Premium Chauffeur, Outbound Reservations, Buy Pre-Owned

## Brand Names & Logos (Updated June 2026)
- Europcar → /europcar-logo.png (green/yellow uploaded logo)
- Goldcar → /goldcar-logo.png (lime/black uploaded logo)
- Truckline Transport
- Eurogulf Premium Chauffeur
- Eurogulf Auto Garage
- Eurogulf Used Cars
- EGMG Master → /egmg-logo-transparent.png, /egmg-logo-black.png

## Pages (25+)
All pages use UAE-relevant imagery (Dubai skyline, Sheikh Zayed Road, local landmarks).
Legacy pages (RoyalLimousinePage, EmiratesTaxiPage) removed — routes redirect to ChauffeurServicePage.

## Third-Party Integrations
- LeadConnector chat widget (loaded via index.html script tag)
- YouTube embeds
- Admin CMS: JWT auth, React Quill, DOMPurify

## Completed (June 2026)
- [x] Full 25+ page corporate site
- [x] Brand logos updated (Europcar, Goldcar, EGMG from uploaded assets)
- [x] All images UAE-relevant
- [x] Legacy pages removed (Royal Limousine, Emirates Taxi → redirect to Chauffeur)
- [x] LeadConnector chat widget integrated
- [x] Health endpoint for Kubernetes
- [x] Code quality fixes (hooks, error handlers, XSS)
- [x] Comprehensive QA: 98% pass rate

## Upcoming
- [ ] WhatsApp Business API live chat (P1)
- [ ] Google Analytics / Tag Manager (P2)
- [ ] Arabic language version (/ar)
- [ ] SEO landing pages
