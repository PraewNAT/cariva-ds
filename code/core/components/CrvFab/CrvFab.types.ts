import type { FabProps as MuiFabProps } from '@mui/material/Fab';
import type { ReactNode } from 'react';

export type CrvFabColor = 'primary' | 'neutral';
export type CrvFabSize = 'small' | 'medium' | 'large';

export interface CrvFabProps
  extends Omit<MuiFabProps, 'color' | 'size' | 'children'> {
  color?: CrvFabColor;
  size?: CrvFabSize;
  /** Required for a11y — icon-only FAB must declare its action */
  'aria-label': string;
  children: ReactNode;
}
