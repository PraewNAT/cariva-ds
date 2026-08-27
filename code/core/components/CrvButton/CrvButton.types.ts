import type { ButtonProps as MuiButtonProps } from '@mui/material/Button';
import type { ReactNode } from 'react';

export type CrvButtonVariant = 'contained' | 'outlined' | 'text';
export type CrvButtonColor = 'primary' | 'error';
export type CrvButtonSize = 'small' | 'medium' | 'large';

export interface CrvButtonProps
  extends Omit<MuiButtonProps, 'variant' | 'color' | 'size'> {
  variant?: CrvButtonVariant;
  color?: CrvButtonColor;
  size?: CrvButtonSize;
  loading?: boolean;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}
