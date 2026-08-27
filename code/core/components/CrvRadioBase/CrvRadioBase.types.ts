import type { RadioProps } from '@mui/material/Radio';
import type { CrvRadioColor } from './crvRadioStyles';

export interface CrvRadioBaseProps
  extends Omit<RadioProps, 'color' | 'size' | 'icon' | 'checkedIcon'> {
  color?: CrvRadioColor;
}
