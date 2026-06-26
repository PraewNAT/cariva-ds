import type { CheckboxProps } from '@mui/material/Checkbox';
import type { CrvCheckboxColor } from './crvCheckboxStyles';

export interface CrvCheckboxBaseProps
  extends Omit<CheckboxProps, 'color' | 'size' | 'icon' | 'checkedIcon' | 'indeterminateIcon'> {
  /** Unchecked border styling — `error` uses border/error */
  color?: CrvCheckboxColor;
}
