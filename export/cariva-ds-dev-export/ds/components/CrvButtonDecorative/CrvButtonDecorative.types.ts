import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type { ReactNode } from 'react';

export type CrvButtonDecorativeSize = 'small' | 'medium' | 'large';

export interface CrvButtonDecorativeProps
  extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  size?: CrvButtonDecorativeSize;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
