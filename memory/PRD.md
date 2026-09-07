# Eurogulf Mobility Group — Corporate Website PRD

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI (port 3000, craco build)
- **Backend**: FastAPI + MongoDB (port 8001)
- **Brand Colors**: #EE5A01 (orange), #000000 (black), #666666 (gray)
- **Build**: `yarn build` (craco build) — 0 warnings, 0 errors

## Completed (Security Audit Remediation — Sept 2026)
- [x] **SEC-001 (High)**: `GET /api/contacts` and `GET /api/bookings` now require admin auth (were public PII leaks)
- [x] **SEC-002**: hardcoded admin password default removed (seed skips if `ADMIN_PASSWORD` missing/<12 chars); `JWT_SECRET` rotated. Env sync kept so password rotates via deployment env var
- [x] Cookies `Secure` (COOKIE_SECURE env, default true); CORS explicit allowlist (`CORS_ORIGINS`), credentials only for non-wildcard
- [x] Article search `$regex` escaped + capped; uploads: 10 MB cap + magic-byte check; `/api/uploads` sends `nosniff`
- [x] Article `image_url`/`pdf_url` must be http(s) or `/api/uploads/`; `video_url` must be https YouTube/Vimeo embed (backend validators + frontend `safeUrl`/`safeEmbed` + iframe sandbox)
- [x] Brute-force lockout honours `X-Forwarded-For` (works behind proxy) + per-account throttle (20 failures); admin UI surfaces 422 field errors
- Regression tests: `/app/backend/tests/test_security_audit.py`, `/app/backend/tests/test_lockout_iter22.py`
- OPEN (platform-level): `backend/.env` with secrets is git-tracked by platform convention; production should set `ADMIN_PASSWORD`, `JWT_SECRET`, `CORS_ORIGINS` via deployment environment and redeploy

## Completed (Arabic Brand Pages + Live Instagram — Sept 2026)
- [x] **5 new Arabic RTL pages**: `/ar/goldcar`, `/ar/truckline`, `/ar/autocare`, `/ar/used-cars`, `/ar/sustainability` (inline Arabic content, Cairo font, `ar-*-hero` testids, Arabic auction timer labels)
- [x] **Live Instagram posts**: 3 real posts from @eurogulfmobility embedded on the homepage via `instagram.com/embed.js` (`src/config/social.js`), branded card kept underneath
- [x] **Light-mode logo**: generated `/egmg-logo-dark-text.png`; nav + footer swap logo by theme
- [x] Language toggle + Arabic nav/footer map all 14 Arabic routes

## Completed (Arabic Nav/Footer, Image Fix, Light Hero Polish — Sept 2026)
- [x] **Arabic Navigation + Footer**: `/ar` routes render RTL nav/footer with Arabic labels and Arabic hrefs (data in `src/i18n/navData.js`); language toggle maps to the equivalent page (`/contact` <-> `/ar/contact`, no Arabic page -> `/ar`)
- [x] **Cairo Arabic web font** + zero letter-spacing for `[dir="rtl"]`
- [x] **Light-mode hero contrast**: all gradient/image heroes (Arabic + 12 English pages incl. SEO pages) now carry `data-testid="*-hero"` so text stays cream; orange tagline and `.btn-ghost` keep hero styling
- [x] **Broken egmg.ae images fixed**: 27 `webp-express` cache URLs (404) rewritten to original `/wp-content/uploads/...` files (leadership, about, truckline, europcar, homepage gallery)
- [x] **Arabic home fixes**: stats labels added to `ar.js` (React key warning resolved), `/ar/brands` dead link -> `/ar/services`, brand/CTA links point to Arabic pages where they exist
- [x] **InstagramPosts component**: official post embeds via `instagram.com/embed.js`; reads `INSTAGRAM_POST_URLS` in `src/config/social.js` (currently EMPTY, branded card shown until URLs are supplied)

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
- [ ] Remaining Arabic pages: /ar/media, /ar/leadership, /ar/faq, /ar/downloads, /ar/businesses, SEO landing pages
- [ ] WhatsApp Business API live chat integration (P1)
- [ ] Portal Authentication Systems (P2)
- [ ] More Arabic pages (/ar/goldcar, /ar/truckline, /ar/autocare, /ar/used-cars, /ar/sustainability)
