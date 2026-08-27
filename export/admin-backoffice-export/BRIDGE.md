# BRIDGE — Figma → Cariva DS → admin-dashboard

**Product:** admin-dashboard (CMS back-office)  
**Profile:** `backOffice`  
**Approach:** Option A — keep product palette schema (`textColor`, `primaryStates`, …)  
**Round 1 brand:** product current (`#0075EA`, Noto Sans Thai) until Design sign-off

---

## Product profile

| Field | Value |
|-------|-------|
| `defaultProductStyle` | **`backOffice`** |
| DS `backOffice.interactive` | 12px |
| Product button radius (today) | **32px pill** — documented delta; do not auto-change without Design |
| DS `backOffice.inputSm` | 8px — matches product input |
| DS `backOffice.containerMd` | 12px — product dialog uses **16px** |

---

## Token mapping table

| Figma / DS semantic | DS `tokens.ts` path | admin-dashboard location |
|---------------------|---------------------|--------------------------|
| `color/brand/primary/on-surface/default` | `colors.brand.primary.onSurface.default` | `palette.primary.main` (+ `primaryStates` alpha base) |
| `color/brand/primary/on-surface/hover` | `.hover` | `palette.primary.dark` |
| `color/brand/primary/on-surface/pressed` | `.pressed` | contained button `:active` (optional) |
| **Product override (round 1)** | `adminProductBrand.primary.*` | `#0075EA` / `#0D549B` / `#1EB1FF` |
| `color/content/primary` | `colors.content.primary` | `textColor.black.primary` |
| `color/content/secondary` | `colors.content.secondary` | `textColor.black.secondary` |
| `color/content/placeholder` | `colors.content.placeholder` | `textColor.black.tertiary` |
| `color/content/disabled` | `colors.content.disabled` | `textColor.black.disabled` |
| `color/content/inverse` | `colors.content.inverse` | `textColor.white.primary` |
| `color/bg/subtle` | `colors.bg.subtle` | `backgroundColor.main` (or product `#F4F6F9`) |
| `color/bg/white` | `colors.bg.white` | `backgroundColor.white` |
| `color/overlay/backdrop` | `colors.overlay.backdrop` | `backgroundColor.overlay`, `MuiDialog` backdrop |
| `color/border/default` | `colors.border.default` | `palette.divider`, `outlinedBorder.color` |
| `color/border/strong` | `colors.border.strong` | `outlinedBorder.hoverColor` |
| `color/border/system` | `colors.border.system` | `MuiOutlinedInput` focus border |
| `color/border/error` | `colors.border.error` | error field border |
| `color/status/warning/*` | `colors.status.warning` | `palette.warning` + `MuiAlert` warning |
| `color/status/error/*` | `colors.status.error` | `palette.error` + `MuiAlert` (product `#D32F2F` today) |
| `color/status/success/*` | `colors.status.success` | `MuiAlert` success (product `#2E7D32` today) |
| `typography/heading/large` | 24/32/600 | nearest: `titleLarge` / `headlineSmall` |
| `typography/heading/medium` | 20/28/600 | `titleMedium` |
| `typography/body/large` | 16/24/400 | `bodyLarge` |
| `typography/body/medium` | 14/22/400 | `bodyMedium` |
| `typography/label/large` | 16/24/500 | `labelLarge` |
| `typography/caption/caption` | 12/16/400 | `caption` |
| **Product MD3 (no DS 1:1)** | — | `headlineMedium` 28/36/400 — keep product value |
| Spacing | `spacing.*` | `theme.spacing(n)` (4px unit) |
| Radius backOffice | `productStyle.backOffice.*` | input 8px; button/dialog see deltas above |

---

## Primary states (alpha on `primary.main`)

| State | Alpha | Product key |
|-------|-------|-------------|
| hover | 0.04 | `primaryStates.hover` |
| selected | 0.08 | `primaryStates.selected` |
| focus | 0.12 | `primaryStates.focus` |
| focusVisible | 0.30 | `primaryStates.focusVisible` |

Base hex: `#0075EA` (round 1) or `#2563eb` (post sign-off Core DS)

---

## Typography bridge (MD3 variants)

admin-dashboard uses **MD3-style keys**, not MUI `h1`–`body2`. Do not rename without app-wide migration.

| Product variant | Round 1 source | Notes |
|-----------------|----------------|-------|
| `headlineMedium` | Product existing | 28/36/400 — no Cariva exact match |
| `headlineSmall` | DS heading.medium or product | |
| `titleLarge` | DS heading.large | |
| `titleMedium` | DS heading.small | |
| `labelLarge` | DS label.large | |
| `bodyLarge` | DS body.large | |
| `bodyMedium` | DS body.medium | |
| `caption` | DS caption | |

Font: **Noto Sans Thai** (product) — DS canonical is IBM Plex Sans Thai (pending sign-off).

---

## Round 2 — component overrides

Merge via `buildAdminThemePatch()` — includes `buildAdminComponentOverrides()`:

- No Crv* React — Mui* styleOverrides only
- `outlinedBorder` **not** in palette patch → `getOutlinedBorderTokens()` top-level const

---

| Area | Action |
|------|--------|
| Buttons, inputs, dialogs, tables, alerts | **Theme-only** via `muiTheme.ts` `Mui*` overrides |
| Crv* components | **Not bundled** this round |
| CrvAlert | **Excluded** — use `MuiAlert` + `ToastSnackbar` |
| Sidebar, DataGrid, Tooltip, Toast | **Skip** — product implementations exist |

---

## Styling contract

| Layer | Rule |
|-------|------|
| Future `src/ds/**` | `sx` allowed (DS-owned) |
| Product `src/components`, `src/screens` | **theme-first + `styled()` only** — no `sx` |

---

## Migration order (when Design approves Core DS brand)

1. Update `adminProductBrand` → remove overrides; use `colors.brand.primary`
2. Patch `palette.primary` + recompute `primaryStates`
3. Font migration IBM Plex Sans Thai (layout + next/font)
4. Visual diff: form, table, modal, sidebar
5. `bun run test:update`

---

## Open questions (Design / PO — phase 2, does not block integrate)

**Confirmed for round 1 integrate:** admin-dashboard keeps `adminProductBrand` deltas (`useProductBrand: true`):

- Primary `#0075EA`, Noto Sans Thai, button 32px pill
- Alert `#2E7D32` / `#D32F2F`, table header `#ECEFF1`, page `#F4F6F9`

**Phase 2 (post visual sign-off):** migrate to Core DS canonical — set `useProductBrand: false` or update `adminProductBrand` after Design memo.

- [ ] Primary: `#2563eb` vs `#0075EA`?
- [ ] Font: IBM Plex Sans Thai vs Noto?
- [ ] Button radius: 12px backOffice vs 32px pill?
- [ ] Alert / table / page backgrounds: DS vs product values?
