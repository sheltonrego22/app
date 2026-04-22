# EGMG Corporate Website — PRD

## Original Problem Statement
Build a premium, futuristic multi-page corporate website for EGMG — Eurogulf Mobility Group. Dark UI (#000000, #EE5A01). All content scraped from live egmg.ae, factually accurate, UAE-centric. Real EGMG social media content embedded.

## Architecture
- **Frontend**: React 19 + React Router + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB (contact form)
- **Fonts**: Outfit / Manrope / JetBrains Mono

## Pages (19 Total)
1. Home (/) — Hero, Stats, 6 Services, Fleet Carousel, Trust Pillars, Awards, Divisions w/logos, Why Choose EGMG, Social Feed w/YouTube Shorts, Partner Logos, CTA
2. About (/about) — "Your Vision, Our Journey" hero, Timeline, F.A.I.R. Values, Divisions, Awards (7 images)
3. Services (/services) — Filter tabs, 6 service sections, Fleet Guide PDF
4. Contact (/contact) — Form (MongoDB), 14 locations, Google Maps
5. Leadership (/leadership) — 9 leaders w/real photos
6. Sustainability (/sustainability) — 4 pillars (verified stats only)
7. Media Center (/media) — Dynamic CMS-powered articles, category filters, search, featured articles, expandable cards
8-13. Division pages: Europcar, Goldcar, Royal Limousine, Emirates Taxi, Truckline, Used Cars
14. Businesses (/businesses) — Hub w/6 divisions
15. Careers (/careers) — 26 jobs, department filters
16. Book Chauffeur (/book-chauffeur) — 4-step booking wizard with MongoDB persistence
17. Admin Login (/admin/login) — JWT auth with brute force protection
18. Admin Dashboard (/admin) — Full CMS: create/edit/delete articles with rich text editor, image/PDF upload, video embeds
19. 404 (*) — Error page

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
- POST /api/bookings — Submit chauffeur booking
- GET /api/bookings — Paginated retrieval of bookings
- POST /api/auth/login — Admin JWT login with brute force protection
- GET /api/auth/me — Current user session
- POST /api/auth/logout — Clear auth cookies
- POST /api/auth/refresh — Refresh access token
- GET /api/articles — Public articles (filter by category, search)
- GET /api/articles/:id — Single article
- POST /api/articles — Create article (auth required)
- PUT /api/articles/:id — Update article (auth required)
- DELETE /api/articles/:id — Delete article (auth required)
- POST /api/upload — File upload for images/PDFs (auth required)

## Testing: 10 iterations, 100% pass rate (bugs fixed inline)

## Brand Guidelines Audit (Feb 2026)
- Uploaded EGMG Logo1.png (orange icon + "EUROGULF MOBILITY GROUP") used site-wide: Nav, Footer, all division pages
- Europcar Logo2.png (green "moving your way") used exclusively on Europcar page
- Main tagline updated to "WE MOVE YOU!" per brand guidelines
- All hero sections center-aligned with symmetrical text placement
- No blank squares or broken logo images
- Removed all brightness-0 invert filters from EGMG logo renders
- Color palette verified: Orange #EE5A01 (50%), Black #000000 (40%), Gray #666666 (10%)

## Content & Visual Audit (Feb 2026)
- All hero images updated to UAE-specific photos (Dubai skyline, Sheikh Zayed Road, DXB airport)
- Real division logos scraped from egmg.ae (Europcar, Goldcar, Royal Limousine, Emirates Taxi, Truckline, Used Cars)
- Real EGMG about image from egmg.ae used on About page
- Truckline client logos (10 real logos from egmg.ae) added
- Emirates Taxi logo fixed across HomePage, BusinessesPage, and EmiratesTaxiPage
- All internal booking CTAs updated to /book-chauffeur (HomePage, ServicesPage, RoyalLimousinePage, EmiratesTaxiPage)
- External Europcar booking links preserved where appropriate (EuropcarPage, GoldcarPage, ContactPage international)

## Future Backlog
1. CMS for media center
2. WhatsApp Business live chat
3. Analytics (GA/GTM)
4. Performance optimization
