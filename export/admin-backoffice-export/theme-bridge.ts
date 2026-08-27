/**
 * admin-dashboard theme bridge — palette patch + MUI component overrides.
 *
 * Usage:
 *   import { buildAdminThemePatch, getOutlinedBorderTokens } from '@/ds-bridge/theme-bridge';
 *   import existingTheme from '@/muiTheme/muiTheme';
 *   import { createTheme } from '@mui/material/styles';
 *
 *   // outlinedBorder is NOT in palette — set as top-level const in muiTheme.ts:
 *   const outlinedBorder = getOutlinedBorderTokens();
 *
 *   export const theme = createTheme(
 *     existingTheme,
 *     buildAdminThemePatch({ useProductBrand: true }),
 *   );
 *
 * Or merge separately:
 *   createTheme(existingTheme, {
 *     ...buildAdminPalettePatch(),
 *     components: buildAdminComponentOverrides(),
 *   });
 */

import type { ThemeOptions } from '@mui/material/styles';
import { colors, adminProductBrand, defaultProductStyle, productStyle } from './tokens';
import { buildAdminComponentOverrides } from './theme/buildAdminComponentOverrides';

export { getOutlinedBorderTokens } from './theme/outlinedBorder';
export type { OutlinedBorderTokens } from './theme/outlinedBorder';
export { getAdminThemeTokens } from './theme/adminTokens';
export { buildAdminComponentOverrides } from './theme/buildAdminComponentOverrides';
export type { BuildAdminOverridesOptions } from './theme/buildAdminComponentOverrides';

export type BuildAdminBridgeOptions = {
  /** Round 1: true = keep admin #0075EA + radius deltas */
  useProductBrand?: boolean;
  /** Include Mui* styleOverrides (default true) */
  includeComponents?: boolean;
};

function hexToRgb(hex: string): [number, number, number] {
  const h = hex.replace('#', '');
  return [
    parseInt(h.slice(0, 2), 16),
    parseInt(h.slice(2, 4), 16),
    parseInt(h.slice(4, 6), 16),
  ];
}

function primaryStatesFrom(main: string) {
  const [r, g, b] = hexToRgb(main);
  return {
    hover: `rgba(${r}, ${g}, ${b}, 0.04)`,
    selected: `rgba(${r}, ${g}, ${b}, 0.08)`,
    focus: `rgba(${r}, ${g}, ${b}, 0.12)`,
    focusVisible: `rgba(${r}, ${g}, ${b}, 0.30)`,
  };
}

/** Palette patch only — outlinedBorder excluded (use getOutlinedBorderTokens()) */
export function buildAdminPalettePatch(
  options: Pick<BuildAdminBridgeOptions, 'useProductBrand'> = {},
): ThemeOptions {
  const useProductBrand = options.useProductBrand ?? true;
  const primaryMain = useProductBrand
    ? adminProductBrand.primary.main
    : colors.brand.primary.onSurface.default;
  const primaryDark = useProductBrand
    ? adminProductBrand.primary.dark
    : colors.brand.primary.onSurface.hover;
  const primaryLight = useProductBrand
    ? adminProductBrand.primary.light
    : colors.brand.primary.border.strong;

  const profile = productStyle[defaultProductStyle];

  return {
    palette: {
      primary: {
        main: primaryMain,
        dark: primaryDark,
        light: primaryLight,
        contrastText: colors.content.inverse,
      },
      warning: {
        main: colors.status.warning.onSurface.default,
        contrastText: colors.content.primary,
      },
      error: {
        main: colors.status.error.onSurface.default,
      },
      success: {
        main: colors.status.success.onSurface.default,
      },
      divider: colors.border.default,
      primaryStates: primaryStatesFrom(primaryMain),
      backgroundColor: {
        main: useProductBrand ? adminProductBrand.background.page : colors.bg.subtle,
        white: useProductBrand ? adminProductBrand.background.surface : colors.bg.white,
        overlay: colors.overlay.backdrop,
      },
      textColor: {
        black: {
          primary: colors.content.primary,
          secondary: colors.content.secondary,
          tertiary: colors.content.placeholder,
          disabled: colors.content.disabled,
        },
        white: {
          primary: colors.content.inverse,
          secondary: 'rgba(255, 255, 255, 0.87)',
          tertiary: 'rgba(255, 255, 255, 0.60)',
          disabled: 'rgba(255, 255, 255, 0.38)',
        },
      },
      icon: colors.content.secondary,
    },
    shape: {
      borderRadius: profile.inputSm,
    },
  };
}

/** Palette + MUI styleOverrides — ready to merge with existing muiTheme.ts */
export function buildAdminThemePatch(options: BuildAdminBridgeOptions = {}): ThemeOptions {
  const useProductBrand = options.useProductBrand ?? true;
  const includeComponents = options.includeComponents ?? true;

  return {
    ...buildAdminPalettePatch({ useProductBrand }),
    ...(includeComponents
      ? { components: buildAdminComponentOverrides({ useProductBrand }) }
      : {}),
  };
}

/** @deprecated use buildAdminThemePatch */
export function buildSemanticOnlyPatch(): ThemeOptions {
  return buildAdminPalettePatch({ useProductBrand: true });
}
