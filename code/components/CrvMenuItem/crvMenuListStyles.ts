import { colors, productStyle, defaultProductStyle, spacing } from '../../tokens';

// Figma crv-menu (4457:16648) — no stroke, drop shadow only
const MENU_SHADOW_COLOR = 'rgba(30, 58, 138, 0.25)';

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
  '& .MuiList-root': {
    py: `${spacing.sm}px`,
    px: 0,
  },
} as const;
