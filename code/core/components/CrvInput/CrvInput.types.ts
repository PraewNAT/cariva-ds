import type { OutlinedInputProps } from '@mui/material/OutlinedInput';
import type { ReactNode } from 'react';

export type CrvInputSize = 'small' | 'medium';

export interface CrvInputProps
  extends Omit<OutlinedInputProps, 'size' | 'error' | 'startAdornment'> {
  /** Field size — maps to Figma `size` variant */
  size?: CrvInputSize;
  /** Primary label text above the field */
  label?: string;
  /** Show/hide primary label — Figma `labelVisible` */
  labelVisible?: boolean;
  /** Secondary label text, e.g. "optional" */
  secondaryLabel?: string;
  /** Show/hide secondary label — Figma `secondaryLabelVisible` */
  secondaryLabelVisible?: boolean;
  /** Helper text below the field */
  helperText?: string;
  /** Show/hide helper text — Figma `helperTextVisible` */
  helperTextVisible?: boolean;
  /** Error state — Figma `state=error` */
  error?: boolean;
  /** Error message below the field — required when `error` is true */
  errorMessage?: string;
  /** Leading icon or prefix — Figma `startAdornment` instance swap */
  startAdornment?: ReactNode;
  /** Show/hide leading adornment — Figma `startAdornmentVisible`. Omit to infer from `startAdornment`. */
  startAdornmentVisible?: boolean;
}
