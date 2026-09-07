# Eurogulf Mobility Group — Corporate Website PRD

## Architecture
- **Frontend**: React + Tailwind CSS + Shadcn UI (port 3000, craco build)
- **Backend**: FastAPI + MongoDB (port 8001)
- **Brand Colors**: #EE5A01 (orange), #000000 (black), #666666 (gray)
- **Build**: `yarn build` (craco build) — 0 warnings, 0 errors

## Completed (Code Quality Review #3 Remediation — Sept 2026, iteration 29: 127/127 backend, all frontend flows pass)
- [x] Backend: `apply_for_job` 10 params → `Depends(application_form)` → `ApplicationForm` + helpers `validate_application`, `read_cv`, `store_cv`, `build_application_submission`, `queue_application_emails`; `startup()` → `ensure_indexes`, `seed_admin`, `seed_articles` (`SAMPLE_ARTICLES` constant), `apply_brand_rule`
- [x] Frontend splits (behaviour-preserving, all testids kept): `useAdminArticles` → `useArticleList` + `useArticleEditor`; `ArticleEditor` → `components/admin/ArticleEditorFields.js`; `ApplyModal` → `hooks/useApplyForm.js` + `ApplySuccess`/`CvPicker`/`ApplyForm`; `JobBoard` → `JobSearch`/`DeptFilters`; `Navigation` → `components/nav/NavParts.js`; `BookChauffeurPage` → `hooks/useBookingWizard.js` + `components/booking/BookingChrome.js`; `AboutPage` → `components/about/AboutSections.js` + `data/about.js`; `AutocarePage` → `components/autocare/AutocareSections.js`; `UsedCarsPage` → `components/usedcars/UsedCarsSections.js` + `AuctionTimer.js` (AR page imports it directly)
- [x] Tests: iter28 careers test split into fixture-based tests; `test_cms_api` shape check extracted; ruff `F` clean across `tests/`; `yarn build` 0 warnings; react-hooks lint 0 problems
- Rejected as false positives (verified): XSS at MediaCenterPage (DOMPurify applied), hook dependency warnings (official linter: 0), `is None`/`is not None` comparisons, dev-only `console.error` in `logger.js`

## Completed (Security Audit #2 + Code Review #2 Remediation — Sept 2026, iteration 28: 100% pass)
- [x] **Trusted client IP**: `client_ip()` takes the X-Forwarded-For entry just before the trusted proxy hops (`TRUSTED_PROXY_HOPS=2` in backend env: Cloudflare + LB). Spoofed headers no longer bypass rate limits or login lockout. Direct/localhost access falls back to the first header value (tests rely on this)
- [x] **Rate limiting on public forms** (`enforce_rate_limit`, `db.rate_limits`, 1h windows): `/api/contact` + `/api/bookings` 20/h per IP + 300/h global; `/api/careers/apply` 5/h per IP + 100/h global → 429 "Too many submissions from this connection. Please try again later or call 800 364."
- [x] Whitespace-only `full_name`/`phone`/`message` (contact), `name`/`phone`/locations (booking), name/phone/role (apply) → 422
- [x] **Admin inbox**: career applications show "Job application · <role>" badge, **Download CV** (authenticated `/api/admin/cv/{id}`, cookie session) and LinkedIn profile link (`InboxComponents.ApplicationExtras`)
- [x] **Brand rule**: seeded articles + `GET /api/` no longer use standalone "EGMG"; startup migration rewrites any stored article title/body containing `\bEGMG\b`
- [x] **Forms no longer fake success on API failure**: ContactPage, Europcar LeasingLeadForm, ChauffeurServicePage modal, PartnerWithUsPage, `/ar/contact` now show an error banner (`*-submit-error`), surfacing backend 429 detail (Arabic message on AR pages) via `utils/submitError.js`; BookChauffeur + AR partner/chauffeur forms use the same helper
- [x] ApplyModal: file input resets after invalid pick (re-selecting same file works); online apply sends English role title, header shows localized title
- [x] Tests: `/app/backend/tests/test_iter28_careers_security.py` (12); `tests/conftest.py` clears `rate_limits` before each test; stale "EGMG"/public-contacts assertions in older suites updated. Full suite 113/113
- Deferred hardening (P3): server-side sanitisation of article HTML (client DOMPurify only); tracked `backend/.env` secrets (set via deployment env in production)

## Completed (On-Site Job Application + Latest Openings placeholders — Sept 2026)
- [x] **Apply Online** modal on `/careers` + `/ar/careers` (`components/careers/ApplyModal.js`): name, email, phone, LinkedIn (optional), cover note, CV upload (PDF/DOC/DOCX ≤ 5 MB). `POST /api/careers/apply` (multipart) validates magic bytes, rate-limits 5/hour/IP, stores CV base64 in `cv_files`, creates a `contact_submissions` entry (`enquiry_type: "Careers: <role>"`, `role`, `linkedin_url`, `attachment_url: /api/admin/cv/{id}`) so it lands in the Admin Enquiries inbox; team alert + bilingual candidate confirmation via emailer (SMTP still PLACEHOLDER). `GET /api/admin/cv/{id}` (admin auth) downloads the CV
- [x] **Latest Openings strip** (`latestJobs` in `src/data/jobs.js`): 4 static placeholder roles with posted dates, per user decision "post latest jobs as placeholders once and leave as is". LinkedIn live scraping removed (EGMG has no roles on LinkedIn Jobs; company-id query returns 0)
- (Superseded in iteration 28: Download CV button added and full flow tested)

## Completed (Careers Job Board, LinkedIn Enrichment, Leadership in About, Arabic Portals — Sept 2026)
- [x] **Careers job board** (EN `/careers`, AR `/ar/careers`): 30 live roles from egmg.ae careers form + LinkedIn (Process Analyst), 5 departments with counts, search, expandable cards, Apply via `mailto:careers@eurogulf.ae` (prefilled subject/body), LinkedIn follow, Life-at-Eurogulf feed, Send CV. Data: `src/data/jobs.js`, component `components/careers/JobBoard.js`
- [x] **LinkedIn content** (`src/data/linkedinPosts.js`, 8 real posts EN+AR): homepage Featured Socials → real posts; `LinkedInFeed` on `/media`, `/ar/media`, careers pages
- [x] **About Us**: Vision, Mission, F.A.I.R. values + Leadership section (EN + AR) using shared `src/data/leadership.js` (egmg.ae photos; Mari Parian 2026/07 photo). Leadership pages refactored to shared data + `LeaderCard`
- [x] **Arabic portals** `/ar/portal/corporate`, `/ar/portal/driver` (21 Arabic routes; Arabic menu now fully Arabic)
- Note: LinkedIn company page is login-walled for scraping; posts were pulled from the public company page snapshot. EGMG has no jobs posted on LinkedIn Jobs; roles come from egmg.ae + LinkedIn hiring posts

## Completed (Code Quality Review Remediation — Sept 2026)
- [x] Refactors (behaviour-preserving, verified iteration 26): HomePage 477→235 lines (`components/home/TrustSections.js`, `SocialSections.js`); AdminDashboardPage 223→82 lines (`hooks/useAdminArticles.js`, `hooks/useAdminInbox.js`, `components/admin/AdminBanners.js`); Navigation 200→98 lines (`components/nav/NavDropdown.js`, `MobileMenu.js`); Footer sub-components; booking validation → `utils/bookingValidation.js`; `emailer._layout(spec)`
- [x] Real bugs fixed: `/book-chauffeur`, `/ar/partner`, `/ar/chauffeur-service` no longer show a fake success when the API fails (error banner + form preserved); Arabic forms now require the message field (backend requires it)
- [x] Hygiene: all `console.*` replaced with `logError`; unused eslint-disable directives removed (react-hooks lint: 0 problems); index keys → stable keys; nested ternaries → functions; unused backend imports removed; test files read `ADMIN_PASSWORD` from env (`tests/conftest.py`)
- Rejected as false positives: XSS (DOMPurify already applied), `is` vs `==` (all are `is None` checks), hook deps for module constants/globals (`API`, `axios`, `localStorage`)

## Completed (Arabic Downloads/Brands + Customer Confirmation Emails — Sept 2026)
- [x] `/ar/downloads` and `/ar/businesses` Arabic RTL pages; Arabic nav top-level "علاماتنا التجارية" → `/ar/businesses`; 19 Arabic routes total (every Arabic menu link now stays in Arabic except portals)
- [x] **Bilingual customer confirmation emails** (branded HTML, EN + AR) sent to the customer after enquiry / booking via SMTP background task; Reply-To = team alert address. `GET /api/admin/email-preview?type=contact|booking` (auth) + preview links in the admin alerts banner. **SMTP still PLACEHOLDER** (skip + log)
- [x] Theme-aware EGMG logo on brand overview cards (light mode uses dark-text logo)
- Regression tests: `/app/backend/tests/test_iter25_email_confirmations.py`

## Completed (Arabic Articles + Email Alerts — Sept 2026)
- [x] **Arabic article fields**: `title_ar` / `body_ar` on articles; admin editor "Arabic Version" block (RTL Quill); AR badge in list; `/ar/media` renders Arabic content RTL with English fallback; search matches `title` or `title_ar`
- [x] **Email alerts** to `et_reservations@eurogulf.ae` on new enquiry / booking via company SMTP (`/app/backend/emailer.py`, FastAPI BackgroundTasks, never fails the request). **SMTP credentials are PLACEHOLDERS** (`SMTP_ENABLED=false`); admin dashboard shows a banner until configured. `GET /api/admin/alerts-status`
- To activate: set `SMTP_HOST`, `SMTP_PORT`, `SMTP_SECURITY` (starttls|ssl), `SMTP_USERNAME`, `SMTP_PASSWORD`, `SMTP_FROM`, `SMTP_ENABLED=true` in backend env
- Regression tests: `/app/backend/tests/test_iter24_arabic_alerts.py`

## Completed (Enquiries Inbox + Arabic Media/Leadership/FAQ — Sept 2026)
- [x] **Admin Enquiries Inbox**: dashboard tabs Articles | Enquiries | Bookings; contact enquiries and chauffeur bookings listed newest-first with status dropdowns (contacts: new/contacted/closed; bookings: pending/confirmed/completed/cancelled), badge counts of open items, quick call / WhatsApp / email actions
- [x] Backend: `ContactSubmission.status` (default `new`), `GET /api/contacts|bookings?status=`, `PATCH /api/contacts/{id}/status`, `PATCH /api/bookings/{id}/status` (admin auth)
- [x] **Arabic pages** `/ar/media` (Arabic chrome, CMS articles rendered LTR), `/ar/leadership`, `/ar/faq`; language toggle + Arabic nav/footer map them (17 Arabic routes total)
- Regression tests: `/app/backend/tests/test_inbox_iter23.py`

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
- [ ] Production deploy: set `TRUSTED_PROXY_HOPS` to match the production proxy chain (2 = Cloudflare + LB, as in preview); verify with a spoofed X-Forwarded-For test
- [ ] Server-side sanitisation of article HTML on write (P3 hardening)
- [ ] Replace GTM-XXXXXXX with real GTM container ID + GA4 Measurement ID
- [ ] Supply real SMTP credentials and set SMTP_ENABLED=true to activate team alerts + customer confirmations
- [ ] Remaining Arabic pages: SEO landing pages, Dubai Municipality, Mobility Tech, Partners & Clients
- [ ] Careers: admin-managed job listings (CMS) instead of static data
- [ ] WhatsApp Business API live chat integration (P1)
- [ ] Portal Authentication Systems (P2)
- [ ] More Arabic pages (/ar/goldcar, /ar/truckline, /ar/autocare, /ar/used-cars, /ar/sustainability)
