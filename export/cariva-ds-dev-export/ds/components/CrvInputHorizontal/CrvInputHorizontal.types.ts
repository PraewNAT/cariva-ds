import type { OutlinedInputProps } from '@mui/material/OutlinedInput';
import type { ReactNode } from 'react';

export type CrvInputHorizontalSize = 'small' | 'medium';

export interface CrvInputHorizontalProps
  extends Omit<OutlinedInputProps, 'size' | 'error' | 'startAdornment'> {
  /** Field size — maps to Figma `size` variant */
  size?: CrvInputHorizontalSize;
  /** Label text on the left — fixed-width column in horizontal layout */
  label: string;
  /** Fixed label column width (px) — keep consistent within a form group */
  labelWidth?: number;
  /** Helper text below the field (aligned with field column) */
  helperText?: string;
  /** Show/hide helper text — Figma `helperTextVisible` */
  helperTextVisible?: boolean;
  /** Error state — Figma `state=error` */
  error?: boolean;
  /** Error message below the field — required when `error` is true */
  errorMessage?: string;
  /** Leading icon inside the field — Figma `startAdornment` instance swap */
  startAdornment?: ReactNode;
  /** Show/hide leading adornment — omit to infer from `startAdornment` */
  startAdornmentVisible?: boolean;
}
