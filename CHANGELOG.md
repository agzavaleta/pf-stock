# CHANGELOG.md — PF Stock

## v1.0.1 (current — pending manual version bump)
**Note:** `app.jsx` in this release reflects all changes below. `version.js` (`APP_VERSION`) and `service-worker.js` (`BUILD_VERSION`) were **not** part of this session's uploads, so they could not be edited directly — see PROJECT_RULES.md's "Manual steps before deploy" for the exact bumps required before shipping this release.

### Claude Artifact Preview (new)
- Introduced `app-preview.jsx`: a Claude-preview-only derivative of `app.jsx`, converted to ESM (`import ... from "react"` / `export default AppRoot`) so it renders directly in the Claude Artifact panel
- Standing workflow established: every code change is now delivered as both the production `app.jsx` (browser-build format, for GitHub/Vercel) and a synced `app-preview.jsx` (for in-chat preview), kept byte-identical except for the two bootstrap lines
- `app-preview.jsx` remains non-deployed and is never treated as a second source of truth, per existing project rules

### Bug Fixes
- **Audit timestamp**: `handleSaveAudit` no longer stamps new audits with a hardcoded `T12:00:00`. It now combines the selected audit day with the device's actual local time-of-day (`new Date()`), so the saved timestamp reflects the real moment of save. The "Fecha de auditoría" date picker (business feature, editable at save time) is unaffected; `handleUpdateAuditDate` (post-save Borrador date edits) is untouched.
- **Mobile "Verificado" checkbox not responding**: root-caused to the new pull-to-refresh touch handler (see below) arming on every `touchstart` inside `<main>`, including taps on checkboxes/inputs. Fixed by excluding interactive controls (`input, button, select, textarea, a, label`) from arming the gesture. Desktop was never affected (touch-only code path).
- **Stale persisted subfamilies (e.g. new codes like `R710` never appearing)**: root-caused to `pfMigrate()`'s `subfamilies: data.subfamilies || SUBFAMILIES_DATA` always preferring a previously-persisted IndexedDB snapshot over the current code constant, permanently shadowing any subfamily added to `SUBFAMILIES_DATA` after a device's first save. Fixed with a new `pfReconcileSubfamilies()` helper: persisted entries are merged with `SUBFAMILIES_DATA` by normalized (`trim().toUpperCase()`) code — persisted edits win on conflict (nothing user-entered is ever lost), and any code present only in `SUBFAMILIES_DATA` is added. Imports (`handleUpload`/`handleGlobalUpload`) automatically benefit since they read from the same reconciled `subfamilies` state.

### Features
- **Pull-to-refresh** (mobile/touch only): pulling down from the top of the scrollable `<main>` area (`scrollTop <= 0`, drag >70px) triggers `window.location.reload()`. Implemented as native passive touch listeners (`touchstart`/`touchmove`/`touchend`) attached via a new `mainScrollRef`; never calls `preventDefault`, so normal scrolling and interactive-control taps are unaffected (see bug fix above for the interactive-element exclusion).
- **Create Audit — required user selection**: the free-text "Ingresa tu nombre…" fallback (shown when no `users` existed) has been removed from the "Finalizar auditoría" dialog. A single `<select>` dropdown is now always rendered, populated only from existing `users`. When `users` is empty, the dropdown is `disabled` and the helper text reads "No existen usuarios creados" instead of "Requerido". Audit creation remains blocked until a valid user is selected (existing `disabled={!auditUser.trim() || isSaving}` button guard, unchanged).

### Accessibility (WCAG 2.2 AA)
Full contrast audit of Dashboard and the Plant module (`PlantsPage`, `SubfamilyDashboard`, `SfAuditHistory`, `PlantAuditPanel`, `StatusCounters`, `PartsTable`, `PartCard`, `GlobalUploadPanel`/`PlantUploadPanel` code previews). All failures were verified by computing actual WCAG relative-luminance contrast ratios; every fix reuses an existing design-system color token — no new colors were introduced.
- `#16a34a` (green), used as **text**, fails against every background it appears on in this app (~3.0–3.3:1, needs 4.5:1). Replaced with the documented "Green success" token `#166534` everywhere it was used as text color (badges, KPI values, donut labels, diff amounts). Its use as a **background/border/progress-bar fill** was left untouched (non-text, exempt).
- `#dc2626` (red), used as text, passes on most backgrounds but fails specifically on `#fef2f2` (4.41:1). Replaced with the documented "Red danger" token `#b91c1c` only where the background was `#fef2f2`; left alone everywhere it already passed (white, `#f9fafb`, `#fef9f9`, `#fffbeb`, `#fff5f5`).
- `#9ca3af` (gray), used as text, fails badly (2.3–2.5:1). Replaced with `#6b7280` (verified/pendiente labels, Pareto chart axis labels) or `#374151` (disabled auditor-select placeholder text, where `#6b7280` alone still fell short on `#f3f4f6`).
- Removed `opacity: 0.75`/`opacity: 0.8` dilution on several tile "sub"/label texts (`StatusCounters`, `SubfamilyDashboard` KPI grid, `PlantAuditPanel` filter tiles, Dashboard KPI grid) — the underlying colors were already compliant at full opacity; the opacity alone was dragging them below 4.5:1.
- Dashboard-specific: KPI "Auditadas" sub-text and the donut "100% audited" label were the two failures found and fixed there in an earlier pass this session.

### UI
- "Ítems más afectados" card title renamed to "Ítems afectados" (`SubfamilyDashboard`).
- **R-code typography**: removed the hardcoded `fontFamily: "monospace"` from all 8 subfamily/part code labels in the Plant module (`PlantsPage`, `SubfamilyDashboard` header, `SfAuditHistory`, `PlantAuditPanel`, `PartsTable`, `PartCard`), so `R` codes now inherit the same font as subfamily names (the app's default `'Inter', system-ui, sans-serif` stack) instead of monospace. Font-size, color, weight, and spacing on each label were left exactly as they were. CSV-preview code blocks (`GlobalUploadPanel`/`PlantUploadPanel`) and Settings-page (`PlantsCrudPage`/`SubfamiliesCrudPage`) code displays were intentionally left on monospace — out of scope (not part of the Plant module, and useful for raw-data alignment in the former case).

---

## v1.0.0 (prior)

### Versioning
- Introduced `version.js`: shared `APP_VERSION = "1.0.0"` constant, readable from both the page (`window.APP_VERSION`) and `service-worker.js` (`importScripts`)
- Decoupled `APP_VERSION` (public release label, shown in Settings → Acerca de) from `BUILD_VERSION` (internal deploy counter that drives update detection) — the two must never be conflated
- `manifest.json` version bumped to `1.0.0`; stale `v0.9.0-beta` text in `index.html`'s meta description updated to match
- `BUILD_VERSION` progression this cycle: `3 → 4` (update-flow reliability fix) → `5` (UI/color/placeholder re-application) → `6` (versioning rollout) → `7` (box-sizing hotfix)
- `vercel.json`: added `/version.js` to the SPA-rewrite exclusion list (it would otherwise have been silently served as `index.html`) and gave it a `no-cache, must-revalidate` header

### Persistence (new)
- Full IndexedDB persistence: database `pf-stock-db`, store `app-state`, key `main`
- Public API: `loadState()`, `saveState(state)`, `clearState()`
- `pfMigrate()` schema-versioned normalization; `PF_DB_VERSION` bumped 1→2 with an automatic migration path that copies any pre-existing record from the old store/key names (`state`/`app-state`) into the new ones before deleting the old store — no data loss for upgrading installs
- Debounced (400ms) autosave on `inv, history, audits, subfamilies, plantsMeta, users`; hydration gate prevents rendering before the persisted state loads
- Fixes the previously-documented "No Persistence" critical known issue

### Backup & Restore (new)
- New "Respaldo y datos" section in Settings
- **Export**: downloads `PFStock_Backup_YYYY-MM-DD_HH-mm.json` with all six persisted slices
- **Import**: validates structure via `pfValidateBackup()`, requires confirmation before replacing any data
- **Clear Local Data**: wipes IndexedDB + resets all six slices to factory defaults, with confirmation — distinct from the pre-existing "Reiniciar inventario" (inv/history/audits only)
- Informational message about local-only storage risk added to the same section

### PWA Update Flow
- Safari iOS "Response served by service worker has redirections" fixed: navigation fallback changed from `./index.html` to `./`, redirected responses are never cached or returned for navigation requests, install-time asset caching now checks `response.redirected === false` per asset instead of an unguarded `cache.addAll`
- Service-worker registration path/scope changed from relative (`./service-worker.js`, `./`) to root-absolute (`/service-worker.js`, `/`) to match actual Vercel deployment resolution
- In-app update banner: "Hay una nueva versión de PF Stock disponible." + "Actualizar ahora" button, wired to `SKIP_WAITING` messaging and a once-only guarded reload on `controllerchange` (never automatic, never looping)
- `BUILD_VERSION` established as the single source of truth for update-detection, replacing two separately-hardcoded cache-name strings

### React Bootstrap Hardening
- Replaced the unconditional `var {...} = window.React` with a guarded lookup: prefers `window.React`, falls back to a bare `React` global, throws one clear labeled error instead of a cryptic destructure crash if neither exists
- `index.html`: `app.jsx` is now fetched as text, transpiled via `Babel.transform()`, and executed via `new Function()` — only after a polling readiness guard confirms `window.React && window.ReactDOM && window.Babel` all exist. Any CDN load failure now shows a clear Spanish error instead of crashing

### UI
- Sidebar/mobile-header logo replaced with the official PF Stock artwork (embedded as base64 PNG)
- `PLANT_COLORS` expanded from 10 → 40 distinct colors (two rounds of +20, +10), spanning blue/green/teal/purple/red/orange/yellow/brown/gray
- Usuario form placeholders (Nombre, Apellido) changed to "Escriba"
- Form-card width for Plantas/Subfamilias/Usuarios made responsive: fills available content width up to a 1040px readability cap, replacing a fixed 560px cap that left excessive empty space on desktop/tablet-landscape

### Regression Fixed This Cycle
- **Root cause**: `<main>`'s explicit `width` (added to fix tablet-landscape dead space) combined with its existing `padding` under the default `content-box` model — padding was added *outside* the stated width, overflowing the visible viewport by the padding amount and getting clipped by `overflowX:hidden`, cutting off the right edge of every page (Dashboard, Plants, Subfamilies, Users, Settings/About) on both desktop and mobile
- **Fix**: added `boxSizing: "border-box"` to `<main>` — no width values changed, one property added

---

## v0.9.0-beta (prior)

### Deployment Package
- Created complete Vercel/GitHub static deployment package
- `index.html`: Babel Standalone mount, PWA meta, service worker registration
- `service-worker.js`: shell cache + CDN cache-first + SPA navigation fallback
- `manifest.json`: PWA install metadata, full icon set
- `vercel.json`: SPA rewrites, cache headers, security headers
- Official PF Stock icons integrated (20 files)
- Brand colors updated to `#cc0000` (from official logo)

### QA Baseline Fixes
- `doReset` now clears `page`, `plantSel`, `sfSel` and returns to dashboard
- Removed dead `sideOpen` state and its setter in `navigate()`
- Removed duplicate `mid` from `pageProps` (still passed explicitly at `PageContent`)
- `exportAuditXLSX(audit, users)` now uses `resolveUser()` instead of stale `audit.user`
- Removed dead constants: `PART_NAMES`, `UNITS`, `rnd()`, `USERS_DEFAULT`
- `ConfirmDialog`/Alert modal: ARIA roles, ESC key close, `autoFocus` on cancel
- Plant-level upload now filters `newParts` post-parse to target plant only

### Import Logic Fixes
- Preview validator column-length bug fixed (`length < 6` → `length < 5`)
- `handleGlobalUpload` null-check guard for `sf.code`
- Unknown subfamilias no longer cancel import; skipped with summary
- `skippedBodega`/`skippedOtherPlant` counters added to import summary
- Format finalized at 6 columns (bodega optional, col 5); R-999 bodega routing (302→LU, 330→FU); LU/FU prefix routing for shared subfamilias

### UX Fixes
- Scroll reset to top on every view/navigation change
- Checkbox repositioned left in mobile `PartCard`
- `Cantidad física` input clears on first focus if `physicalQty === null`
- Fixed mobile date-input gray background/overflow/visibility
- Viewport resize no longer resets "Nueva Auditoría" (single `PageContent` instance)

### Architecture
- App render refactored to a single `PageContent` instance (chrome only conditional) — fixed resize-kills-audit bug
- Upload replaces (not accumulates) inventory for affected plants
- `exportAuditXLSX(audit, users)` async, lazy-loads SheetJS, `Completado` only

### Data
- 252 subfamilies, 8 plants (P3–P6, SDM, CDT, LU, FU), empty inv/users on load
