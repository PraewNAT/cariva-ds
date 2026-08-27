import type { AutocompleteProps } from '@mui/material/Autocomplete';

export type CrvAutocompleteSize = 'small' | 'medium';

export interface CrvAutocompleteOption {
  value: string;
  label: string;
}

export interface CrvAutocompleteProps
  extends Omit<
    AutocompleteProps<CrvAutocompleteOption, false, false, false>,
    'size' | 'renderInput' | 'options' | 'getOptionLabel' | 'isOptionEqualToValue'
  > {
  /** Field size — maps to Figma `size` variant */
  size?: CrvAutocompleteSize;
  /** Primary label text above the field */
  label?: string;
  /** Placeholder when empty — Figma default: "Search or select..." */
  placeholder?: string;
  /** Options to search and select from */
  options: CrvAutocompleteOption[];
  /** Helper text below the field */
  helperText?: string;
  /** Show/hide helper text — Figma `helperTextVisible` */
  helperTextVisible?: boolean;
  /** Error state — Figma `error=true` variant */
  error?: boolean;
  /** Error message below the field */
  errorMessage?: string;
  /** Show/hide error message */
  errorMessageVisible?: boolean;
}
