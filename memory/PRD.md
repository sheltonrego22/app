# EGMG Corporate Website — PRD

## Original Problem Statement
Build a premium, futuristic multi-page corporate website for EGMG — Eurogulf Mobility Group, a UAE-based mobility conglomerate established in 1976. Dark-dominant UI (#000000 black, #EE5A01 orange), sharp corners, geometric elements, cinematic/VIP aesthetic. All content, logos, and images scraped from the live egmg.ae website and professionally rewritten.

## Architecture
- **Frontend**: React 19 + React Router + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB (contact form storage)
- **Fonts**: Outfit (headings), Manrope (body), JetBrains Mono (accents)

## Pages Implemented (15 Total — Updated Feb 2026)

### Core Pages
1. **Home** (/) — Hero, Stats, 6 Services with links, Fleet Carousel, Trust Pillars, Awards Ticker, Divisions with real logos, Testimonials, Partner Logos (7), Instagram Grid, CTA
2. **About** (/about) — Hero, Timeline (1976-2024), Vision/Mission, F.A.I.R. Values, Divisions with logos, Leadership, Fleet Growth Chart, **Awards & Recognition** (7 real award images from egmg.ae)
3. **Services** (/services) — Hero + Fleet Guide PDF download, Filter tabs, 6 service sections with cross-links
4. **Contact** (/contact) — Hero, Form (MongoDB), WhatsApp, 14 real location addresses (scraped from egmg.ae/contact/)
5. **Leadership** (/leadership) — 2 Owners + 7 Senior Leaders with real photos from egmg.ae
6. **Sustainability** (/sustainability) — 4 Pillars, Key Initiatives
7. **Media Center** (/media) — Category Filters, Search, 24 Article Grid

### Division Pages (6)
8. **Europcar** (/europcar) — Stats (#1 Europe, #3 Worldwide), Rental/Leasing, 14 Locations, Fleet Guide PDF
9. **Goldcar** (/goldcar) — 3 Strength cards, Value Proposition
10. **Royal Limousine** (/royal-limousine) — ISO badge, 6 Services, Fleet Carousel
11. **Emirates Taxi** (/emirates-taxi) — 4 Certifications, Features, 24/7 display
12. **Truckline** (/truckline) — 3 Services, 4 Vehicle Types, Benefits
13. **Used Cars** (/used-cars) — Stats, 3 Strengths, Buying Benefits

### New Pages (from original egmg.ae structure)
14. **Businesses** (/businesses) — Hub page with all 6 division cards, real logos, descriptions, EST. year
15. **Careers** (/careers) — 26 job listings, department filters, expandable cards, "Apply via Email"

## Content & Assets Source
- All content, logos, award images, leadership photos, partner logos, and location addresses scraped from live egmg.ae website
- 6 division logos from EGMG timeline
- 7 partner/client logos
- 7 award/certification images
- 9 leadership photos

## API Endpoints
- `POST /api/contact` — Submit contact enquiry
- `GET /api/contacts` — Retrieve submissions (paginated)

## Next Tasks
1. SEO meta tags + Open Graph per page
2. Schema.org structured data
3. Multi-language support (Arabic/English)
4. CMS integration for dynamic media center
5. Google Maps embed for locations
