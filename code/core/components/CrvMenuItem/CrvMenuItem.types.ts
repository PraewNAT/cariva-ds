import type { MenuItemProps } from '@mui/material/MenuItem';
import type { ReactNode } from 'react';

export type CrvMenuItemVariant = 'default' | 'checkbox';

export interface CrvMenuItemProps extends Omit<MenuItemProps, 'children'> {
  /** Item label */
  children: ReactNode;
  /** Figma `variant` — default row or checkbox row */
  variant?: CrvMenuItemVariant;
  /** Figma `closeLefticon` — show left icon slot */
  leftIconVisible?: boolean;
  /** Figma `closeRighticon` — show right icon slot */
  rightIconVisible?: boolean;
  /** Custom left icon — Figma `leftIcon` swap */
  leftIcon?: ReactNode;
  /** Custom right icon — Figma `rightIcon` swap */
  rightIcon?: ReactNode;
}
