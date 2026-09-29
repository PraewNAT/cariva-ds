import { colors, productStyle, defaultProductStyle, radius, spacing } from '../../tokens';

// Figma crv-menu (4457:16648) — no stroke, drop shadow only
const MENU_SHADOW_COLOR = 'rgba(30, 58, 138, 0.25)';

/** Figma `crv-menu-item` height — the unit the menu's max height is counted in. */
export const MENU_ITEM_HEIGHT = 40;

/**
 * Figma `crv-menu` variant `scrollable=true` shows six items, then scrolls.
 * The list keeps its 8px padding top and bottom, so the box is 6 × 40 + 16.
 */
export const MENU_VISIBLE_ITEMS = 6;

const SCROLLBAR_WIDTH = 6;

/**
 * The scrollbar Figma draws: a 6px thumb in `color/border/strong`, fully
 * rounded, inset 4px from the right and 8px from the ends so it lines up with
 * the list padding. The track stays empty. Firefox has no pseudo-elements for
 * this, so `scrollbar-color` carries the same two colours.
 */
const scrollbarSx = {
  scrollbarWidth: 'thin',
  scrollbarColor: `${colors.border.strong} transparent`,
  '&::-webkit-scrollbar': { width: SCROLLBAR_WIDTH + spacing.sm },
  '&::-webkit-scrollbar-track': { backgroundColor: 'transparent' },
  '&::-webkit-scrollbar-thumb': {
    backgroundColor: colors.border.strong,
    borderRadius: `${radius.full}px`,
    // Padding drawn as a transparent border keeps the thumb 6px wide and inset.
    border: `${spacing.xs}px solid transparent`,
    backgroundClip: 'content-box',
  },
} as const;

/** Shared Menu/Autocomplete list paper styles — matches Figma `crv-menu` container */
export const crvMenuPaperSx = {
  mt:              `${spacing.xs}px`,
  borderRadius:    `${productStyle[defaultProductStyle].containerSm}px`,
  border:          'none',
  backgroundColor: colors.onSurface.default,
  boxShadow:       [
    `0px 4px 6px -4px ${MENU_SHADOW_COLOR}`,
    `0px 10px 15px -3px ${MENU_SHADOW_COLOR}`,
  ].join(', '),
  maxHeight: MENU_VISIBLE_ITEMS * MENU_ITEM_HEIGHT + spacing.sm * 2,
  overflowY: 'auto',
  ...scrollbarSx,
  '& .MuiList-root': {
    py: `${spacing.sm}px`,
    px: 0,
  },
} as const;
