# Changelog — cariva-ds-dev-export

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

### Known issues

- **`font-family/prose` still cannot resolve.** `Google Sans` is not on the
  Adobe kit and is not licensable through Adobe Fonts at all, and the declared
  fallback `IBM Plex Sans Thai Looped` is not imported by `ds/fonts.ts` — so
  prose text lands on generic `serif`. Consuming apps can import
  `@fontsource/ibm-plex-sans-thai-looped` themselves as a stopgap.

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
