/**
 * Cariva Design System — Semantic Tokens
 * Auto-generated from Figma variables (Semantic Colors collection)
 * Source of truth: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System
 *
 * DO NOT EDIT MANUALLY — update in Figma, then regenerate.
 */

export const colors = {
  brand: {
    primary: {
      onSurface: {
        default:  '#2563eb',
        hover:    '#1d4ed8',
        pressed:  '#1e40af',
        subtle:   '#eff6ff',
        muted:    '#dbeafe',
      },
      content: {
        default:  '#2563eb',
        strong:   '#1d4ed8',
      },
      border: {
        default:  '#93c5fd',
        strong:   '#3b82f6',
      },
    },
    secondary: {
      onSurface: {
        default:  '#0f766e',
        hover:    '#115e59',
        pressed:  '#134e4a',
        subtle:   '#f0fdfa',
        muted:    '#ccfbf1',
      },
      content: {
        default:  '#0d9488',
        strong:   '#0f766e',
      },
      border: {
        default:  '#5eead4',
        strong:   '#14b8a6',
      },
    },
  },

  content: {
    primary:     '#0f172a',
    secondary:   '#334155',
    placeholder: '#475569',
    disabled:    '#94a3b8',
    inverse:     '#ffffff',
    onBrand:     '#ffffff',
    link: {
      default:   '#2563eb',
      hover:     '#1d4ed8',
      pressed:   '#1e40af',
      disabled:  '#475569',
    },
  },

  bg: {
    page:    '#f8fafc',
    subtle:  '#f1f5f9',
    inverse: '#0f172a',
  },

  onSurface: {
    default:  '#ffffff',
    subtle:   '#f8fafc',
    elevated: '#ffffff',
    sunken:   '#f1f5f9',
    overlay:  '#ffffff',
    invert:   '#0f172a',
    action: {
      hover:     '#f1f5f9',
      pressed:   '#e2e8f0',
      selected:  '#eff6ff',
      disabled:  '#f1f5f9',
    },
  },

  border: {
    default:  '#cbd5e1',
    strong:   '#94a3b8',
    disabled: '#e2e8f0',
    system:   '#2563eb',
    error:    '#dc2626',
  },

  status: {
    success: {
      onSurface: {
        default:  '#047857',
        hover:    '#065f46',
        pressed:  '#064e3b',
        subtle:   '#ecfdf5',
        muted:    '#d1fae5',
      },
      content: {
        default:  '#047857',
        strong:   '#065f46',
      },
      border: {
        default:  '#047857',
      },
    },
    warning: {
      onSurface: {
        default:  '#d97706',
        hover:    '#b45309',
        pressed:  '#92400e',
        subtle:   '#fffbeb',
        muted:    '#fef3c7',
      },
      content: {
        default:  '#d97706',
        strong:   '#b45309',
      },
      border: {
        default:  '#d97706',
      },
    },
    error: {
      onSurface: {
        default:  '#dc2626',
        hover:    '#b91c1c',
        pressed:  '#991b1b',
        subtle:   '#fef2f2',
        muted:    '#fee2e2',
      },
      content: {
        default:  '#dc2626',
        strong:   '#b91c1c',
      },
    },
    info: {
      onSurface: {
        default:  '#0284c7',
        hover:    '#0369a1',
        pressed:  '#075985',
        subtle:   '#f0f9ff',
        muted:    '#e0f2fe',
      },
      content: {
        default:  '#0284c7',
        strong:   '#0369a1',
      },
    },
  },

  overlay: {
    /** Figma color/overlay/backdrop — #000000 @ 40% (crv-overlay 4722:90374) */
    backdrop:       '#00000066',
    backdropStrong: '#00000099',
  },

  accent: {
    red:     { A01: '#fee2e2', A02: '#fca5a5', A03: '#ef4444', A04: '#b91c1c', A05: '#7f1d1d' },
    orange:  { A01: '#ffedd5', A02: '#fdba74', A03: '#f97316', A04: '#c2410c', A05: '#7c2d12' },
    amber:   { A01: '#fef3c7', A02: '#fcd34d', A03: '#f59e0b', A04: '#b45309', A05: '#78350f' },
    yellow:  { A01: '#fef9c3', A02: '#fde047', A03: '#eab308', A04: '#a16207', A05: '#713f12' },
    lime:    { A01: '#ecfccb', A02: '#bef264', A03: '#84cc16', A04: '#4d7c0f', A05: '#365314' },
    green:   { A01: '#dcfce7', A02: '#86efac', A03: '#22c55e', A04: '#15803d', A05: '#14532d' },
    emerald: { A01: '#d1fae5', A02: '#6ee7b7', A03: '#10b981', A04: '#047857', A05: '#064e3b' },
    teal:    { A01: '#ccfbf1', A02: '#5eead4', A03: '#14b8a6', A04: '#0f766e', A05: '#134e4a' },
    cyan:    { A01: '#cffafe', A02: '#67e8f9', A03: '#06b6d4', A04: '#0e7490', A05: '#164e63' },
    sky:     { A01: '#e0f2fe', A02: '#7dd3fc', A03: '#0ea5e9', A04: '#0369a1', A05: '#0c4a6e' },
    blue:    { A01: '#dbeafe', A02: '#93c5fd', A03: '#3b82f6', A04: '#1d4ed8', A05: '#1e3a8a' },
    indigo:  { A01: '#e0e7ff', A02: '#a5b4fc', A03: '#6366f1', A04: '#4338ca', A05: '#312e81' },
    violet:  { A01: '#ede9fe', A02: '#c4b5fd', A03: '#8b5cf6', A04: '#6d28d9', A05: '#4c1d95' },
    purple:  { A01: '#f3e8ff', A02: '#d8b4fe', A03: '#a855f7', A04: '#7e22ce', A05: '#581c87' },
    pink:    { A01: '#fce7f3', A02: '#f9a8d4', A03: '#ec4899', A04: '#be185d', A05: '#831843' },
  },
} as const;

export const spacing = {
  none:  0,
  '2xs': 2,
  xs:    4,
  sm:    8,
  md:    12,
  lg:    16,
  xl:    24,
  '2xl': 28,
  '3xl': 32,
  '4xl': 40,
} as const;

export const radius = {
  none:  0,
  '2':   2,
  '4':   4,
  '8':   8,
  '12':  12,
  '16':  16,
  '24':  24,
  '32':  32,
  full:  9999,
} as const;

/**
 * Product Style — theme-aware radius tokens.
 * Mirrors Figma's "Product Style" collection (modes: cariva app / back office).
 *
 * Switch by overriding via ThemeProvider, or set `defaultProductStyle` at app entry.
 */
export const productStyle = {
  carivaApp: {
    interactive: radius.full,  // pill button
    inputSm:     radius.full,
    inputMd:     radius.full,
    containerSm: radius['12'],
    containerMd: radius['16'],
  },
  backOffice: {
    interactive: radius['12'], // rounded square button
    inputSm:     radius['8'],
    inputMd:     radius['12'],
    containerSm: radius['8'],
    containerMd: radius['12'],
  },
} as const;

export type ProductStyleName = keyof typeof productStyle;

/** Default product style — change here to swap theme globally */
export const defaultProductStyle: ProductStyleName = 'carivaApp';

export const typography = {
  fontFamily: {
    sans:  '"IBM Plex Sans Thai", sans-serif',
    serif: '"IBM Plex Sans Thai Looped", serif',
  },
  fontSize: {
    display:  { large: 64, medium: 48, small: 40 },
    heading:  { large: 24, medium: 20, small: 16 },
    body:     { large: 16, medium: 14, small: 12 },
    label:    { large: 16, medium: 14, small: 12 },
    caption:  { caption: 12 },
  },
  lineHeight: {
    display:  { large: 72, medium: 56, small: 48 },
    heading:  { large: 32, medium: 28, small: 24 },
    body:     { large: 24, medium: 22, small: 18 },
    label:    { large: 24, medium: 22, small: 18 },
    caption:  { caption: 16 },
  },
  fontWeight: {
    regular:   400,
    medium:    500,
    semibold:  600,
    bold:      700,
  },
} as const;

/** Convenience type for token color paths */
export type CarivaColors = typeof colors;
export type CarivaSpacing = typeof spacing;
