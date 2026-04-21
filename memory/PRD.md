# EGMG Corporate Website — PRD

## Original Problem Statement
Build a premium, futuristic multi-page corporate website for EGMG — Eurogulf Mobility Group. Dark UI (#000000, #EE5A01). All content scraped from live egmg.ae, factually accurate, UAE-centric. Real EGMG social media content embedded.

## Architecture
- **Frontend**: React 19 + React Router + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB (contact form)
- **Fonts**: Outfit / Manrope / JetBrains Mono

## Pages (16 Total)
1. Home (/) — Hero, Stats, 6 Services, Fleet Carousel, Trust Pillars, Awards, Divisions w/logos, Why Choose EGMG, Social Feed w/YouTube Shorts, Partner Logos, CTA
2. About (/about) — "Your Vision, Our Journey" hero, Timeline, F.A.I.R. Values, Divisions, Awards (7 images)
3. Services (/services) — Filter tabs, 6 service sections, Fleet Guide PDF
4. Contact (/contact) — Form (MongoDB), 14 locations, Google Maps
5. Leadership (/leadership) — 9 leaders w/real photos
6. Sustainability (/sustainability) — 4 pillars (verified stats only)
7. Media Center (/media) — Filters, Search, 24 articles
8-13. Division pages: Europcar, Goldcar, Royal Limousine, Emirates Taxi, Truckline, Used Cars
14. Businesses (/businesses) — Hub w/6 divisions
15. Careers (/careers) — 26 jobs, department filters
16. 404 (*) — Error page

## Content Accuracy (Verified Feb 2026)
- Tagline: "Your Vision, Our Journey" (from egmg.ae)
- Stats: 12,000+ vehicles, 1,200+ employees, 14 locations, Est. 1976
- Values: F.A.I.R. (Fearless, Accountable, Innovative, Respectful)
- Awards: World Travel Awards (2005-2024), ISO 9001:2015, ISO 45001:2018, MENA Travel Awards, McDermott Award
- Social: @eurogulfmobility (Instagram), YouTube Shorts embedded
- No fabricated testimonials or unverified claims

## API Endpoints
- POST /api/contact — Submit enquiry
- GET /api/contacts — Paginated retrieval

## Testing: 6 iterations, 100% pass rate all

## Future Backlog
1. CMS for media center
2. WhatsApp Business live chat
3. Analytics (GA/GTM)
4. Performance optimization
