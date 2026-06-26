import type { DialogProps } from '@mui/material/Dialog';
import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export type CrvModalType = 'default' | 'alignCenter';
export type CrvModalBreakpoint = 'sm' | 'md+';

export interface CrvModalProps extends Omit<DialogProps, 'title'> {
  type?: CrvModalType;
  breakpoint?: CrvModalBreakpoint;
  title?: ReactNode;
  description?: ReactNode;
  showContent?: boolean;
  showDescription?: boolean;
  showIcon?: boolean;
  showCTA?: boolean;
  icon?: ReactNode;
  iconContainerSx?: SxProps<Theme>;
  actions?: ReactNode;
}
