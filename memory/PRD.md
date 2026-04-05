# EGMG Corporate Website — PRD

## Original Problem Statement
Build a premium, futuristic multi-page corporate website for EGMG — Eurogulf Mobility Group, a UAE-based mobility conglomerate established in 1976 with 9,000+ vehicles, 1,200+ employees, and 14 UAE locations. 4 pages: Home, About, Services, Contact.

## Architecture
- **Frontend**: React 19 + React Router + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + MongoDB (contact form storage)
- **Fonts**: Outfit (headings), Manrope (body), JetBrains Mono (accents)
- **Colors**: #EE5A01 (orange), #000000 (black), #111111 (cards), #666666 (gray), #F17B34 (hover), #EEEDE7 (cream)

## User Personas
1. **Corporate Client**: Seeking fleet leasing, bulk vehicle management
2. **Individual Traveler**: Looking for car rental or chauffeur service
3. **Event Planner**: Needing group transport (coaches, buses)
4. **International Visitor**: Airport transfer, Europcar booking

## Core Requirements (Static)
- 4-page corporate website (Home, About, Services, Contact)
- Dark-dominant UI with orange (#EE5A01) accents
- Contact form with MongoDB storage
- CTA buttons linking to Europcar booking engine
- Responsive design (desktop, tablet, mobile)
- Scroll animations, counter animations, carousels
- Brand-aligned typography and visual language

## What's Been Implemented (Feb 2026)
- [x] Home page: Hero, Stats Counter, Services Overview, Fleet Carousel, Trust Pillars, Awards Ticker, Division Showcase, Testimonials, Instagram Grid, CTA Banner
- [x] About page: Hero, Timeline (interactive), Vision/Mission split, Core Values, Divisions, Leadership section, Fleet Growth Chart (recharts)
- [x] Services page: Hero, Filter tabs (7 categories), 6 service detail sections (Car Rental, Leasing, Chauffeur, Coach, Truck, Used Cars)
- [x] Contact page: Hero, Contact form (MongoDB), WhatsApp button, Locations grid (14), International Bookings
- [x] Navigation: Sticky header, Services dropdown, mobile hamburger overlay, Book Now CTA
- [x] Footer: 4 columns, social links, copyright
- [x] Backend: POST /api/contact with validation, GET /api/contacts
- [x] Scroll-triggered animations, counter animations
- [x] Responsive design

## Prioritized Backlog
### P0 (Complete)
- All 4 pages functional
- Contact form working with MongoDB
- Navigation and routing

### P1 (Next)
- SEO meta tags and Open Graph tags per page
- Schema markup (LocalBusiness + Organization)
- Image optimization / lazy loading improvements
- Mobile interaction refinements

### P2 (Future)
- Live Instagram API integration
- Booking engine integration (direct Europcar API)
- Multi-language support (Arabic/English)
- CMS integration for dynamic content
- Google Maps embed for locations

## Next Tasks
1. Add comprehensive SEO meta tags to each page
2. Add Schema.org structured data
3. Optimize images for performance
4. Enhance mobile hamburger menu with service sub-links
5. Add page transition animations
