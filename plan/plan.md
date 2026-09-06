# Plan: EGMG Light Theme, Arabic Content, Analytics & Social Feed

## 1. Light / Dark Theme Toggle

Add a site-wide theme toggle (sun/moon icon in the navigation bar) that lets visitors switch between the existing dark theme and a new light theme.

**Light theme palette** (derived from the EGMG brochure and brand guidelines):

| Role | Dark (current) | Light (new) |
|---|---|---|
| Page background | #000000 | #FFFFFF |
| Surface / card background | #111111 | #F5F2EC |
| Section alternate | #0A0A0A | #FAFAF8 |
| Primary text | #EEEDE7 | #1A1A1A |
| Secondary text | #666666 | #555555 |
| Primary accent | #EE5A01 | #EE5A01 (unchanged) |
| Secondary accent | #F17B34 | #F17B34 (unchanged) |
| Borders | white/5–10% | black/5–10% |
| Nav bar | black/95 | white/95 |

The toggle stores the user's preference in `localStorage` and respects the system `prefers-color-scheme` on first visit. Every existing page and component inherits the theme through CSS variables; no page-by-page restyling is needed.

The dark version of the site remains the default. The light version is the alternate.

**Brand guideline compliance**: Orange #EE5A01 stays the dominant accent at ~50% visual weight. Black and Cool Gray retain their roles in text hierarchy. The only deviation from the guidelines is using white/cream backgrounds instead of the black backgrounds currently in use — as the user explicitly requested.

## 2. Arabic Core Pages

Translate the following nine pages into professional Modern Standard Arabic with UAE-appropriate phrasing:

- Home (/ar)
- About (/ar/about)
- Services (/ar/services)
- Contact (/ar/contact)
- Europcar (/ar/europcar)
- Chauffeur Service (/ar/chauffeur-service)
- Leasing (/ar/leasing)
- Careers (/ar/careers)
- Partner With Us (/ar/partner)

Each Arabic page gets full RTL layout, matching structure and content to its English counterpart. An Arabic/English language switcher is added to the navigation. The three existing Arabic stub pages (/ar, /ar/about, /ar/contact) are replaced with complete content.

**Tone**: Professional, authoritative, and warm — matching the brand voice guidelines ("The Leader" archetype with "Caregiver" support). Copy avoids transliteration where natural Arabic equivalents exist.

## 3. Google Analytics 4 + Google Tag Manager

Add GTM and GA4 tracking that works correctly with React Router SPA navigation:

- GTM container snippet in `index.html` (head + body noscript).
- A `RouteAnalytics` component pushes a `virtual_page_view` event to the data layer on every route change, carrying `page_location`, `page_title`, and `page_referrer`.
- The GTM ID and GA4 Measurement ID are stored in environment variables (`REACT_APP_GTM_ID`). Placeholder values are used until the user provides real IDs.
- No direct `gtag.js` — GTM is the sole installation to avoid double-counting.

## 4. Live Social Media Feed + Updated Featured Socials

Two changes to the homepage social section:

**a. Updated Featured Socials cards** with the latest 2026 content from LinkedIn/Instagram:
- IMT Dubai Vaudeville 2026 (mobility partner)
- World Travel Awards 2026 nominations (Europcar + Royal Limousine)
- EGMG Leadership Development Programme 2026

**b. Live Instagram embed** below the featured cards — an embedded feed showing recent posts from @eurogulfmobility, using Instagram's oEmbed/Basic Display approach.

## 5. UAE-Relevant Imagery Audit

Verify that every image across the site is UAE-relevant. Replace any remaining generic stock photos with imagery showing:
- Dubai/Abu Dhabi skylines and landmarks
- UAE road infrastructure and desert landscapes
- Vehicles on recognisable UAE streets

This applies to hero backgrounds, service section images, and the social gallery.

## Assumptions

- Dark theme stays the default; light is the alternate.
- The Arabic translation is done in-code (hardcoded content, not a CMS/i18n service) — matching the current approach for the three existing Arabic pages.
- GTM/GA4 IDs will be provided later; the code ships with clearly marked placeholders.
- The live Instagram feed uses a simple embed approach; if Instagram blocks the embed in certain environments, a static fallback showing the latest posts with links is used instead.
- No changes to backend API, database schema, or admin CMS.
- The Europcar H1 presentation colour palette is not used (per user instruction to ignore it).
