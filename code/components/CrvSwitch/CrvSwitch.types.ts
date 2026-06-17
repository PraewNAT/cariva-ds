import type { ChangeEvent, InputHTMLAttributes } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvSwitchColor } from '../CrvSwitchBase/crvSwitchStyles';

export interface CrvSwitchProps {
  color?: CrvSwitchColor;
  labelPlacement?: 'end' | 'start';
  label?: string;
  labelVisible?: boolean;
  description?: string;
  descriptionVisible?: boolean;
  checked?: boolean;
  defaultChecked?: boolean;
  disabled?: boolean;
  id?: string;
  name?: string;
  value?: string;
  onChange?: (event: ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  inputProps?: InputHTMLAttributes<HTMLInputElement>;
  className?: string;
  sx?: SxProps<Theme>;
}
