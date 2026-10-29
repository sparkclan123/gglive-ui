# Member redesign and concurrent Gameweeks implementation plan

> **For agentic workers:** Use superpowers:executing-plans for the member UI and superpowers:dispatching-parallel-agents for the independent API/admin work. Track completion below; do not deploy or build Docker.

**Goal:** Apply the approved red/black mobile design to the working member application, preserve the original player shirts and workflows, display rankings correctly, and allow separately scoped concurrent Gameweeks.

**Architecture:** Keep existing entry/edit/payment endpoints and rules. Add explicit Gameweek discovery/context to the member API and use PlayerGameWeek snapshots as club membership. Reuse functional Vue components, restyle all enabled surfaces, and introduce shared member branding and ranking/discovery components.

**Tech Stack:** Vue 3, Vuex, Vue Router, Vite, Go/Fiber/GORM, MySQL/Redis.

**Spec:** ../specs/2026-10-28-member-multi-gameweek-design.md. Latest user correction overrides the generic-shirt proposal: use the project's existing shirt assets and goalkeeper variants exactly. The user approved the design and explicitly authorized implementation; proceed without another approval round.

## Global constraints

- Mobile first, red dominant, black surfaces; only member branding is redesigned. No standalone club logos.
- Original player shirt URLs remain intact (including keeper and empty-slot variants).
- Budget 80, 11 players, slots 1/5/5/3, GK 1 / DEF >=3 / MID >=2 / FWD >=1, one captain, dynamic club cap, name max 18.
- Preserve normal/VIP creation, ticket use, score/reward rules, authorization and the difference between immediate and staged team editing.
- Preserve previous uncommitted Team VS work. Do not commit other work, build Docker, deploy, or write production data for testing.
- Work in the existing user workspace as requested; preserve all existing changes. No branch switching or migration execution.

## Shared API interfaces

- GET `/premier-league/v1/game-weeks-active`: `{ok, data: [{...GameWeek, teams: SafeTeamModel[], normal: {allPlayer, myTeam}, vip: {allPlayer, myTeam}}], currentTime}`. Return active rows, including scheduled ones, ordered by close time. No singleton cache.
- Existing game-week / game-week-n / game-week-only / challenge-list / challenge-list-n / get-all-my-teams accept optional positive `game_week_id`. Omitting it preserves legacy behavior.
- GET `/teams?game_week_id=ID`: clubs from distinct snapshot team IDs, including clubs now closed globally.
- GET `/game-week-player?seasonID=S&gameWeekID=G`: validate S matches G; return existing fields plus `teams` for that snapshot.
- Self-match creation accepts optional `game_week_id` and uses the selected round's season/window. Copy-team endpoint is scoped to selected week.
- Admin create request adds optional `team_ids: number[]`; omitted uses currently open teams; explicit empty is invalid. Snapshot only players in the selected season and selected clubs. Normal/VIP continue sharing one Gameweek.

## Review focus

- Switching route IDs during requests must not mix rosters, clubs, season or ownership data.
- A closed club in one round remains selectable in that round even after the catalog is changed for another round.
- No active rounds must still allow viewing historical rankings; missing profile rank badges must never hide ordinal rank numbers.
- Create/edit/copied entries cannot carry a captain/player from another round or another entry.
- Tiny screens, long Thai names, keeper assets, empty/loading/error states, and keyboard dialogs remain usable.

## Task 1 — Member API (independent)

Files: premierleague/app/app.go; controllers/GameWeekController*.go, teamController.go, PlayerGameListController*.go, GetAllMyTeamController.go, SelfMatchController.go, GameWeekCreateController.go; services/queryGameWeek.go, queryTeams.go; targeted Go tests.

- [x] Write failing tests for selected-round resolution, scoped club catalog, active list shape and season mismatch.
- [x] Implement the shared interfaces, preserve fallback behavior and authorization; validate player snapshot identity and captain ownership where cross-round context requires it.
- [x] Align legacy Gameweek creation semantics and per-round cache handling with the BO API.
- [x] Run targeted and full Go tests without any production database connection.

## Task 2 — Admin Gameweek creation (independent)

Files: premierleague-bo/controllers/GameWeekCreateController.go, GameWeekController.go and targeted tests; gglive-admin/src/pages/gameWeek/create-game-week.vue.

- [x] Write failing tests for omitted/empty/invalid/selected team IDs, season filtering, and transactional snapshot failure.
- [x] Add selectable clubs to the existing form, default currently open clubs, loading/error/empty handling; preserve existing appearance and create fields.
- [x] Persist selected-season snapshot including suspension state; detail club filters derive from round snapshots; invalidate applicable caches.
- [x] Run Go tests and admin Vite build. Preserve prior Team VS work.

## Task 3 — Builder context and appearance (independent UI file ownership)

Files: gglive-ui/src/pages/gglive/index.vue, indexn.vue; components/fantasy*/FantasyTeam.vue and PlayerSelection.vue (normal/VIP only); object/model_copy_my_team.vue; relevant shared context utility/tests.

- [x] Write failing tests for context isolation, wrong-season rejection and stale loads; preserve original shirt URL calculation.
- [x] Load selected Gameweek, season, snapshot clubs and ownership together, clear roster on context switch, handle stale responses and failed loads.
- [x] Restyle pitch, player picker and captain/copy sheets to match the approved preview while keeping every existing action, price/status/ownership filter and 25-item pagination.
- [x] Pass selected Gameweek to copy lookup; retain captain reselection, normal/VIP entry requirements, original shirts and empty-slot assets.
- [x] Run focused tests and coordinate build with root.

## Task 4 — Shared member shell, discovery and rankings (root)

Files: src/config/memberBrand.js; styles/member.css; components/member/*; layouts/*; pages/gglive/season.vue, challenge.vue, result-gameweek-list*.vue; services/gameweeks.js and tests.

- [x] Write failing tests for rank numbering (rank_p is a profile badge, not ordinal), open/scheduled/closed round handling, and season-aware navigation.
- [x] Implement central member branding, original generated hero only, six-item bottom nav and complete menu links.
- [x] Display all active rounds with selected round's own counts/club abbreviations, normal/VIP controls, windows, rewards and entry guards.
- [x] Render real rankings with ordinal numbers, pagination, correct mode/week, existing own/opponent-team viewing conditions, reward links and historical access.
- [x] Restyle login/register/reset using shared branding without changing authentication behavior.

## Task 5 — Remaining enabled flows and integration (root)

Files: src/pages/gglive/list.vue, result.vue, player-point-detail.vue, history.vue, setting.vue, selfMatchDetail*.vue, reward-detail.vue; src/components/list/*, result/*, detailpoint/*, selfPick/*; pages/gglive-detail/*; payment/payment.vue; shared modal/pagination components.

- [x] Preserve every enabled tab/route. Add per-entry editing eligibility and explicit week selection for self-created competitions.
- [x] Use scoped clubs for score/edit filters and selected entry's season; keep immediate/staged editing distinct.
- [x] Apply the shared dark red theme to linked screens, sheets, tables and forms; remove standalone club crests while preserving shirt and profile/frame assets.
- [x] Verify loading/error/empty states, sort/search/pagination, slip/account interactions without writing production records.

## Task 6 — Verification and review

- [x] Run member logic tests and both Vite builds (no Docker), and Go suites in both APIs.
- [x] Run browser checks on actual member app at 360/390/430 and desktop, real-data reads where compatible, isolated fixtures for two concurrent rounds and write-flow tests.
- [x] Verify original shirt image URLs/keeper images, actual ranking ordinals, all six enabled menus, and no horizontal page overflow.
- [x] Have a fresh reviewer inspect the combined changes; address material findings and rerun relevant checks.
- [x] Leave actual local app open for review, report completed behavior plus any honest limitations, no deploy.

## Verification record - 2026-10-28

- Member: `npm test` passes 8 test files. Meaningful cases cover snapshot/season isolation, stale loads, original shirt URLs, payloads, captain and copy, route restoration, pagination, self-match context and independent staged-edit controls.
- Both APIs: `go test ./... -count=1` passed without connecting to production databases. Admin form tests and both Vite builds passed. All four repositories passed `git diff --check`.
- Browser: actual Vue application at localhost:5174, using a local-only API adapter and football snapshots read from production. The adapter does not forward requests; team submission, ticket purchase and account update are blocked. Copy retrieval is simulated locally.
- Verified two simultaneous rounds with different club pools, roster reset and captain reset, keeper/empty/filled shirt images, numeric normal/VIP rankings, no-active-round access to rankings, all six menus, score filters, fixtures, both editors, self-match picker, ticket quantity, account, history and complete rules content.
- Checked 360, 390, 430 and 1280 CSS-pixel layouts; no horizontal page overflow in the checked views. Saved app screenshots outside the repositories under `.superpowers/artifacts/member-live-*.png` at the workspace root.
- Fresh backend/admin and frontend reviews completed; fixed the three important findings: cancelled-detail loading overlay, unreachable game rules and wrong list tab after Back. Browser review also fixed scoped-style precedence, nested buttons, obsolete filter warnings and numeric prop warnings.
- Member routes load on demand; the HEIC converter loads only when a HEIC image is selected. Main JS bundle is about 260 KB before compression. Existing inactive Big Match placeholder-image warning, outdated Browserslist metadata and the optional HEIC/admin chunk-size warnings remain non-blocking.
- No Docker build, deployment, migration execution, production team/ticket/account mutation or commit performed. Frontend and API changes must be released together later; the currently deployed API does not expose the new active-round list.
