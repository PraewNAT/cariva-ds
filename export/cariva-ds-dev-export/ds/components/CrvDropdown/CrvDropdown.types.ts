import type { SelectProps } from '@mui/material/Select';

export type CrvDropdownSize = 'small' | 'medium';

export interface CrvDropdownOption {
  value: string;
  label: string;
}

export interface CrvDropdownProps
  extends Omit<SelectProps<string>, 'size' | 'error' | 'variant' | 'children'> {
  /** Field size — maps to Figma `size` variant */
  size?: CrvDropdownSize;
  /** Primary label text above the field */
  label?: string;
  /** Show/hide label — Figma `labelVisible` */
  labelVisible?: boolean;
  /** Placeholder when no value selected — Figma `content` default */
  placeholder?: string;
  /** Options to choose from */
  options: CrvDropdownOption[];
  /** Helper text below the field */
  helperText?: string;
  /** Show/hide helper text — Figma `helperTextVisible` */
  helperTextVisible?: boolean;
  /** Error state — Figma `error=true` variant */
  error?: boolean;
  /** Error message below the field */
  errorMessage?: string;
  /** Show/hide error message — Figma `errorMessageVisible` */
  errorMessageVisible?: boolean;
}
