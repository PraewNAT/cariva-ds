import type { OutlinedInputProps } from '@mui/material/OutlinedInput';

export type CrvTextAreaSize = 'small' | 'medium';

export interface CrvTextAreaProps
  extends Omit<OutlinedInputProps, 'size' | 'error' | 'multiline' | 'rows' | 'minRows' | 'maxRows'> {
  /** Field size — maps to Figma `size` variant */
  size?: CrvTextAreaSize;
  /** Primary label text above the field */
  label?: string;
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
  /** Minimum visible rows — Figma default shows 4 lines */
  minRows?: number;
  /** Maximum rows before scrolling — maps to `filledScrollable` behavior */
  maxRows?: number;
}
