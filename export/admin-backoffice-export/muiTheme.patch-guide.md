# Patch guide — `src/muiTheme/muiTheme.ts` (round 2)

Round 2: merge **palette + MUI overrides** from bridge — no manual CSS copy.

---

## Recommended merge (one call)

```ts
import { createTheme } from "@mui/material/styles";
import {
  buildAdminThemePatch,
  getOutlinedBorderTokens,
} from "@/ds-bridge/theme-bridge";

// Top-level const — NOT in palette patch (TypeScript augmentation)
const outlinedBorder = getOutlinedBorderTokens();

const theme = createTheme(
  {
    // ... existing palette, typography, components from muiTheme.ts
    palette: { /* existing */ },
    typography: { /* existing MD3 variants */ },
  },
  buildAdminThemePatch({
    useProductBrand: true,
    includeComponents: true,
  }),
);

export default theme;
export { outlinedBorder };
```

`buildAdminThemePatch` merges:

- `palette.primary`, `primaryStates`, `textColor`, `backgroundColor`, `icon`, semantic colors
- `components` — all Mui* overrides from `theme/components/*`

---

## If merging incrementally

### 1) Palette only

```ts
import { buildAdminPalettePatch } from "@/ds-bridge/theme-bridge";

createTheme(existing, buildAdminPalettePatch({ useProductBrand: true }));
```

### 2) Components only (after palette is set)

```ts
import { buildAdminComponentOverrides } from "@/ds-bridge/theme";

createTheme(existing, {
  components: buildAdminComponentOverrides({ useProductBrand: true }),
});
```

### 3) outlinedBorder (always separate)

```ts
import { getOutlinedBorderTokens } from "@/ds-bridge/theme-bridge";

const outlinedBorder = getOutlinedBorderTokens();
// use in existing MuiOutlinedInput if not using buildAdminComponentOverrides
```

---

## Module map (`theme/components/`)

| File | Mui* targets |
|------|----------------|
| `button.ts` | Button, IconButton |
| `input.ts` | TextField, OutlinedInput, InputBase, Select, FormControl, FormHelperText |
| `dialog.ts` | Dialog, DialogTitle, DialogContent, DialogActions, Backdrop |
| `table.ts` | TableCell, TableSortLabel, TablePagination |
| `alert.ts` | Alert, Snackbar |
| `tabs.ts` | Tab, Tabs, Breadcrumbs |
| `form.ts` | MenuItem, Checkbox, Divider |

All modules read admin schema via `getAdminThemeTokens(theme)`:

- `theme.palette.textColor.*`
- `theme.palette.primaryStates.*`
- `theme.palette.backgroundColor.*`
- `theme.palette.icon`
- `getOutlinedBorderTokens()` for borders

---

## Product deltas (useProductBrand: true)

| Token | Value |
|-------|-------|
| Button radius | 32px pill |
| Input radius | 8px |
| Dialog radius | 16px |
| Alert success/error | `#2E7D32` / `#D32F2F` |
| Table header | `#ECEFF1` |

Set `useProductBrand: false` to preview Core DS canonical values.

---

## Files not to change

- `src/types/mui.d.ts` — no new palette keys in round 2
- `src/models/types.d.ts` — `outlinedBorder` stays top-level const, not Palette
- Font in `layout.tsx` — Noto Sans Thai until sign-off

---

## Verify

```bash
bun run lint && bun run build && bun run test && bun run test:update
```
