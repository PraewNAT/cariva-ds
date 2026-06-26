/**
 * Cariva DS tokens — admin-backoffice export (bridge round 1)
 *
 * Source: tokens.json (Core DS Figma semantic layer)
 * Product profile: backOffice
 *
 * Brand primary + font use admin-dashboard CURRENT values until Design sign-off.
 * See BRIDGE.md for Figma → DS → product mapping.
 */

export const colors = {
  brand: {
    primary: {
      onSurface: {
        default: '#2563eb',
        hover: '#1d4ed8',
        pressed: '#1e40af',
        subtle: '#eff6ff',
        muted: '#dbeafe',
      },
      content: {
        default: '#2563eb',
        strong: '#1d4ed8',
      },
      border: {
        default: '#93c5fd',
        strong: '#3b82f6',
      },
    },
    secondary: {
      onSurface: {
        default: '#0f766e',
        hover: '#115e59',
        pressed: '#134e4a',
        subtle: '#f0fdfa',
        muted: '#ccfbf1',
      },
      content: {
        default: '#0d9488',
        strong: '#0f766e',
      },
      border: {
        default: '#5eead4',
        strong: '#14b8a6',
      },
    },
  },
  content: {
    primary: '#0f172a',
    secondary: '#334155',
    placeholder: '#475569',
    disabled: '#94a3b8',
    inverse: '#ffffff',
    link: {
      default: '#2563eb',
      hover: '#1d4ed8',
      pressed: '#1e40af',
      disabled: '#475569',
    },
    onBrand: '#ffffff',
  },
  bg: {
    white: '#ffffff',
    subtle: '#f1f5f9',
    inverse: '#0f172a',
    solid: '#e2e8f0',
  },
  onSurface: {
    default: '#ffffff',
    subtle: '#f8fafc',
    elevated: '#ffffff',
    sunken: '#f1f5f9',
    overlay: '#ffffff',
    action: {
      hover: '#f1f5f9',
      pressed: '#e2e8f0',
      selected: '#eff6ff',
      disabled: '#f1f5f9',
    },
    invert: '#0f172a',
  },
  border: {
    default: '#cbd5e1',
    strong: '#94a3b8',
    disabled: '#e2e8f0',
    system: '#2563eb',
    error: '#dc2626',
  },
  status: {
    success: {
      onSurface: { default: '#047857', hover: '#065f46', pressed: '#064e3b', muted: '#d1fae5', subtle: '#ecfdf5' },
      content: { default: '#047857', strong: '#065f46' },
      border: { default: '#047857' },
    },
    warning: {
      onSurface: { default: '#d97706', hover: '#b45309', pressed: '#92400e', subtle: '#fffbeb', muted: '#fef3c7' },
      content: { default: '#d97706', strong: '#b45309' },
      border: { default: '#d97706' },
    },
    error: {
      onSurface: { default: '#dc2626', hover: '#b91c1c', pressed: '#991b1b', subtle: '#fef2f2', muted: '#fee2e2' },
      content: { default: '#dc2626', strong: '#b91c1c' },
    },
    info: {
      onSurface: { default: '#0284c7', hover: '#0369a1', pressed: '#075985', subtle: '#f0f9ff', muted: '#e0f2fe' },
      content: { default: '#0284c7', strong: '#0369a1' },
    },
  },
  overlay: {
    backdrop: '#00000066',
  },
} as const;

export const spacing = {
  none: 0,
  '2xs': 2,
  xs: 4,
  sm: 8,
  md: 12,
  lg: 16,
  xl: 24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 40,
} as const;

export const radius = {
  none: 0,
  '2': 2,
  '4': 4,
  '8': 8,
  '12': 12,
  '16': 16,
  '24': 24,
  '32': 32,
  full: 9999,
} as const;

export const productStyle = {
  carivaApp: {
    interactive: radius.full,
    inputSm: radius.full,
    inputMd: radius.full,
    containerSm: radius['12'],
    containerMd: radius['16'],
  },
  backOffice: {
    interactive: radius['12'],
    inputSm: radius['8'],
    inputMd: radius['12'],
    containerSm: radius['8'],
    containerMd: radius['12'],
  },
} as const;

export type ProductStyleName = keyof typeof productStyle;

/** Profile for admin-dashboard CMS back-office */
export const defaultProductStyle: ProductStyleName = 'backOffice';

/**
 * Round 1 — product brand overrides (until Core DS Design sign-off).
 * Use these when patching src/muiTheme/muiTheme.ts primary + font.
 */
export const adminProductBrand = {
  primary: {
    main: '#0075EA',
    dark: '#0D549B',
    light: '#1EB1FF',
  },
  fontFamily: 'Noto Sans Thai',
  fontWeights: [400, 500, 700] as const,
  /** Product uses 32px pill buttons today — DS backOffice.interactive is 12px */
  radiusDelta: {
    button: '32px',
    input: '8px',
    dialog: '16px',
  },
  background: {
    page: '#F4F6F9',
    surface: '#FFFFFF',
  },
  alert: {
    success: '#2E7D32',
    error: '#D32F2F',
  },
  tableHeaderBg: '#ECEFF1',
} as const;

export type CarivaColors = typeof colors;
export type CarivaSpacing = typeof spacing;
