import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing, typography } from '../../tokens';
import type { CrvBottomSheetVariant } from './CrvBottomSheet.types';

/** Figma crv-bottom-sheet top corner radius (rectangleCornerRadii [24,24,0,0]). */
export const BOTTOM_SHEET_RADIUS = radius['24'];

/**
 * Max width — bottom sheet is a mobile pattern (Figma frame = 375px).
 * Capping + centering at the exact Figma width keeps the decorative glow
 * proportions identical to design instead of stretching full-desktop-width.
 */
export const BOTTOM_SHEET_MAX_WIDTH = 375;

/**
 * Sheet height — leaves 15% of the viewport empty at the top.
 * The content slot scrolls internally when content exceeds this height.
 */
export const BOTTOM_SHEET_HEIGHT = '85vh';

/**
 * Decorative header glow colours.
 * Ground truth: Figma left/right circle GRADIENT_RADIAL stop 0 — VariableID 4016:103 / 4016:99
 */
export const HEADER_GRADIENT_LEFT = colors.accent.cyan.A02;  // #67e8f9
export const HEADER_GRADIENT_RIGHT = colors.accent.teal.A02; // #5eead4

export function getBottomSheetPaperSx(): SxProps<Theme> {
  return {
    width: '100%',
    maxWidth: `${BOTTOM_SHEET_MAX_WIDTH}px`,
    marginInline: 'auto',
    left: 0,
    right: 0,
    backgroundColor: colors.onSurface.default,
    borderTopLeftRadius:  `${BOTTOM_SHEET_RADIUS}px`,
    borderTopRightRadius: `${BOTTOM_SHEET_RADIUS}px`,
    borderBottomLeftRadius:  0,
    borderBottomRightRadius: 0,
    overflow: 'hidden',
    height: BOTTOM_SHEET_HEIGHT,
    maxHeight: BOTTOM_SHEET_HEIGHT,
    display: 'flex',
    flexDirection: 'column',
  };
}

/** Header section — Figma type=Default/Search, padding [24,24,16,24], gap 12. */
export function getHeaderSectionSx(): SxProps<Theme> {
  return {
    position: 'relative',
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.md}px`,
    pt: `${spacing.xl}px`,
    px: `${spacing.xl}px`,
    pb: `${spacing.lg}px`,
    backgroundColor: colors.onSurface.default,
  };
}

/**
 * Decorative radial ellipses — ground truth from Figma bbox (px):
 *   Default header (375×72):  left 604×144, right 604×143
 *   Search header  (375×132): left 604×206, right 600×206
 *   Left centre → header top-left corner; right centre → top-right corner.
 *
 * `closest-side` makes the colour fade to transparent exactly on the ellipse
 * boundary (edge midpoints) — matching Figma's radial stop 0 → stop 1.
 * The default `farthest-corner` overshoots to the corner and leaves a white
 * V-wedge between the two glows.
 */
const GLOW_PX: Record<CrvBottomSheetVariant, { lw: number; lh: number; rw: number; rh: number }> = {
  default: { lw: 604, lh: 144, rw: 604, rh: 143 },
  search:  { lw: 604, lh: 206, rw: 600, rh: 206 },
};

export function getHeaderGradientLeftSx(variant: CrvBottomSheetVariant = 'default'): SxProps<Theme> {
  const { lw, lh } = GLOW_PX[variant];
  return {
    position: 'absolute',
    width:  `${lw}px`,
    height: `${lh}px`,
    left:   `${-(lw / 2)}px`,
    top:    `${-(lh / 2)}px`,
    borderRadius: '50%',
    pointerEvents: 'none',
    background: `radial-gradient(ellipse closest-side at center, ${HEADER_GRADIENT_LEFT} 0%, transparent 100%)`,
  };
}

export function getHeaderGradientRightSx(variant: CrvBottomSheetVariant = 'default'): SxProps<Theme> {
  const { rw, rh } = GLOW_PX[variant];
  return {
    position: 'absolute',
    width:  `${rw}px`,
    height: `${rh}px`,
    right:  `${-(rw / 2)}px`,
    top:    `${-(rh / 2)}px`,
    borderRadius: '50%',
    pointerEvents: 'none',
    background: `radial-gradient(ellipse closest-side at center, ${HEADER_GRADIENT_RIGHT} 0%, transparent 100%)`,
  };
}

/** Title + actions row — space-between, center aligned. */
export function getHeaderRowSx(): SxProps<Theme> {
  return {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: `${spacing.sm}px`,
    minHeight: 32,
  };
}

export function getTitleSx(): SxProps<Theme> {
  return {
    color: colors.content.primary,
    fontFamily: typography.fontFamily.sans,
    fontSize: `${typography.fontSize.heading.small}px`,
    lineHeight: `${typography.lineHeight.heading.small}px`,
    fontWeight: typography.fontWeight.semibold,
    margin: 0,
  };
}

export function getHeaderActionsSx(): SxProps<Theme> {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.sm}px`,
  };
}

export function getSearchSlotSx(): SxProps<Theme> {
  return {
    position: 'relative',
  };
}

/** Scrollable content slot — Figma contentSlot, padding 24, gap 16. */
export function getContentSlotSx(): SxProps<Theme> {
  return {
    flex: 1,
    overflowY: 'auto',
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.lg}px`,
    p: `${spacing.xl}px`,
    backgroundColor: colors.onSurface.default,
  };
}

/** Footer action area — white, border-top, Figma `bottom navigation` section. */
export function getFooterSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.sm}px`,
    pt: `${spacing.sm}px`,
    px: `${spacing.lg}px`,
    pb: `${spacing.lg}px`,
    backgroundColor: colors.onSurface.default,
    borderTop: `1px solid ${colors.border.default}`,
  };
}
