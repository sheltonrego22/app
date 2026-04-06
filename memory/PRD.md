# EGMG Corporate Website — PRD

## Original Problem Statement
Build a premium, futuristic multi-page corporate website for EGMG — Eurogulf Mobility Group, a UAE-based mobility conglomerate established in 1976. Dark-dominant UI (#000000 black, #EE5A01 orange), sharp corners, geometric elements, cinematic/VIP aesthetic. All content, logos, images scraped from live egmg.ae. Professionally rewritten copy highlighting heritage and value creation.

## Architecture
- **Frontend**: React 19 + React Router + Tailwind CSS + Shadcn UI + react-helmet-async (SEO)
- **Backend**: FastAPI + MongoDB (contact form storage)
- **Fonts**: Outfit (headings), Manrope (body), JetBrains Mono (accents)

## Pages Implemented (16 Total — Feb 2026)

### Core Pages (7)
1. **Home** (/) — Hero, Stats, 6 Services, Fleet Carousel, Trust Pillars, Awards, Divisions with logos, Testimonials, Partner Logos (7), Instagram Grid, CTA
2. **About** (/about) — Hero, Timeline, Vision/Mission, F.A.I.R. Values, Divisions with logos, Leadership, Fleet Growth, Awards & Recognition (7 award images)
3. **Services** (/services) — Hero + Fleet Guide PDF, Filter tabs, 6 service sections with cross-links
4. **Contact** (/contact) — Hero, Form (MongoDB), WhatsApp, 14 locations, Google Maps embed, International Bookings
5. **Leadership** (/leadership) — 2 Owners + 7 Senior Leaders with real photos
6. **Sustainability** (/sustainability) — 4 Pillars, Key Initiatives
7. **Media Center** (/media) — Category Filters, Search, 24 Article Grid

### Division Pages (6)
8. **Europcar** (/europcar) — Stats, Rental/Leasing, 14 Locations, Fleet Guide PDF
9. **Goldcar** (/goldcar) — 3 Strengths, Value Proposition
10. **Royal Limousine** (/royal-limousine) — ISO badge, 6 Services, Fleet Carousel
11. **Emirates Taxi** (/emirates-taxi) — 4 Certifications, Features, 24/7
12. **Truckline** (/truckline) — 3 Services, 4 Vehicle Types, Benefits
13. **Used Cars** (/used-cars) — Stats, 3 Strengths, Benefits

### Additional Pages (3)
14. **Businesses** (/businesses) — Hub with 6 division cards, logos, EST. years
15. **Careers** (/careers) — 26 job listings, department filters, expandable cards
16. **404** (*) — Professional not-found page with "Back to Home"

## Production-Ready Features (Completed)
- **SEO**: react-helmet-async — unique title/description/OG/Twitter cards per page
- **Schema.org**: Organization + LocalBusiness JSON-LD structured data
- **Mobile**: Full responsive support (390px–1920px) with optimized hamburger menu, stacked layouts, touch-friendly inputs
- **404 Page**: Brand-consistent error page with navigation
- **Google Maps**: Embedded on Contact page (HQ location)
- **Fleet Guide PDF**: Download button on Services + Europcar pages

## API Endpoints
- `POST /api/contact` — Submit contact enquiry
- `GET /api/contacts` — Retrieve submissions (paginated)

## What Was Delivered
- 16 responsive pages optimized for mobile and desktop
- All real logos, photos, award images scraped from egmg.ae
- Professional copywriting across all content
- Full SEO implementation with structured data
- Contact form with MongoDB persistence
- Google Maps integration
- 100% test pass rate (5 testing iterations)

## Future Enhancements (Backlog)
1. CMS integration for dynamic media center content
2. WhatsApp Business API live chat widget
3. Performance optimization (code splitting, image optimization)
4. Analytics integration (Google Analytics / Tag Manager)
5. Fleet comparison tool across divisions
