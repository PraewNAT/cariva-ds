import type { IconButtonProps as MuiIconButtonProps } from '@mui/material/IconButton';
import type { ReactNode } from 'react';

export type CrvButtonIconVariant = 'contained' | 'outlined' | 'ghost';
export type CrvButtonIconColor = 'primary' | 'error';
export type CrvButtonIconSize = 'small' | 'medium' | 'large';

export interface CrvButtonIconProps
  extends Omit<MuiIconButtonProps, 'color' | 'size' | 'children'> {
  variant?: CrvButtonIconVariant;
  color?: CrvButtonIconColor;
  size?: CrvButtonIconSize;
  /** Required for a11y — icon-only buttons must declare their action */
  'aria-label': string;
  children: ReactNode;
}
