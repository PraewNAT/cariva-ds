/**
 * Cariva Design System — MUI Theme
 * Override MUI v9 default theme with Cariva tokens
 * Source: plugins/cariva-design-system/code/tokens.ts
 *
 * Usage:
 *   import { carivaTheme } from '@/theme';
 *   <ThemeProvider theme={carivaTheme}>
 *     <App />
 *   </ThemeProvider>
 */

import { createTheme } from '@mui/material/styles';
import { getOverlayBackdropSx } from './crvOverlayStyles';
import { colors, spacing, radius, typography } from './tokens';

export const carivaTheme = createTheme({

  // ─── Palette ────────────────────────────────────────────────
  palette: {
    primary: {
      main:        colors.brand.primary.onSurface.default,
      dark:        colors.brand.primary.onSurface.hover,
      light:       colors.brand.primary.onSurface.subtle,
      contrastText: colors.content.onBrand,
    },
    secondary: {
      main:        colors.brand.secondary.onSurface.default,
      dark:        colors.brand.secondary.onSurface.hover,
      light:       colors.brand.secondary.onSurface.subtle,
      contrastText: colors.content.onBrand,
    },
    error: {
      main:        colors.status.error.onSurface.default,
      dark:        colors.status.error.onSurface.hover,
      light:       colors.status.error.onSurface.subtle,
      contrastText: colors.content.inverse,
    },
    warning: {
      main:        colors.status.warning.onSurface.default,
      dark:        colors.status.warning.onSurface.hover,
      light:       colors.status.warning.onSurface.subtle,
      contrastText: colors.content.primary, // amber ต้องใช้ dark text
    },
    success: {
      main:        colors.status.success.onSurface.default,
      dark:        colors.status.success.onSurface.hover,
      light:       colors.status.success.onSurface.subtle,
      contrastText: colors.content.inverse,
    },
    info: {
      main:        colors.status.info.onSurface.default,
      dark:        colors.status.info.onSurface.hover,
      light:       colors.status.info.onSurface.subtle,
      contrastText: colors.content.inverse,
    },
    text: {
      primary:   colors.content.primary,
      secondary: colors.content.secondary,
      disabled:  colors.content.disabled,
    },
    background: {
      default: colors.bg.page,
      paper:   colors.onSurface.default,
    },
    divider: colors.border.default,
    action: {
      hover:           colors.onSurface.action.hover,
      selected:        colors.onSurface.action.selected,
      disabled:        colors.content.disabled,
      disabledBackground: colors.onSurface.action.disabled,
    },
  },

  // ─── Spacing ────────────────────────────────────────────────
  // MUI spacing(1) = 8px base — override ด้วย 4px grid
  spacing: 4,

  // ─── Shape (Border Radius) ───────────────────────────────────
  shape: {
    borderRadius: radius['8'], // default component radius
  },

  // ─── Typography ─────────────────────────────────────────────
  typography: {
    fontFamily: typography.fontFamily.sans,

    // Display
    h1: {
      fontFamily:  typography.fontFamily.sans,
      fontSize:    typography.fontSize.display.large,
      lineHeight:  `${typography.lineHeight.display.large}px`,
      fontWeight:  typography.fontWeight.bold,
    },
    h2: {
      fontFamily:  typography.fontFamily.sans,
      fontSize:    typography.fontSize.display.medium,
      lineHeight:  `${typography.lineHeight.display.medium}px`,
      fontWeight:  typography.fontWeight.bold,
    },
    h3: {
      fontFamily:  typography.fontFamily.sans,
      fontSize:    typography.fontSize.display.small,
      lineHeight:  `${typography.lineHeight.display.small}px`,
      fontWeight:  typography.fontWeight.semibold,
    },

    // Heading
    h4: {
      fontFamily:  typography.fontFamily.sans,
      fontSize:    typography.fontSize.heading.large,
      lineHeight:  `${typography.lineHeight.heading.large}px`,
      fontWeight:  typography.fontWeight.semibold,
    },
    h5: {
      fontFamily:  typography.fontFamily.sans,
      fontSize:    typography.fontSize.heading.medium,
      lineHeight:  `${typography.lineHeight.heading.medium}px`,
      fontWeight:  typography.fontWeight.semibold,
    },
    h6: {
      fontFamily:  typography.fontFamily.sans,
      fontSize:    typography.fontSize.heading.small,
      lineHeight:  `${typography.lineHeight.heading.small}px`,
      fontWeight:  typography.fontWeight.semibold,
    },

    // Body
    body1: {
      fontFamily:  typography.fontFamily.sans,
      fontSize:    typography.fontSize.body.large,
      lineHeight:  `${typography.lineHeight.body.large}px`,
      fontWeight:  typography.fontWeight.regular,
    },
    body2: {
      fontFamily:  typography.fontFamily.sans,
      fontSize:    typography.fontSize.body.medium,
      lineHeight:  `${typography.lineHeight.body.medium}px`,
      fontWeight:  typography.fontWeight.regular,
    },

    // Label — buttons use label/large at every size (rules/typography.md + crv-button-standard)
    button: {
      fontFamily:  typography.fontFamily.sans,
      fontSize:    typography.fontSize.label.large,
      lineHeight:  `${typography.lineHeight.label.large}px`,
      fontWeight:  typography.fontWeight.medium,
      textTransform: 'none', // ปิด uppercase default ของ MUI
    },

    // Caption
    caption: {
      fontFamily:  typography.fontFamily.sans,
      fontSize:    typography.fontSize.caption.caption,
      lineHeight:  `${typography.lineHeight.caption.caption}px`,
      fontWeight:  typography.fontWeight.regular,
    },

    // Overline (ใช้เป็น label/small)
    overline: {
      fontFamily:  typography.fontFamily.sans,
      fontSize:    typography.fontSize.label.small,
      lineHeight:  `${typography.lineHeight.label.small}px`,
      fontWeight:  typography.fontWeight.medium,
      textTransform: 'none',
    },
  },

  // ─── Component Overrides ────────────────────────────────────
  components: {

    // Button — typography/label/large (16/24) for all sizes per crv-button-standard
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: radius['12'],
          padding: `${spacing.sm}px ${spacing.lg}px`,
          boxShadow: 'none',
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.label.large,
          lineHeight: `${typography.lineHeight.label.large}px`,
          fontWeight: typography.fontWeight.medium,
          textTransform: 'none',
          '&:hover': { boxShadow: 'none' },
        },
        sizeSmall: {
          padding: `${spacing.xs}px ${spacing.lg}px`,
          fontSize: typography.fontSize.label.large,
          lineHeight: `${typography.lineHeight.label.large}px`,
        },
        sizeMedium: {
          padding: `${spacing.sm}px ${spacing.lg}px`,
          fontSize: typography.fontSize.label.large,
          lineHeight: `${typography.lineHeight.label.large}px`,
        },
        sizeLarge: {
          padding: `${spacing.sm}px ${spacing.xl}px`,
          fontSize: typography.fontSize.label.large,
          lineHeight: `${typography.lineHeight.label.large}px`,
        },
      },
    },

    // IconButton
    MuiIconButton: {
      styleOverrides: {
        root: {
          borderRadius: radius['12'],
        },
      },
    },

    // TextField / Input
    MuiOutlinedInput: {
      styleOverrides: {
        root: {
          borderRadius: radius['8'],
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.body.large,
          lineHeight: `${typography.lineHeight.body.large}px`,
          fontWeight: typography.fontWeight.regular,
          '& .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border.default,
          },
          '&:hover .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border.strong,
          },
          '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border.system,
            borderWidth: 1,
          },
          '&.Mui-error .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border.error,
          },
          '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
            borderColor: colors.border.disabled,
          },
        },
        input: {
          padding: `${spacing.sm}px ${spacing.lg}px`,
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.body.large,
          lineHeight: `${typography.lineHeight.body.large}px`,
          fontWeight: typography.fontWeight.regular,
          color: colors.content.primary,
          '&::placeholder': {
            color: colors.content.placeholder,
            opacity: 1,
          },
        },
      },
    },

    // FormHelperText
    MuiFormHelperText: {
      styleOverrides: {
        root: {
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.body.small,
          lineHeight: `${typography.lineHeight.body.small}px`,
          fontWeight: typography.fontWeight.regular,
          color: colors.content.secondary,
          '&.Mui-error': {
            color: colors.status.error.content.default,
          },
        },
      },
    },

    // Chip
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: radius['12'],
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.label.medium,
          lineHeight: `${typography.lineHeight.label.medium}px`,
          fontWeight: typography.fontWeight.medium,
        },
        label: {
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.label.medium,
          lineHeight: `${typography.lineHeight.label.medium}px`,
          fontWeight: typography.fontWeight.medium,
        },
        sizeSmall: {
          fontSize: typography.fontSize.label.small,
          lineHeight: `${typography.lineHeight.label.small}px`,
          '& .MuiChip-label': {
            fontSize: typography.fontSize.label.small,
            lineHeight: `${typography.lineHeight.label.small}px`,
          },
        },
      },
    },

    // Paper (cards, popovers, menus)
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundImage: 'none',
        },
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

    // Divider
    MuiDivider: {
      styleOverrides: {
        root: {
          borderColor: colors.border.default,
        },
      },
    },

    // Tooltip
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          backgroundColor: colors.bg.inverse,
          color: colors.content.inverse,
          borderRadius: radius['8'],
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.body.small,
          lineHeight: `${typography.lineHeight.body.small}px`,
          fontWeight: typography.fontWeight.regular,
        },
        arrow: {
          color: colors.bg.inverse,
        },
      },
    },

    // Badge
    MuiBadge: {
      styleOverrides: {
        badge: {
          borderRadius: radius.full,
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.label.small,
          lineHeight: `${typography.lineHeight.label.small}px`,
          fontWeight: typography.fontWeight.medium,
          minWidth: 20,
          height: 20,
          padding: `0 ${spacing.xs}px`,
        },
        dot: {
          minWidth: 8,
          height: 8,
          padding: 0,
          borderRadius: radius.full,
        },
      },
    },

    // Backdrop — crv-overlay (4722:90374), overrides MUI default 50% → 40%
    MuiBackdrop: {
      styleOverrides: {
        root: getOverlayBackdropSx(),
      },
    },

    // Switch (toggle)
    MuiSwitch: {
      styleOverrides: {
        root: {
          '& .MuiSwitch-thumb': {
            boxShadow: 'none',
          },
        },
      },
    },

    // Tabs
    MuiTab: {
      styleOverrides: {
        root: {
          textTransform: 'none',
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.label.medium,
          lineHeight: `${typography.lineHeight.label.medium}px`,
          fontWeight: typography.fontWeight.medium,
          color: colors.content.secondary,
          '&.Mui-selected': {
            color: colors.brand.primary.content.default,
          },
        },
      },
    },
    MuiTabs: {
      styleOverrides: {
        indicator: {
          backgroundColor: colors.brand.primary.content.default,
        },
      },
    },

    // Alert
    MuiAlert: {
      styleOverrides: {
        root: {
          borderRadius: radius['8'],
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.body.medium,
          lineHeight: `${typography.lineHeight.body.medium}px`,
          fontWeight: typography.fontWeight.regular,
        },
        message: {
          fontFamily: typography.fontFamily.sans,
          fontSize: typography.fontSize.body.medium,
          lineHeight: `${typography.lineHeight.body.medium}px`,
          fontWeight: typography.fontWeight.regular,
        },
        icon: {
          fontSize: typography.fontSize.heading.small,
        },
      },
    },
  },
});

export default carivaTheme;
