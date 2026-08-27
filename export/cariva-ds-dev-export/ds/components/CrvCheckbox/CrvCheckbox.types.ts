import type { CrvCheckboxBaseProps } from '../CrvCheckboxBase/CrvCheckboxBase.types';

export type CrvCheckboxType = 'default' | 'groupItem';
export type CrvCheckboxColor = 'primary' | 'error';
export type CrvCheckboxLabelPlacement = 'end' | 'start';

export interface CrvCheckboxProps extends CrvCheckboxBaseProps {
  /** Figma `type` */
  type?: CrvCheckboxType;
  /** Figma `color` — affects label/destructive styling */
  color?: CrvCheckboxColor;
  /** Figma `labelPlacement` */
  labelPlacement?: CrvCheckboxLabelPlacement;
  /** Figma `label` */
  label?: string;
  /** Figma `labelVisible` */
  labelVisible?: boolean;
  /** Figma `description` */
  description?: string;
  /** Figma `descriptionVisible` */
  descriptionVisible?: boolean;
}
