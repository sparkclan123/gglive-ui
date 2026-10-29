# Member Mobile Polish Implementation Plan

> **For agentic workers:** Use superpowers:executing-plans to implement task-by-task.

**Goal:** Refine the approved red member UI into a compact, comfortable mobile experience without changing fantasy rules.
**Architecture:** Keep existing Vue pages and API contracts. Centralize modal scroll/focus behavior and visual viewport measurements; use focused responsive CSS for compact layouts and readable form controls.
**Tech Stack:** Vue 3, CSS, node:test, existing Vite dev preview.
**Spec:** Existing approved `../specs/2026-10-28-member-multi-gameweek-design.md` plus the user's 2026-10-29 mobile refinement request.

## Constraints
- No deployment, Docker build, production mutations or commits.
- Keep original player shirts, captain/formation/normal/VIP rules and all current routes.
- Prevent incidental tap/focus zoom; retain intentional accessibility pinch zoom.
- Physical iOS keyboard behavior cannot be certified from desktop Chrome alone.

## Reproduced findings
- At 360×800, first entry CTA begins at y=743, behind navigation beginning at y=723.
- Builder inputs compute to 14px despite a 16px responsive rule: shared selector specificity wins.
- Menu leaves body scrollable; legacy editors independently overwrite body overflow.
- Builder add control is only 28×30px. Builder page has nested horizontal padding.

## Tasks
- [x] Add tested shared dialog lifecycle: nested scroll locks, focus containment/restoration, teardown, mobile breakpoint.
- [x] Adapt sheet bounds to visual viewport; hide bottom navigation when editing with the keyboard open.
- [x] Compact hero, cards, builder, support/detail pages; enforce mobile 16px fields, reachable controls, safe areas and touch feedback.
- [x] Verify 320/360/390/430/tablet/desktop layouts, all enabled menus, builder and both editors with read-only local fixtures.
- [x] Run frontend tests/build and diff checks, review changes, save screenshots and record limits.

## Review Focus
- Closing a nested or replaced dialog must not unlock a remaining dialog or jump the page.
- Short viewport/keyboard must leave close controls and scrolling reachable.
- Text and tables must remain readable without horizontal page overflow.
- Focus/field styles must survive scoped lazy-loaded CSS.
- Player interactions and gameweek scope must remain unchanged.


## Verification record — 2026-10-29

- `npm test`: 9 test files passed, including six mobile interaction cases (nested locks, Safari-style offset mutation, focus, responsive teardown, viewport and listener cleanup).
- `npm run build`: passed. Existing non-blocking warnings remain for Browserslist, an inactive BigMatch image placeholder, and the optional HEIC chunk.
- `git diff --check`: passed.
- Chrome responsive checks at DOM widths 320, 360, 390, 430, 767 and 1280px: no horizontal page overflow in checked screens.
- Checked discovery, player scores and table, results, normal/VIP ranking, my teams, both team editors, menu, settings, payments, history and rules using the local fixture-backed app.
- 360×800 discovery CTA improved from y=743–791 (navigation begins at 723) to y=617–661 (navigation begins at 732). The 320px view also keeps the first CTA above the navigation at the checked 710px viewport height.
- Builder and both editor picker fields compute to 16px; settings, payment, ranking and score filters also compute to 16px. Main picker add/close/pagination targets are 44px.
- Builder selection, captain, copy and reset exercised locally. Original shirts loaded without broken images. Normal ranking renders numeric positions.
- At a 400px-high viewport, editor sheet fits within the viewport with its close button outside the scrolling filters/list.
- Nested player-info alert preserved the page offset at -385.625px; closing the last sheet restored scrollY=385.625 with body unlocked.
- Fresh page console had no errors or warnings. Independent code review found and verified fixes for lazy stylesheet priority and nested SweetAlert Safari offset handling; no remaining important findings in that scope.
- Screenshots: `.superpowers/artifacts/member-mobile-polish-{home,builder,ranking}.png` in the workspace root.

### Limits

Browser checks use desktop Chrome responsive view and local read-only football fixtures. They do not certify physical iPhone/Android keyboard behavior, Safari touch scrolling, or device safe-area rendering. Keyboard viewport calculations and lifecycle are covered by unit tests. No production writes, Docker builds, deployment or commits were performed.

### Reference behavior

- [MDN touch-action](https://developer.mozilla.org/en-US/docs/Web/CSS/Reference/Properties/touch-action): manipulation allows scrolling and intentional pinch zoom while suppressing double-tap zoom.
- [MDN VisualViewport](https://developer.mozilla.org/en-US/docs/Web/API/VisualViewport): visible viewport can shrink or pan independently of the layout viewport.
- [WebKit safe areas](https://webkit.org/blog/7929/designing-websites-for-iphone-x/): viewport-fit and safe-area insets are handled together.
