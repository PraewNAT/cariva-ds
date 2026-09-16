/**
 * Elevation tokens — mirrors the Figma effect styles `shadow/*`.
 *
 * The DS shadow colour is a deep navy at low opacity, not neutral grey, so the
 * elevation reads cool rather than muddy. `status.*` are the soft coloured
 * elevations used by status surfaces (toast/alert).
 */

const BASE = 'rgba(30, 58, 138, 0.25)'; // #1e3a8a — the shadow colour of every shadow/* style

export const shadows = {
  sm: `0 1px 2px 0 ${BASE}`,
  default: `0 1px 3px 0 ${BASE}, 0 1px 2px -1px ${BASE}`,
  md: `0 4px 6px -1px ${BASE}, 0 2px 4px -2px ${BASE}`,
  lg: `0 10px 15px -3px ${BASE}, 0 4px 6px -4px ${BASE}`,
  xl: `0 20px 25px -5px ${BASE}, 0 8px 10px -6px ${BASE}`,
  '2xl': `0 25px 50px -12px ${BASE}`,
  inner: 'inset 0 2px 4px 0 rgba(0, 0, 0, 0.05)',
} as const;

export type CarivaShadow = keyof typeof shadows;

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
