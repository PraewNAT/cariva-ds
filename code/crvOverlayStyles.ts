import type { SxProps, Theme } from '@mui/material/styles';
import { colors } from './tokens';

/**
 * Figma crv-overlay (Overlay section 4722:90374)
 * — crv-overlay/sm 4722:90600, crv-overlay/md+ 4722:90601
 * Fill: color/overlay/backdrop (VariableID 3714:93) — black @ 40% opacity.
 *
 * Use for every blocking overlay: Modal, Drawer, Bottom Sheet.
 * MUI Backdrop default is rgba(0,0,0,0.5) — always override with this token.
 */
export function getOverlayBackdropSx(): SxProps<Theme> {
  return {
    backgroundColor: colors.overlay.backdrop,
    opacity: 1,
  };
}
