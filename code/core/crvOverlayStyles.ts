import type { SxProps, Theme } from '@mui/material/styles';
import { getCarivaColors } from './theme';

/**
 * Figma crv-overlay (Overlay section 4722:90374)
 * — crv-overlay/sm 4722:90600, crv-overlay/md+ 4722:90601
 */
export function getOverlayBackdropSx(theme?: Theme): SxProps<Theme> {
  const c = getCarivaColors(theme);
  return {
    backgroundColor: c.overlay.backdrop,
    opacity: 1,
  };
}

/** Plain styles for MUI `styleOverrides` (not a theme callback). */
export function getOverlayBackdropStyles(theme: Theme) {
  const c = getCarivaColors(theme);
  return {
    backgroundColor: c.overlay.backdrop,
    opacity: 1,
  };
}
