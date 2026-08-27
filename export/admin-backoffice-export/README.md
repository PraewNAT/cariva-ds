# admin-backoffice-export — Integration (admin-dashboard)

**For:** `cloud_arv/health-tech/translator/admin-dashboard`  
**Stack:** Next 16 · React 19 · MUI 9.1 · Bun  
**Profile:** `backOffice` · **Option A bridge**  
**Round 2:** tokens + palette bridge + **MUI styleOverrides** — **no Crv* React bundle**

---

## What this zip contains

| File | Purpose |
|------|---------|
| `tokens.json` | Cariva Core DS semantic source (Figma) |
| `tokens.ts` | Generated semantic tokens + `adminProductBrand` overrides |
| `BRIDGE.md` | Figma → DS → product key mapping |
| `theme-bridge.ts` | `buildAdminPalettePatch()` + `buildAdminThemePatch()` |
| `theme/` | `buildAdminComponentOverrides()` + style modules |
| `theme/outlinedBorder.ts` | `getOutlinedBorderTokens()` — **not** in palette patch |
| `muiTheme.patch-guide.md` | Merge guide for `src/muiTheme/muiTheme.ts` |
| `apply.sh` | Copy tokens + docs into repo |

**Not included:** 45 Crv* components, Storybook, tests

---

## Peer dependencies (target product stack)

```json
{
  "react": "^19.2.7",
  "react-dom": "^19.2.7",
  "@mui/material": "^9.1.1",
  "@mui/material-nextjs": "^9.1.1",
  "@emotion/react": "^11.13.3",
  "@emotion/styled": "^11.13.0",
  "@mui/icons-material": "^9.1.1",
  "@mui/x-data-grid": "^9.5.0",
  "@mui/x-date-pickers": "^9.5.0"
}
```

Do **not** downgrade to MUI 6 / React 18 from DS Storybook stack.

---

## Apply steps

```bash
unzip admin-backoffice-export.zip
cd admin-backoffice-export
./apply.sh /Users/Gong/Workspace/Translator/admin-dashboard
```

Default copy target: `src/ds-bridge/` (tokens + bridge only — does not overwrite `muiTheme.ts`)

Re-apply is safe: `apply.sh` uses `rsync --delete` (no nested `theme/theme/`).

### Manual integration

```ts
import { createTheme } from '@mui/material/styles';
import { buildAdminThemePatch, getOutlinedBorderTokens } from '@/ds-bridge/theme-bridge';
import baseTheme from '@/muiTheme/muiTheme';

// outlinedBorder stays a top-level const — NOT in palette patch (fixes TS augment)
export const outlinedBorder = getOutlinedBorderTokens();

export const theme = createTheme(baseTheme, buildAdminThemePatch({
  useProductBrand: true,
  includeComponents: true,
}));
```

1. Read `BRIDGE.md` + `muiTheme.patch-guide.md`
2. Merge via `buildAdminThemePatch()` — or copy individual `theme/components/*` overrides
3. Keep `src/types/mui.d.ts` and `src/models/types.d.ts` unchanged unless adding keys

---

## Verify

```bash
bun run lint
bun run build
bun run test
bun run test:update   # after theme override changes
```

---

## Styling contract

| Layer | Rule |
|-------|------|
| `src/ds/**` (future DS package) | `sx` OK |
| Product code | **theme-first + `styled()` only** — no `sx` |

See `.cursor/rules/mui-styled-and-structure.mdc` in admin-dashboard.

---

## Brand (round 1)

Uses **product current** until Design sign-off:

- Primary: `#0075EA` (not Core DS `#2563eb`)
- Font: **Noto Sans Thai** (not IBM Plex Sans Thai)

Breaking migration to Core DS canonical requires Design memo + visual diff checklist.

---

## Product profile

```ts
defaultProductStyle: 'backOffice'  // in tokens.ts
```

Known radius delta: product button **32px pill** vs DS backOffice interactive **12px** — see `BRIDGE.md`.

---

## Support

Core DS owner — token updates via `tokens.json` in Cariva DS repo, then re-export this zip.
