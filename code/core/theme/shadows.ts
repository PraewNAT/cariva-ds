/**
 * Elevation tokens — mirrors the Figma effect styles `shadow/*`.
 *
 * The DS shadow colour is a deep navy at low opacity, not neutral grey, so the
 * elevation reads cool rather than muddy. `status.*` are the soft coloured
 * elevations used by status surfaces (toast/alert).
 */

/** #1e3a8a — the shadow colour of every `shadow/*` style, and of `shadow/status/notification`. */
export const SHADOW_BASE_COLOR = '#1e3a8a';

const BASE = 'rgba(30, 58, 138, 0.25)';

export const shadows = {
  sm: `0 1px 2px 0 ${BASE}`,
  md: `0 4px 6px -1px ${BASE}, 0 2px 4px -2px ${BASE}`,
  lg: `0 10px 15px -3px ${BASE}, 0 4px 6px -4px ${BASE}`,
  // Hover lift for elevated buttons / FAB — tighter and softer than lg, so it is
  // three low-alpha layers rather than the Tailwind two-layer ramp.
  xl: [
    `0 5px 6px -3px ${rgba(SHADOW_BASE_COLOR, 0.2)}`,
    `0 9px 12px 1px ${rgba(SHADOW_BASE_COLOR, 0.14)}`,
    `0 3px 16px 2px ${rgba(SHADOW_BASE_COLOR, 0.12)}`,
  ].join(', '),
  // Overlay surfaces: modal, tabs folder, FAB resting.
  '2xl': `0 20px 25px -5px ${BASE}, 0 8px 10px -6px ${BASE}`,
  inner: [
    `inset 0 2px 12px 0 ${rgba(SHADOW_BASE_COLOR, 0.12)}`,
    `inset 0 0 4px 0 ${rgba(SHADOW_BASE_COLOR, 0.2)}`,
  ].join(', '),
} as const;

export type CarivaShadow = keyof typeof shadows;

/**
 * glow/* — the Figma effect styles used on hover for surfaces that are already
 * selected: a 4px halo at 36% of the surface's own colour, painted behind the
 * node so it reads as light coming off the card rather than a drop shadow.
 */
export const GLOW_ALPHA = 0.36;

export function glow(color: string): string {
  return `0 0 4px 0 ${rgba(color, GLOW_ALPHA)}`;
}

function rgba(color: string, alpha: number): string {
  const int = parseInt(color.replace('#', ''), 16);
  return `rgba(${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}, ${alpha})`;
}

/** shadow/status/* — three soft layers tinted with the status colour. */
export function statusShadow(color: string): string {
  const value = color.replace('#', '');
  const int = parseInt(value, 16);
  const rgb = `${(int >> 16) & 255}, ${(int >> 8) & 255}, ${int & 255}`;
  return [
    `0 8px 8px 0 rgba(${rgb}, 0.06)`,
    `0 -2px 8px 2px rgba(${rgb}, 0.04)`,
    `0 2px 4px 0 rgba(${rgb}, 0.12)`,
  ].join(', ');
}
