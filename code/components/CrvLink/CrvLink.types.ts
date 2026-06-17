import type { LinkProps as MuiLinkProps } from '@mui/material/Link';
import type { ReactNode } from 'react';

export type CrvLinkSize = 'small' | 'medium' | 'large';

export interface CrvLinkProps extends Omit<MuiLinkProps, 'size' | 'underline'> {
  /** Size of the link — controls height and vertical padding */
  size?: CrvLinkSize;
  /** Disable the link — implemented via pointer-events:none + disabled color token */
  disabled?: boolean;
  /** Icon element to render before the label */
  startIcon?: ReactNode;
  /** Icon element to render after the label */
  endIcon?: ReactNode;
  children?: ReactNode;
}
