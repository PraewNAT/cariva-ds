# Changelog — cariva-ds-dev-export

## 2026-09-18

### Changed

- **`CrvButtonDecorative` aurora is faster, and the label glows.** The two aurora
  layers now loop at 3s / 4.25s (was 6s / 8.5s). The label and icon glow in
  `brand/decorative/gradient/to`, brighter on hover. `animated={false}` and
  `disabled` have no glow, so the static button still matches Figma.

## 2026-09-17

### Added

- **Medical icon library — 89 icons in `ds/icons/`.** Every icon in the Figma
  "Medical" section (Facility & Records, Diagnostics & Monitoring, Medication &
  Pharmacy, Anatomy, Custom, …) now ships as a React icon generated from the
  real Figma vectors. Names are the Figma name in PascalCase, one style each:
  `import { Stethoscope, HeartRateMonitor, MedicalCrossCircle } from '@/ds/icons'`.
  They behave like MUI icons (`fontSize`, `color`, `sx`, inherit `currentColor`).
  A few names match MUI icons (`Man`, `Woman`, `Skateboarding`, …) — alias the
  import if a file uses both. `CustomNurese` keeps the Figma spelling.
- **`CrvChipAction` `thumbnailIcon`.** Pass an icon to show it in the leading
  avatar instead of `thumbnailInitials`, matching the Figma chip whose avatar
  glyph is swapped (e.g. `thumbnailIcon={<MedicalCrossCircle />}`).

### Fixed

- **Button label size follows the button size.** Figma uses label small / medium /
  large (12/16 · 14/20 · 16/24) for small / medium / large buttons. `CrvButton`
  used 16/24 and `CrvButtonDecorative` / `CrvButtonSplit` used 14/20 at every
  size, so content-hugging buttons came out the wrong width. Outlined
  `CrvButton` also takes its 1px border out of the side padding, since Figma's
  stroke doesn't take layout space.
- **`CrvButton` / `CrvButtonDecorative` icon spacing.** MUI's own icon-slot margins
  stacked on top of the button's `gap`, so the icon sat 12 / 16 / 20px from the
  label instead of Figma's 4 / 8 / 12, and small buttons got an 18px icon. The
  slots now have no margin and use the size scale's icon size.
- **`CrvAvatar` icon size (`content="icon"`).** The default icon rendered at
  16px on large/medium avatars, sized from Figma variants that were themselves
  wrong. It now matches Figma's icon slot — 24 / 20 / 16 / 12px for large /
  medium / small / xSmall (padding 8 / 6 / 4 / 3) — with or without `badge`.

## 2026-09-16

### Fixed

- **`font-family/ui` never loaded the web font.** The stack asked for
  `"Aktiv Grotesk Thai"`, but Adobe kit `tfw1cme` declares the family as
  `aktiv-grotesk-thai`, and CSS treats those as two different families. On a
  designer's Mac the name still resolved — to the Creative Cloud *desktop*
  font — so the bug was invisible locally while every deploy and every machine
  without Creative Cloud silently fell back to IBM Plex. `ui` (and the
  deprecated `sans`) now list both spellings. `Malila` needs no alias; family
  matching is case-insensitive, so it already matched the kit's `malila`.

- **`font-family/prose` resolved to generic `serif` everywhere.** Neither font
  in the stack was actually served: `Google Sans` is not on Adobe kit `tfw1cme`,
  and the fallback `IBM Plex Sans Thai Looped` was never imported by
  `ds/fonts.ts`. Every piece of prose text rendered as Times. Both are now
  self-hosted by `ds/fonts.ts` — Google Sans has been released under OFL-1.1 and
  ships as `@fontsource/google-sans` (Latin + Thai subsets), so prose no longer
  depends on an Adobe subscription at all. Add `@fontsource/google-sans` and
  `@fontsource/ibm-plex-sans-thai-looped` to the consuming app's dependencies.

## 2026-09-11

Refreshed from `code/core/` — the previous bundle was a 2026-06-19 snapshot and
had drifted badly from Figma.

### Changed

- **Tokens rebuilt from the current `tokens.json`** — brand primary was still
  `#2563eb`; it is `#1789fa`. `color/content/secondary` `#334155` → `#64748b`,
  `placeholder` `#475569` → `#64748b`, plus tokens that did not exist in the old
  snapshot at all (`selectedStrong`, `sunkenStrong`, `typography/prose/*`)
- **Typography** — `label` line-heights, the `display` scale, and the
  `font-family/sans|serif` → `ui|prose` rename (old keys kept as deprecated)
- **Stepper renamed** — `CrvStepperIcon` → `CrvStepperMarker`,
  `CrvMobileStepper` → `CrvStepperCompact`; both old names still exported as
  deprecated aliases
- **`CrvTabsStandard` gained `size="small"`**
- **44 component folders** — unchanged (the 2026-06-19 entry said 45, but the bundle has always held 44)
- **README font guidance rewritten** — it said the DS uses IBM Plex Sans Thai
  only. `carivaApp` actually renders Aktiv Grotesk Thai and Malila, which come
  from an Adobe Fonts kit that must be linked in `<head>`; without it the app
  silently falls back to IBM Plex
- **CrvToast rewritten** to match the new Figma component: `variant` is now
  `filled|outlined|standard`, severity adds `notification`, plus `title`,
  `description`, `action` and `onClose`. The old `primary`/`secondary` values
  still resolve but are deprecated
- **`colors.neutral.*`** added (surfaces, content, borders)
- **Status border tokens completed** — `colors.status.{error,warning,info,success}.border.default|strong`
  (300 / 500 steps). `success.border.default` and `warning.border.default` changed
  from the dark 700/600 steps to 300
- **New `ds/icons/`** — 9 icons in 5 styles each that the Figma library uses but
  `@mui/icons-material` doesn't ship (`Eco`, `Polymer`, `AmpStories`,
  `ExposureNeg1/2`, `ExposurePlus1/2`, `ExposureZero`, `DockToRight`).
  Import them from `@/ds`; every other icon still comes from
  `@mui/icons-material`
- **Bundle is now built by `npm run export:dev`** in the DS repo, and
  `npm run export:check` fails when it goes stale — don't edit `ds/` by hand


## 2026-06-19

### Included

- **45 Crv* component folders** under `ds/components/`
- **Theme:** `ds/theme.ts` + `ds/theme/components/*` (10 style modules)
- **Tokens:** `ds/tokens.ts` + `ds/tokens.json` (semantic colors from Figma)
- **Types:** `ds/theme/carivaAugmentation.d.ts`
- **Barrel:** `ds/index.ts`

### Excluded (dev-only / DS-internal)

- `*.stories.tsx` — Storybook
- `*.test.tsx` — unit tests
- `*.figma.tsx` — Figma Code Connect
- `*.ai.md` — AI component docs
- `CLAUDE.md` — DS agent rules

### Token mapping (Figma → code)

| Figma semantic | Code location |
|----------------|---------------|
| `color/brand/primary/*` | `colors.brand.primary` → `palette.primary` |
| `color/content/*` | `colors.content` → `palette.text` |
| `color/bg/*` | `colors.bg` → `palette.background` |
| `color/border/*` | `colors.border` + input overrides |
| `color/status/*` | `colors.status` → `palette.error/warning/success/info` |
| `color/overlay/backdrop` | `colors.overlay.backdrop` |
| Spacing / radius | `spacing.*`, `radius.*`, `theme.cariva.*` |
| Typography scale | `typography.*` in tokens + MUI `h1`–`h6`, `body1/2` |

### File count

~199 files in `ds/` (runtime + types only)
