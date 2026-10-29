# Kickมันส์ Member Rebrand Implementation Plan

> **For agentic workers:** Use executing-plans for integration and dispatching-parallel-agents for the independent auth and detail presentation tasks.

**Goal:** Apply the user's Kickมันส์ rebrand, compact football-first mobile layouts, and persistent Light/Dark themes while preserving the member workflows.
**Architecture:** Keep the Vue/API contracts and existing fantasy assets. Centralize identity and theme preferences; split independent auth and team presentation work from shared navigation/theme integration.
**Tech Stack:** Vue 3, existing CSS and Vite, node:test.
**Spec:** User's 2026-10-29 request extends the approved member design and mobile polish. Bottom navigation loses only its “เมนู” item; five core destinations remain. Profile icon beside tickets opens the menu. No additional design approval is needed for these requested refinements.

## Design direction
- Identity: Kickมันส์, user-supplied transparent football logo, scaled per context; red remains the primary action color.
- Palette: kick red #E52520, deep red #B91018, dark pitch #080808, panel #191919, light canvas #F4F6F8, light panel #FFFFFF. Text: #F7F4F1 / #17212B. Light red text must use a darker shade for contrast.
- Type: existing Noto Sans Thai for clear labels and Thai identity; Barlow Condensed for scores and football headlines.
- Login: new football entry composition with a compact red pitch illustration, clear login form, visible social sign-ins and registration/reset access. No new image generation or club logos. User supplied official logo during implementation; preserve its artwork and use responsive resized PNG variants.
- Loading: restrained football/pitch movement, readable loading status, reduced-motion fallback, brand at first paint.
- Team header: back control beside title/context; points and stats in one compact strip. Preserve every stat and edit action.
- Competition: compact heading/selectors/stat strip and dense readable ranking rows. Pagination remains thumb-friendly on 320px, correctly numbered across pages and guarded while loading.
- Theme: two explicit options, persisted locally and applied before paint. Include teleported dialogs, forms, pitch, support flows and auth states.

## Constraints
No deployment, Docker builds, production writes or commits. Preserve technical application keys, API/OAuth/CDN endpoints, existing player shirts, confidential account logic, formation/captain/budget rules and normal/VIP semantics. Existing uncommitted work remains intact.

## Tasks
- [x] Shared identity, navigation/profile entry, Light/Dark preference + no-flash initialization and meaningful preference tests. Owner root.
- [x] New login and loading presentation, aligned registration/reset, same authentication behavior and theme-aware styles. Owner auth worker.
- [x] Compact shared team header across own/other team and both editors, preserving data/actions. Owner details worker.
- [x] Compact competition and robust pagination, multi-page regression tests. Owner root.
- [x] Theme coverage audit and integration across enabled member screens, 320/390/430/desktop QA, test/build, fresh review and saved screenshots. Owner root.

## Review focus
Storage unavailable/invalid preferences must not break login. First paint must match saved theme. Lazy scoped CSS must not undo light mode or dialog sizing. Pagination must handle first/middle/last, large page counts, stale requests and rank offsets without overflow. Header compaction must retain team identity, context, points, stats, edit actions and original shirts.


## Verification — 2026-10-29
- `npm test`: all 11 test files passed; includes authentication flow contracts, preference persistence/storage failures, team details, pagination boundaries/large counts, and existing mobile interactions.
- `npm run build`: passed. Existing warnings remain for outdated Browserslist data, the inactive Bigmatch placeholder field image, and large vendor chunks.
- `git diff --check`: passed.
- Chrome responsive checks at 320, 390, and 430 px; desktop home at 1280 px. Checked supplied logo sizing, five bottom destinations, profile menu, Light/Dark, reload persistence, login/register/reset forms, own/other team headers, original 11 shirts, player dialogs, payment secondary buttons, and ranking pagination.
- Ranking fixture contains 358 rows across four pages: direct jump to page 4 shows 301–358, disables Next, and returns the first row into view. Previous-page behavior also verified.
- Browser review exposed lazy scoped CSS overriding player action colors and the picker close icon; fixed selector priority and confirmed readable Light colors and 44px controls.
- Saved screenshots: `.superpowers/artifacts/kickmun-login-dark.png`, `kickmun-login-light.png`, `kickmun-team-light.png`, `kickmun-competition-light.png`, `kickmun-pagination-320.png`, and `kickmun-home-dark.png` in the workspace root.
- LAN preview remains at http://192.168.1.23:5175 with a local fixture API. No production writes, Docker build, deployment, migration, or commit performed. Physical iOS/Android keyboard behavior is not device-tested.
