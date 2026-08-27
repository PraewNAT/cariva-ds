import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvRadioColor } from '../CrvRadioBase/crvRadioStyles';

export interface CrvRadioGroupOption {
  value: string;
  label: string;
  disabled?: boolean;
  visible?: boolean;
}

export interface CrvRadioGroupProps {
  color?: CrvRadioColor;
  disabled?: boolean;
  label?: string;
  labelVisible?: boolean;
  description?: string;
  descriptionVisible?: boolean;
  errorMessage?: string;
  errorMessageVisible?: boolean;
  options?: CrvRadioGroupOption[];
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  name?: string;
  className?: string;
  sx?: SxProps<Theme>;
}
