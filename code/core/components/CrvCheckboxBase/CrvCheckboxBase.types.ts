import type { CheckboxProps } from '@mui/material/Checkbox';
import type { CrvCheckboxColor } from './crvCheckboxStyles';

export interface CrvCheckboxBaseProps
  extends Omit<CheckboxProps, 'color' | 'size' | 'icon' | 'checkedIcon' | 'indeterminateIcon'> {
  /**
   * Figma `color` — `error` recolours the whole control, not just the border:
   * unchecked `status/error/border/strong`, checked and indeterminate
   * `status/error/on-surface/default`, hover/focus `border/error` and
   * `status/error/on-surface/pressed`. Ignored while `disabled`.
   */
  color?: CrvCheckboxColor;
}
