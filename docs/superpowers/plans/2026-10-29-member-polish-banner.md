# Member navigation, session exit, campaign banner and auth design

**Goal:** Fulfil the user's follow-up changes in the existing uncommitted checkout. No Docker, deploy, production mutation, migration execution or commits.
**Spec:** User explicitly requests implementation: text menu instead of avatar, smaller topbar logo, reliable logout, subtle red linework in team-building background, administrator-changeable home banner, redesigned login/register. Previously approved mobile-first red identity, original shirts, normal/VIP and auth contracts remain binding.
**Execution:** Independent auth presentation and banner backend tasks may run concurrently under dispatching-parallel-agents; root owns session/navigation, admin/member banner UI, integration and browser QA. Review code at completion.

## Design / decisions
- Keep Vue 3, Fiber/GORM and existing object storage. No new frontend dependencies.
- Menu is a text button “เมนู”, no avatar/icon. Member topbar logo 54px mobile / 64px desktop inside a 60/64px header.
- Red #E52520 / deep red #B91018, dark #080808, panel #191919, light #F4F6F8 / white. Existing Noto Sans Thai and Barlow Condensed.
- Subtle static red linework behind member home/team-building surfaces; cards and original green pitch/shirts stay clear. Respect both themes.
- Auth direction: football admission-ticket composition with a slim brand header, compact mobile title, dominant readable form; no current side-by-side red hero block. Register visually groups phone verification and identity without changing submission/OTP flow. Shared reset styling remains coherent.
- One home banner, editable in a dedicated admin menu. Main image, optional mobile image, alt text, optional internal/http(s) link, enabled flag. Full image displayed with its own aspect ratio. Empty/disabled/unavailable/broken images fall back to the existing football hero. No carousel/autoplay requirement.
- Store singleton in member_banners table; migration supplied only. Admin routes GET/PUT /api/admin/v1/member-banner, POST /api/admin/v1/upload-member-banner (file field image, max 3 MiB JPEG/PNG). Member authenticated GET /api/premier-league/v1/member-banner. Response {ok:true,data:{id,image_url,mobile_image_url,alt_text,link_url,enabled,updated_at}}; member data null when disabled/unconfigured.
- Upload creates unique objects without overwriting the existing promo. Aspect ratio preserved, longest edge max 1600px; bounded decoded dimensions. No production upload during QA.
- Logout first preserves the token for revocation, clears local auth/callback/profile + Vuex/ticket state, closes menu and replaces route with login. Best-effort bounded server revocation cannot keep member logged in. Preserve theme and unrelated preferences. Stale in-flight profile/ticket reads must not repopulate an ended session.

## Tasks / verification
- [x] Root: reproduce failed logout, regression test server rejection/offline/expired token/duplicate action; implement local cleanup and guarded late responses. Menu + logo sizing + red background.
- [x] Auth worker: new login/register presentation, shared reset styles; preserve API payloads/OAuth/OTP/validations; existing auth behavioral tests, Vue build.
- [x] Backend worker: banner model/controller/migration in both Go repos, authenticated routes, upload validation, sqlmock tests for empty/read/write/disabled/invalid URLs and upload preprocessing (no remote upload).
- [x] Root: admin banner editor/preview/upload/save and menu/route, member responsive banner/fallback; tests for unsafe URLs and fallback behavior.
- [x] Root: local fixture API mirrors banner read/write/upload and failed-logout scenario for browser QA; verify admin edit -> member display with fixture only. Test 320/390/desktop, both themes and logout -> login. Both frontend builds and Go tests, diff check; independent review.

## Review focus
Expired/rejected/offline logout must clear session and not redirect back from stale callback. Async responses must not revive state. Disabled or broken banner must not break round selection. Invalid links/malformed upload and oversized images must be rejected. Member read must never expose admin routes. Mobile auth inputs stay 16px and all critical controls fit 320px.


## Completed verification — 2026-10-29
- Member UI: Node 22 `npm test` 100/100 cases pass; Vite build and diff check pass.
- Admin UI: Node 22 `node --test` 13/13 pass; Vite build and diff check pass.
- Both Go APIs: `go test ./... -count=1` and diff checks pass. New controller/sqlmock, authentication boundaries, upload decoding/limits/storage failures tests do not touch production.
- Browser fixture: reproduced old failed-API logout staying on the member page, then verified fixed flow reaches `/login` after confirmation with the same HTTP 409 response. Repeated from team builder after final router fix.
- Browser fixture: admin saves main/mobile URLs and link, reload preserves settings; member displays the configured desktop and mobile sources, clicking reaches `/challenge`. Broken mobile source falls back to the loaded main image. Disabling returns the football hero.
- Tested new login/register at 390px and 320px, readable 16px input text, no horizontal overflow; text menu and 54px member logo verified. Light/Dark shown. Pattern is present on member home and builder, original green pitch/shirts retained.
- Browser file-chooser upload could not run because Chrome extension lacks “Allow access to file URLs”. No extension permission changed. Upload preprocessing/storage boundaries are covered by Go tests and admin file validation tests; real Spaces upload is not exercised.
- Independent review found stale cross-tab token checks could clear a newer session. Actual-guard deferred regression tests failed before fix and pass afterward; guard now validates captured token still matches before admitting/clearing, and rechecks changed sessions. Canonical URL fallback edge also fixed with red/green test. Review follow-up: no remaining findings.
- Supplied migration `premierleague-bo/migrations/20261029_create_member_banners.sql` is NOT applied. Admin reports migration needed until it is run; member falls back safely. No Docker build/deployment/commit/production mutations.
- Local fixture previews: member http://192.168.1.23:5175 and admin http://192.168.1.23:5176/member-banner. Banner fixture restored to disabled with valid sample URLs after QA.
- Evidence in workspace `.superpowers/artifacts`: kickmun-ticket-login-light.png, kickmun-ticket-login-dark.png, kickmun-ticket-register-light.png, kickmun-managed-banner-mobile.png, kickmun-menu-pattern-mobile.png, kickmun-builder-pattern.png, kickmun-banner-admin.png.
