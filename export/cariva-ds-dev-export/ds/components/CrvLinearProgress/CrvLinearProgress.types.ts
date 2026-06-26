import type { LinearProgressProps } from '@mui/material/LinearProgress';
import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvProgressColor } from '../../crvProgressStyles';

export type CrvLinearProgressVariant = 'determinate' | 'indeterminate' | 'buffer';

export interface CrvLinearProgressProps
  extends Omit<LinearProgressProps, 'color' | 'variant'> {
  variant?: CrvLinearProgressVariant;
  color?: CrvProgressColor;
  sx?: SxProps<Theme>;
}
