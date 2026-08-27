import type { CrvRadioBaseProps } from '../CrvRadioBase/CrvRadioBase.types';
import type { CrvRadioColor } from '../CrvRadioBase/crvRadioStyles';

export type CrvRadioType = 'default' | 'groupItem';
export type CrvRadioLabelPlacement = 'end' | 'start';

export interface CrvRadioProps extends CrvRadioBaseProps {
  type?: CrvRadioType;
  color?: CrvRadioColor;
  labelPlacement?: CrvRadioLabelPlacement;
  label?: string;
  labelVisible?: boolean;
  description?: string;
  descriptionVisible?: boolean;
}
