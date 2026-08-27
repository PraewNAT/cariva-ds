# Changelog — cariva-ds-dev-export

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
