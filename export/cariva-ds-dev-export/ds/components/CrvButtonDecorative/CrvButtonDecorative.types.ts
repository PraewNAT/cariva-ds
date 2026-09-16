import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type { ReactNode } from 'react';

export type CrvButtonDecorativeSize = 'small' | 'medium' | 'large';

export interface CrvButtonDecorativeProps
  extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  size?: CrvButtonDecorativeSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
  /**
   * Drifting aurora behind the label. On by default; `false` leaves the static
   * Figma gradient. Motion is skipped automatically under
   * `prefers-reduced-motion`, so this is for editorial choices — a dense toolbar,
   * a row of several decorative buttons — not for accessibility.
   */
  animated?: boolean;
}
