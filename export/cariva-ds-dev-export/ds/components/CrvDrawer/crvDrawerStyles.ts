import type { SxProps, Theme } from '@mui/material/styles';
import { colors, spacing } from '../../tokens';

/** Figma crv-drawer fixed panel width (4497:77989). */
export const DRAWER_WIDTH = 320;

export function getDrawerPaperSx(anchor: 'left' | 'right' | 'top' | 'bottom'): SxProps<Theme> {
  const isHorizontal = anchor === 'left' || anchor === 'right';

  return {
    backgroundColor: colors.onSurface.default,
    boxShadow: 'none',
    border: 'none',
    ...(isHorizontal
      ? { width: DRAWER_WIDTH, maxWidth: '100%' }
      : { width: '100%', maxHeight: '85vh' }),
  };
}

/** Figma contentSlot — vertical stack, spacing/xl padding top & bottom. */
export function getContentSlotSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: '100%',
    minHeight: '100%',
    boxSizing: 'border-box',
    backgroundColor: colors.onSurface.default,
    paddingTop: `${spacing.xl}px`,
    paddingBottom: `${spacing.xl}px`,
  };
}
