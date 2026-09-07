# Learnings / gotchas
- NEVER append to .env with `>>`/heredoc: the file had no trailing newline and the key got glued onto ALERT_EMAIL. Use search_replace on .env.
- Long pytest runs (>100s) must run in background to a log; a foreground timeout mid `git stash` left changes stashed once.
- Public forms are rate-limited (20/h/IP contact+bookings, 5/h/IP apply). Test suites must clear `db.rate_limits` (conftest autouse fixture does this). The testing agent shares one egress IP.
- Preview ingress X-Forwarded-For = `client, cloudflare, lb` -> TRUSTED_PROXY_HOPS=2. Localhost direct calls use the first XFF value (fallback).
- Route for Partner page is `/partner` (not `/partner-with-us`).
- Redesign Phase 1 (Sept 2026): light-first. `.btn-*` classes set display:inline-flex and override Tailwind `hidden` → wrap in a `hidden sm:block` div instead. Uploaded image artifacts may arrive in a different order than expected: always view the saved files before naming them.
- index.css LEGACY BRIDGE remaps `.bg-black`, `.text-[#EEEDE7]` etc. to light colours globally. New components must use `bg-[#121212]`/`text-white` for intentional dark blocks (never `bg-black`/`text-[#EEEDE7]`).
