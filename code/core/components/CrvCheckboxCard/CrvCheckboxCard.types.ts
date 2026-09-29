import type { CrvCheckboxBaseProps } from '../CrvCheckboxBase/CrvCheckboxBase.types';

export type CrvCheckboxCardColor = 'primary' | 'error';

export interface CrvCheckboxCardProps extends CrvCheckboxBaseProps {
  /** Figma `color` — `error` tints the whole card, not just the label */
  color?: CrvCheckboxCardColor;
  /** Figma `label` */
  label?: string;
  /** Figma `labelVisible` */
  labelVisible?: boolean;
  /** Figma `description` */
  description?: string;
  /** Figma `descriptionVisible` */
  descriptionVisible?: boolean;
}
