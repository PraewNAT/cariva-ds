import type { Theme } from '@mui/material/styles';
import {
  adminProductBrand,
  colors,
  defaultProductStyle,
  productStyle,
  spacing as dsSpacing,
} from '../tokens';
import { getOutlinedBorderTokens } from './outlinedBorder';

export type AdminTextColorShades = {
  primary: string;
  secondary: string;
  tertiary: string;
  disabled: string;
};

export type AdminPaletteBridge = {
  textColor: {
    black: AdminTextColorShades;
    white: AdminTextColorShades;
  };
  primaryStates: {
    hover: string;
    selected: string;
    focus: string;
    focusVisible: string;
  };
  backgroundColor: {
    main: string;
    white: string;
    overlay: string;
  };
  icon: string;
};

export type AdminThemeTokens = {
  primary: string;
  primaryDark: string;
  textColor: AdminPaletteBridge['textColor'];
  primaryStates: AdminPaletteBridge['primaryStates'];
  backgroundColor: AdminPaletteBridge['backgroundColor'];
  icon: string;
  divider: string;
  outlinedBorder: ReturnType<typeof getOutlinedBorderTokens>;
  radius: {
    button: string;
    input: string;
    dialog: string;
  };
  alert: {
    success: string;
    error: string;
  };
  tableHeaderBg: string;
  warning: {
    main: string;
    contrastText: string;
  };
  error: string;
  spacing: typeof dsSpacing;
};

type AdminThemeOptions = {
  /** Round 1 default: product brand deltas */
  useProductBrand?: boolean;
};

function readAdminPalette(theme: Theme): AdminPaletteBridge {
  const palette = theme.palette as Theme['palette'] & Partial<AdminPaletteBridge>;
  return {
    textColor: palette.textColor ?? {
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
    primaryStates: palette.primaryStates ?? {
      hover: 'rgba(0, 117, 234, 0.04)',
      selected: 'rgba(0, 117, 234, 0.08)',
      focus: 'rgba(0, 117, 234, 0.12)',
      focusVisible: 'rgba(0, 117, 234, 0.30)',
    },
    backgroundColor: palette.backgroundColor ?? {
      main: adminProductBrand.background.page,
      white: adminProductBrand.background.surface,
      overlay: colors.overlay.backdrop,
    },
    icon: palette.icon ?? colors.content.secondary,
  };
}

/** Resolve tokens for MUI styleOverrides — reads admin palette schema from theme */
export function getAdminThemeTokens(
  theme: Theme,
  options: AdminThemeOptions = {},
): AdminThemeTokens {
  const useProductBrand = options.useProductBrand ?? true;
  const profile = productStyle[defaultProductStyle];
  const adminPalette = readAdminPalette(theme);

  return {
    primary: theme.palette.primary.main,
    primaryDark: theme.palette.primary.dark,
    textColor: adminPalette.textColor,
    primaryStates: adminPalette.primaryStates,
    backgroundColor: adminPalette.backgroundColor,
    icon: adminPalette.icon,
    divider: theme.palette.divider,
    outlinedBorder: getOutlinedBorderTokens(),
    radius: {
      button: useProductBrand
        ? adminProductBrand.radiusDelta.button
        : `${profile.interactive}px`,
      input: useProductBrand
        ? adminProductBrand.radiusDelta.input
        : `${profile.inputSm}px`,
      dialog: useProductBrand
        ? adminProductBrand.radiusDelta.dialog
        : `${profile.containerMd}px`,
    },
    alert: useProductBrand
      ? adminProductBrand.alert
      : {
          success: colors.status.success.onSurface.default,
          error: colors.status.error.onSurface.default,
        },
    tableHeaderBg: useProductBrand
      ? adminProductBrand.tableHeaderBg
      : colors.onSurface.subtle,
    warning: {
      main: theme.palette.warning.main,
      contrastText: theme.palette.warning.contrastText ?? colors.content.primary,
    },
    error: theme.palette.error.main,
    spacing: dsSpacing,
  };
}
