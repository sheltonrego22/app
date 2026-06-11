# Eurogulf Mobility Group (EGMG) — Corporate Website PRD

## Original Problem Statement
Build a premium, futuristic multi-page corporate website for Eurogulf Mobility Group. The website positions "Eurogulf Mobility" as the master brand above its sub-brands (Europcar, Goldcar, Eurogulf Chauffeur, Truckline, Eurogulf Used Cars, Eurogulf Autocare). Production-ready with dynamic booking forms, CMS-backed Media Center, SEO optimization, and strict brand guidelines.

## Core Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI (port 3000)
- **Backend**: FastAPI + MongoDB (port 8001)
- **Brand Colors**: Primary Orange #EE5A01, Secondary Black #000000, Europcar Green #2d8c3c (Europcar page only)
- **Fonts**: Outfit (headings), Roboto (body), JetBrains Mono (accents)

## Navigation Structure (Strategy Doc Aligned)
HOME | ABOUT EGMG | OUR BRANDS | CORPORATE SOLUTIONS | MEDIA & PRESS | CAREERS | CONTACT

## Pages Implemented (21+)
1. **HomePage** — "50 Years of Moving the UAE Forward" hero, 5-stat bar, 6 brand cards, group intro, partner showcase, awards, Dubai Municipality, social/video, CTA
2. **AboutPage** — "Five Decades..." hero, opening paragraphs, 9-milestone timeline, Vision/Mission, F.A.I.R values, 6 brand cards, fleet growth chart, awards
3. **EuropcarPage** — Europe's #1 hero, key facts bar (5000+/1.5yr/14/500+/3/24-7), brand story, rental comparison table (Daily/Weekly/Monthly), green monthly rental box, leasing lead form, international car hire (143 countries), 14 locations grid
4. **GoldcarPage** — "Smart Travel Starts Here" hero, international brand story (35+ years, 60000+ fleet), Sharjah Airport exclusive, what makes different
5. **ChauffeurServicePage** — "UAE's Most Trusted..." hero, 6 service types, 5-vehicle limo fleet (Mercedes E/S-Class, Escalade, GMC Yukon, V-Class, Denali, Sprinter), 800+ drivers section, bus/coach stats (800/800+/5000+), "Enquire Now" CTA, booking modal
6. **AutocarePage** *(NEW)* — "Where Fleet Standards Meet Workshop Excellence" hero, 6 services, 4 features, insurance partners
7. **TrucklinePage** — "Commercial Vehicle Leasing Built for UAE's Most Demanding Operations" hero, 4 services, sectors, client logos
8. **UsedCarsPage** — "Pre-Owned Vehicles You Can Trust" hero, auction system, 6 sample vehicles, advantages, how it works
9. **BusinessesPage** — "Our Brands" (6 cards with correct names/descriptions/links)
10. **PartnersClientsPage** — "Trusted by UAE's Most Recognisable Names" hero, 6 client categories, 14 major events
11. **DubaiMunicipalityPage** — "Proud Partners of Dubai Municipality" hero, 6 services, impact section
12. **ServicesPage** — Filter tabs (All/Rental/Leasing/Chauffeur/Coach/Freight/Used), detailed service sections
13. **LeasingPage** — Corporate leasing solutions
14. **BookChauffeurPage** — Chauffeur booking flow
15. **MediaCenterPage** — CMS-backed articles/news
16. **AdminDashboardPage** — Admin CMS for Media Center
17. **LeadershipPage, SustainabilityPage, CareersPage, ContactPage** — Supporting pages
18. **RoyalLimousinePage, EmiratesTaxiPage, MobilityTechPage** — Legacy brand pages (retained)

## Key Integrations
- YouTube Embeds (no key required)
- Admin CMS: JWT auth, React Quill, DOMPurify (XSS prevention)
- MongoDB persistence for contacts, bookings, articles

## SEO
- React Helmet with JSON-LD Schema
- Per-page meta titles and descriptions matching strategy doc

## What's Been Completed (as of June 2026)
- [x] Full 21+ page corporate site
- [x] Admin CMS for Media Center (MongoDB, JWT, React Quill)
- [x] EGMG Brand Guidelines (Orange/Black, Outfit/Roboto fonts)
- [x] "Eurogulf Mobility" naming (not "EGMG" for public-facing text)
- [x] Code quality fixes (XSS, React keys, hook deps, crash fix)
- [x] **Content alignment with "Who We Are" PDF & Website Strategy doc** *(DONE)*
- [x] Europcar page with 4-section CTAs (green buttons, redirect URLs correct)
- [x] Chauffeur page with fleet/bus/coach stats per strategy doc
- [x] Eurogulf Autocare page (NEW)
- [x] Navigation restructured per strategy doc hierarchy
- [x] All brand pages updated with strategy doc copy
- [x] Deployment check passed

## Upcoming Tasks
- [ ] WhatsApp Business API live chat integration (P1)
- [ ] Google Analytics / Tag Manager integration (P2)
- [ ] Component refactoring (AdminDashboardPage, HomePage, ServicesPage — large files)
- [ ] Arabic language version (/ar)
- [ ] SEO landing pages (car-rental-dubai, monthly-car-rental-dubai, etc.)
