import type { HTMLAttributes } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvCircularProgressSize, CrvProgressColor } from '../../crvProgressStyles';

export type CrvCircularProgressVariant = 'determinate' | 'indeterminate';

export interface CrvCircularProgressProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'color'> {
  variant?: CrvCircularProgressVariant;
  size?: CrvCircularProgressSize;
  color?: CrvProgressColor;
  /** Progress value 0–100 — used when `variant="determinate"`. */
  value?: number;
  sx?: SxProps<Theme>;
}
