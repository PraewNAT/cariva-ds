import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvCheckboxColor } from '../CrvCheckboxBase/crvCheckboxStyles';

export interface CrvCheckboxGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
  visible?: boolean;
}

export interface CrvCheckboxGroupProps {
  /** Figma `color` */
  color?: CrvCheckboxColor;
  /** Figma `disabled` */
  disabled?: boolean;
  /** Figma `label` */
  label?: string;
  /** Figma `labelVisible` */
  labelVisible?: boolean;
  /** Figma `description` */
  description?: string;
  /** Figma `descriptionVisible` */
  descriptionVisible?: boolean;
  /** Figma `errorMessage` */
  errorMessage?: string;
  /** Figma `errorMessageVisible` */
  errorMessageVisible?: boolean;
  /** Checkbox options — maps to Checkbox 01–06 in Figma */
  options?: CrvCheckboxGroupOption[];
  /** Selected option values */
  value?: string[];
  /** Uncontrolled initial selection */
  defaultValue?: string[];
  onChange?: (value: string[]) => void;
  name?: string;
  className?: string;
  sx?: SxProps<Theme>;
}
