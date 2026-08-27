/**
 * Cariva Design System — MUI Theme (single-file entry)
 *
 * Usage:
 *   import { carivaTheme } from './theme';
 *   <ThemeProvider theme={carivaTheme}><App /></ThemeProvider>
 *
 * Semantic colors: palette.cariva (from tokens.ts)
 * Crv component style helpers: ./theme/components/
 */

import { createTheme } from '@mui/material/styles';
import type { Components, Theme } from '@mui/material/styles';
import {
  colors,
  spacing,
  radius,
  typography,
} from './tokens';
import type { CarivaColors } from './tokens';

// ─── Token helpers ───────────────────────────────────────────────────────────

/** Semantic colors — prefers `theme.palette.cariva`, falls back to static tokens. */
export function getCarivaColors(theme?: Theme): CarivaColors {
  return theme?.palette?.cariva ?? colors;
}

export function getCarivaSpacing(theme?: Theme) {
  return theme?.cariva?.spacing ?? spacing;
}

export function getCarivaRadius(theme?: Theme) {
  return theme?.cariva?.radius ?? radius;
}

export function getCarivaTypography(theme?: Theme) {
  return theme?.cariva?.typography ?? typography;
}

export function getCarivaTokens(theme?: Theme) {
  return {
    colors: getCarivaColors(theme),
    spacing: getCarivaSpacing(theme),
    radius: getCarivaRadius(theme),
    typography: getCarivaTypography(theme),
  };
}

// ─── Palette ─────────────────────────────────────────────────────────────────

/** @see tokens.json — run: npm run tokens:generate */
export { colors as carivaPalette };

export function buildMuiPalette() {
  return {
    cariva: colors,
    primary: {
      main: colors.brand.primary.onSurface.default,
      dark: colors.brand.primary.onSurface.hover,
      light: colors.brand.primary.onSurface.subtle,
      contrastText: colors.content.onBrand,
    },
    secondary: {
      main: colors.brand.secondary.onSurface.default,
      dark: colors.brand.secondary.onSurface.hover,
      light: colors.brand.secondary.onSurface.subtle,
      contrastText: colors.content.onBrand,
    },
    error: {
      main: colors.status.error.onSurface.default,
      dark: colors.status.error.onSurface.hover,
      light: colors.status.error.onSurface.subtle,
      contrastText: colors.content.inverse,
    },
    warning: {
      main: colors.status.warning.onSurface.default,
      dark: colors.status.warning.onSurface.hover,
      light: colors.status.warning.onSurface.subtle,
      contrastText: colors.content.primary,
    },
    success: {
      main: colors.status.success.onSurface.default,
      dark: colors.status.success.onSurface.hover,
      light: colors.status.success.onSurface.subtle,
      contrastText: colors.content.inverse,
    },
    info: {
      main: colors.status.info.onSurface.default,
      dark: colors.status.info.onSurface.hover,
      light: colors.status.info.onSurface.subtle,
      contrastText: colors.content.inverse,
    },
    text: {
      primary: colors.content.primary,
      secondary: colors.content.secondary,
      disabled: colors.content.disabled,
    },
    background: {
      default: colors.bg.subtle,
      paper: colors.onSurface.default,
    },
    divider: colors.border.default,
    action: {
      hover: colors.onSurface.action.hover,
      selected: colors.onSurface.action.selected,
      disabled: colors.content.disabled,
      disabledBackground: colors.onSurface.action.disabled,
    },
  };
}

// ─── Typography & shape ──────────────────────────────────────────────────────

export function buildCarivaThemeExtensions() {
  return { spacing, radius, typography };
}

export function buildMuiTypography() {
  return {
    fontFamily: typography.fontFamily.sans,
    h1: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.display.large,
      lineHeight: `${typography.lineHeight.display.large}px`,
      fontWeight: typography.fontWeight.bold,
    },
    h2: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.display.medium,
      lineHeight: `${typography.lineHeight.display.medium}px`,
      fontWeight: typography.fontWeight.bold,
    },
    h3: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.display.small,
      lineHeight: `${typography.lineHeight.display.small}px`,
      fontWeight: typography.fontWeight.semibold,
    },
    h4: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.heading.large,
      lineHeight: `${typography.lineHeight.heading.large}px`,
      fontWeight: typography.fontWeight.semibold,
    },
    h5: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.heading.medium,
      lineHeight: `${typography.lineHeight.heading.medium}px`,
      fontWeight: typography.fontWeight.semibold,
    },
    h6: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.heading.small,
      lineHeight: `${typography.lineHeight.heading.small}px`,
      fontWeight: typography.fontWeight.semibold,
    },
    body1: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.body.large,
      lineHeight: `${typography.lineHeight.body.large}px`,
      fontWeight: typography.fontWeight.regular,
    },
    body2: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.body.medium,
      lineHeight: `${typography.lineHeight.body.medium}px`,
      fontWeight: typography.fontWeight.regular,
    },
    button: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.label.large,
      lineHeight: `${typography.lineHeight.label.large}px`,
      fontWeight: typography.fontWeight.medium,
      textTransform: 'none' as const,
    },
    caption: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.caption.caption,
      lineHeight: `${typography.lineHeight.caption.caption}px`,
      fontWeight: typography.fontWeight.regular,
    },
    overline: {
      fontFamily: typography.fontFamily.sans,
      fontSize: typography.fontSize.label.small,
      lineHeight: `${typography.lineHeight.label.small}px`,
      fontWeight: typography.fontWeight.medium,
      textTransform: 'none' as const,
    },
  };
}

export function buildMuiShape() {
  return { borderRadius: radius['8'] };
}

export function buildMuiSpacingUnit() {
  return 4;
}

// ─── MUI component overrides ─────────────────────────────────────────────────

function overlayBackdropStyles(theme: Theme) {
  const c = getCarivaColors(theme);
  return {
    backgroundColor: c.overlay.backdrop,
    opacity: 1,
  };
}

function themeTokens(theme: Theme) {
  return {
    c: getCarivaColors(theme),
    s: getCarivaSpacing(theme),
    r: getCarivaRadius(theme),
    ty: getCarivaTypography(theme),
  };
}

export function buildMuiComponentOverrides(): Components<Omit<Theme, 'components'>> {
  return {
    MuiButton: {
      styleOverrides: {
        root: ({ theme }) => {
          const { s, r, ty } = themeTokens(theme);
          return {
            borderRadius: r['12'],
            padding: `${s.sm}px ${s.lg}px`,
            boxShadow: 'none',
            fontFamily: ty.fontFamily.sans,
            fontSize: ty.fontSize.label.large,
            lineHeight: `${ty.lineHeight.label.large}px`,
            fontWeight: ty.fontWeight.medium,
            textTransform: 'none',
            '&:hover': { boxShadow: 'none' },
          };
        },
        sizeSmall: ({ theme }) => {
          const { s, ty } = themeTokens(theme);
          return {
            padding: `${s.xs}px ${s.lg}px`,
            fontSize: ty.fontSize.label.large,
            lineHeight: `${ty.lineHeight.label.large}px`,
          };
        },
        sizeMedium: ({ theme }) => {
          const { s, ty } = themeTokens(theme);
          return {
            padding: `${s.sm}px ${s.lg}px`,
            fontSize: ty.fontSize.label.large,
            lineHeight: `${ty.lineHeight.label.large}px`,
          };
        },
        sizeLarge: ({ theme }) => {
          const { s, ty } = themeTokens(theme);
          return {
            padding: `${s.sm}px ${s.xl}px`,
            fontSize: ty.fontSize.label.large,
            lineHeight: `${ty.lineHeight.label.large}px`,
          };
        },
      },
    },
    MuiIconButton: {
      styleOverrides: {
        root: ({ theme }) => ({ borderRadius: themeTokens(theme).r['12'] }),
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        root: ({ theme }) => {
          const { c, s, r, ty } = themeTokens(theme);
          return {
            borderRadius: r['8'],
            fontFamily: ty.fontFamily.sans,
            fontSize: ty.fontSize.body.large,
            lineHeight: `${ty.lineHeight.body.large}px`,
            fontWeight: ty.fontWeight.regular,
            '& .MuiOutlinedInput-notchedOutline': { borderColor: c.border.default },
            '&:hover .MuiOutlinedInput-notchedOutline': { borderColor: c.border.strong },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: c.border.system,
              borderWidth: 1,
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': { borderColor: c.border.error },
            '&.Mui-disabled .MuiOutlinedInput-notchedOutline': { borderColor: c.border.disabled },
            '& input': {
              padding: `${s.sm}px ${s.lg}px`,
              fontFamily: ty.fontFamily.sans,
              fontSize: ty.fontSize.body.large,
              lineHeight: `${ty.lineHeight.body.large}px`,
              fontWeight: ty.fontWeight.regular,
              color: c.content.primary,
              '&::placeholder': { color: c.content.placeholder, opacity: 1 },
            },
          };
        },
      },
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: ({ theme }) => {
          const { c, ty } = themeTokens(theme);
          return {
            fontFamily: ty.fontFamily.sans,
            fontSize: ty.fontSize.body.small,
            lineHeight: `${ty.lineHeight.body.small}px`,
            fontWeight: ty.fontWeight.regular,
            color: c.content.secondary,
            '&.Mui-error': { color: c.status.error.content.default },
          };
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: ({ theme }) => {
          const { r, ty } = themeTokens(theme);
          return {
            borderRadius: r['12'],
            fontFamily: ty.fontFamily.sans,
            fontSize: ty.fontSize.label.medium,
            lineHeight: `${ty.lineHeight.label.medium}px`,
            fontWeight: ty.fontWeight.medium,
          };
        },
        label: ({ theme }) => {
          const { ty } = themeTokens(theme);
          return {
            fontFamily: ty.fontFamily.sans,
            fontSize: ty.fontSize.label.medium,
            lineHeight: `${ty.lineHeight.label.medium}px`,
            fontWeight: ty.fontWeight.medium,
          };
        },
        sizeSmall: ({ theme }) => {
          const { ty } = themeTokens(theme);
          return {
            fontSize: ty.fontSize.label.small,
            lineHeight: `${ty.lineHeight.label.small}px`,
            '& .MuiChip-label': {
              fontSize: ty.fontSize.label.small,
              lineHeight: `${ty.lineHeight.label.small}px`,
            },
          };
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: { backgroundImage: 'none' },
        elevation1: {
          boxShadow: '0 1px 3px 0 rgba(0,0,0,0.10), 0 1px 2px -1px rgba(0,0,0,0.10)',
        },
        elevation2: {
          boxShadow: '0 4px 6px -1px rgba(0,0,0,0.10), 0 2px 4px -2px rgba(0,0,0,0.10)',
        },
        elevation3: {
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.10)',
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: ({ theme }) => ({ borderColor: themeTokens(theme).c.border.default }),
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: ({ theme }) => {
          const { c, r, ty } = themeTokens(theme);
          return {
            backgroundColor: c.bg.inverse,
            color: c.content.inverse,
            borderRadius: r['8'],
            fontFamily: ty.fontFamily.sans,
            fontSize: ty.fontSize.body.small,
            lineHeight: `${ty.lineHeight.body.small}px`,
            fontWeight: ty.fontWeight.regular,
          };
        },
        arrow: ({ theme }) => ({ color: themeTokens(theme).c.bg.inverse }),
      },
    },
    MuiBadge: {
      styleOverrides: {
        badge: ({ theme }) => {
          const { s, r, ty } = themeTokens(theme);
          return {
            borderRadius: r.full,
            fontFamily: ty.fontFamily.sans,
            fontSize: ty.fontSize.label.small,
            lineHeight: `${ty.lineHeight.label.small}px`,
            fontWeight: ty.fontWeight.medium,
            minWidth: 20,
            height: 20,
            padding: `0 ${s.xs}px`,
          };
        },
        dot: ({ theme }) => ({
          minWidth: 8,
          height: 8,
          padding: 0,
          borderRadius: themeTokens(theme).r.full,
        }),
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: ({ theme }) => overlayBackdropStyles(theme),
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: { '& .MuiSwitch-thumb': { boxShadow: 'none' } },
      },
    },
    MuiTab: {
      styleOverrides: {
        root: ({ theme }) => {
          const { c, ty } = themeTokens(theme);
          return {
            textTransform: 'none',
            fontFamily: ty.fontFamily.sans,
            fontSize: ty.fontSize.label.medium,
            lineHeight: `${ty.lineHeight.label.medium}px`,
            fontWeight: ty.fontWeight.medium,
            color: c.content.secondary,
            '&.Mui-selected': { color: c.brand.primary.content.default },
          };
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: ({ theme }) => ({
          backgroundColor: themeTokens(theme).c.brand.primary.content.default,
        }),
      },
    },
    MuiAlert: {
      styleOverrides: {
        root: ({ theme }) => {
          const { r, ty } = themeTokens(theme);
          return {
            borderRadius: r['8'],
            fontFamily: ty.fontFamily.sans,
            fontSize: ty.fontSize.body.medium,
            lineHeight: `${ty.lineHeight.body.medium}px`,
            fontWeight: ty.fontWeight.regular,
          };
        },
        message: ({ theme }) => {
          const { ty } = themeTokens(theme);
          return {
            fontFamily: ty.fontFamily.sans,
            fontSize: ty.fontSize.body.medium,
            lineHeight: `${ty.lineHeight.body.medium}px`,
            fontWeight: ty.fontWeight.regular,
          };
        },
        icon: ({ theme }) => ({
          fontSize: themeTokens(theme).ty.fontSize.heading.small,
        }),
      },
    },
  };
}

// ─── Theme instance ──────────────────────────────────────────────────────────

export const carivaTheme = createTheme({
  palette: buildMuiPalette(),
  typography: buildMuiTypography(),
  shape: buildMuiShape(),
  spacing: buildMuiSpacingUnit(),
  cariva: buildCarivaThemeExtensions(),
  components: buildMuiComponentOverrides(),
});

export default carivaTheme;
