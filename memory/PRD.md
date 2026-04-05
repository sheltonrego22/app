# EGMG Corporate Website — PRD

## Original Problem Statement
Build a premium, futuristic multi-page corporate website for EGMG — Eurogulf Mobility Group, a UAE-based mobility conglomerate established in 1976 with 12,000+ vehicles, 1,200+ employees, and 14 UAE locations. Dark-dominant UI (Primary Black #000000), Primary Orange (#EE5A01) for CTAs/accents, sharp corners, geometric elements, cinematic/VIP aesthetic. All content scraped from live egmg.ae website and rewritten with professional copywriting.

## Architecture
- **Frontend**: React 19 + React Router + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB (contact form storage)
- **Fonts**: Outfit (headings), Manrope (body), JetBrains Mono (accents)
- **Colors**: #EE5A01 (orange), #000000 (black), #111111 (cards), #666666 (gray), #F17B34 (hover), #EEEDE7 (cream)

## Pages Implemented (13 Total — Updated Feb 2026)

### Original Pages (7)
1. **Home** (/) — Hero, Stats (12K+ vehicles), 6 Services with division links, Fleet Carousel, Trust Pillars, Awards, Divisions, Testimonials, Instagram Grid
2. **About** (/about) — Hero, Timeline (1976–2024), Vision/Mission, F.A.I.R. Values (Fearless/Accountable/Innovative/Respectful), Divisions with page links, Leadership, Fleet Growth Chart
3. **Services** (/services) — Hero with Fleet Guide PDF download, Filter tabs, 6 service sections with cross-links to division pages
4. **Contact** (/contact) — Hero, Contact Form (MongoDB), WhatsApp, 14 Locations, International Bookings
5. **Leadership** (/leadership) — Hero with founders photo, 2 Owners, 7 Senior Leaders with bios
6. **Sustainability** (/sustainability) — Hero, 4 Pillars, Key Initiatives
7. **Media Center** (/media) — Featured Article, Category Filters, Search, 24 Article Grid

### Division Pages (6 — NEW)
8. **Europcar** (/europcar) — Hero, Stats bar (#1 Europe / #3 Worldwide / 143 Countries / 6000+ Locations), Short-term rental section, Vehicle leasing section, 3 service cards, 14 UAE locations grid, Fleet Guide PDF download, CTA
9. **Goldcar** (/goldcar) — Hero, 3 strength cards (Quality/24hr Service/5-Star Fleet), Value proposition with 6 benefits, CTA
10. **Royal Limousine** (/royal-limousine) — Hero, ISO 9001:2015 badge, 6 service cards (Corporate Transfers/Dedicated Chauffeurs/Airport/VIP Parking/Coordinators/Intercity), Fleet carousel, CTA
11. **Emirates Taxi** (/emirates-taxi) — Hero, 4 certification cards (ISO/Awards/RTA/Graded Drivers), Feature list, 24/7 availability display, CTA
12. **Truckline** (/truckline) — Hero, 3 service cards, 4 vehicle type cards (Delivery Vans/Box Trucks/Chiller Units/Flatbed), Benefits list, CTA
13. **Used Cars** (/used-cars) — Hero, Stats bar, 3 strength cards, Benefits list with buying advantages, CTA

## Content Source
All content extracted from live egmg.ae website and sub-division pages (Europcar, Goldcar, Royal Limousine, Emirates Taxi, Truckline, Used Car Trading). Content professionally rewritten highlighting EGMG's 50-year heritage and value creation.

## Key Features
- Download Fleet Guide (PDF) feature on Services and Europcar pages
- Navigation dropdowns with all 6 division links
- Footer with direct links to all division pages
- Real awards data: World Travel Awards (2005-2024), ISO 9001:2015, ISO 45001:2018, MENA Travel Awards, McDermott Award
- Real values: F.A.I.R. (Fearless, Accountable, Innovative, Respectful)
- Contact form with MongoDB persistence

## API Endpoints
- `POST /api/contact` — Submit contact enquiry
- `GET /api/contacts` — Retrieve submissions (paginated)

## Next Tasks
1. SEO meta tags + Open Graph per page
2. Schema.org structured data (LocalBusiness + Organization)
3. Multi-language support (Arabic/English)
4. CMS integration for dynamic media center content
5. Google Maps embed for locations
