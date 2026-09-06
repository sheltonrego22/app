# Eurogulf Mobility Group — Corporate Website PRD

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI (port 3000, craco build)
- **Backend**: FastAPI + MongoDB (port 8001)
- **Brand Colors**: #EE5A01 (orange), #000000 (black), #666666 (gray)
- **Build**: `yarn build` (craco build) — 0 warnings, 0 errors

## Completed (Theme, Arabic, Analytics, Social — Sept 2026)
- [x] **Light/Dark Theme Toggle**: Sun/moon icon in nav, CSS custom properties, localStorage persistence, system prefers-color-scheme on first visit. Light palette: #FFFFFF bg, #F5F2EC cards, #1A1A1A text. Hero sections keep light text over dark images.
- [x] **Language Switcher**: Globe icon + EN/عربي in nav, links between / and /ar paths
- [x] **9 Arabic Pages (Full RTL)**: /ar, /ar/about, /ar/contact, /ar/services, /ar/europcar, /ar/chauffeur-service, /ar/leasing, /ar/careers, /ar/partner — all with complete MSA content
- [x] **GA4 + GTM Integration**: GTM container snippet in index.html (placeholder GTM-XXXXXXX), RouteAnalytics component pushes virtual_page_view events on SPA route changes, analytics.js helpers
- [x] **Updated Featured Socials**: IMT Dubai Vaudeville 2026, World Travel Awards 2026 nominations, Leadership Development Programme 2026 + Instagram embed CTA
- [x] **Arabic Translations**: Extended i18n/ar.js with services, europcar, chauffeur, leasing, careers, partnerWithUs sections

## Previous Completions
- [x] Model Build Upgrade: Partner logos, Trust Signal, Dual-Action Hero, Mobile Contact Bar, Fleet Savings Calculator, Impact Headers, Copy Cleanup
- [x] 30+ page corporate site, 5 SEO pages, component splitting, B2B/B2C nav, LeadConnector chat

## Upcoming
- [ ] Replace GTM-XXXXXXX with real GTM container ID + GA4 Measurement ID
- [ ] WhatsApp Business API live chat integration (P1)
- [ ] Portal Authentication Systems (P2)
- [ ] More Arabic pages (/ar/goldcar, /ar/truckline, /ar/autocare, /ar/used-cars, /ar/sustainability)
