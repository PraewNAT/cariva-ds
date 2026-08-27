import type { DrawerProps } from '@mui/material/Drawer';
import type { SxProps, Theme } from '@mui/material/styles';
import type { ReactNode } from 'react';

export interface CrvDrawerProps extends Omit<DrawerProps, 'children'> {
  /** Panel content — Figma `contentSlot`. */
  children?: ReactNode;
  /** Override styles on the drawer paper surface. */
  paperSx?: SxProps<Theme>;
}
