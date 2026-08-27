# Cariva Design System — Developer Integration

## Quick setup

```tsx
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { carivaTheme } from './theme';
import './fonts'; // IBM Plex Sans Thai

<ThemeProvider theme={carivaTheme}>
  <CssBaseline />
  <App />
</ThemeProvider>
```

Import components from the package barrel:

```tsx
import { CrvButton, CrvSidebar, CrvInput } from './index';
```

## What to ship to consuming apps

| Path | Purpose |
|------|---------|
| `theme/` | `carivaTheme`, palette helpers, component style tokens |
| `theme/carivaAugmentation.d.ts` | TypeScript autocomplete for `palette.cariva` and `theme.cariva.*` |
| `tokens.ts` + `tokens.json` | Semantic tokens (colors auto-generated from JSON) |
| `components/` | Crv* behavior components (sidebar state, forms, upload, etc.) |
| `fonts/` | IBM Plex Sans Thai font loading |
| `crvOverlayStyles.ts` | Modal/drawer backdrop overlay |
| `index.ts` | Barrel export |

**Do not ship:** Storybook stories, tests, Figma Code Connect, internal templates (`CrvOrganizationOverview.stories`).

## Peer dependencies

```json
{
  "react": "^18.3.1",
  "@mui/material": "^6.1.6",
  "@emotion/react": "^11.13.3",
  "@emotion/styled": "^11.13.0",
  "@mui/icons-material": "^6.1.6"
}
```

## Customizing the theme

Merge overrides into `createTheme`:

```tsx
import { createTheme } from '@mui/material/styles';
import { carivaTheme } from './theme';

const appTheme = createTheme(carivaTheme, {
  palette: {
    cariva: {
      ...carivaTheme.palette.cariva,
      brand: {
        ...carivaTheme.palette.cariva.brand,
        // override nested tokens
      },
    },
  },
});
```

Component styles read from `theme.palette.cariva` via `getCarivaColors(theme)` — overrides propagate automatically when using `ThemeProvider`.

## Regenerating tokens from Figma

```bash
npm run tokens:generate
```

Updates `code/tokens.ts` and `code/theme/generatedPalette.ts` from `tokens.json`.
