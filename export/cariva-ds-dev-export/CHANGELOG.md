# Changelog — cariva-ds-dev-export

## 2026-09-09

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
