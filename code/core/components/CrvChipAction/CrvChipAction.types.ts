import type { ChipProps } from '@mui/material/Chip';

export type CrvChipActionSize = 'small' | 'medium';
export type CrvChipActionColor = 'default' | 'primary';
export type CrvChipActionVariant = 'filled' | 'outlined';

export interface CrvChipActionProps
  extends Omit<
    ChipProps,
    'color' | 'size' | 'variant' | 'label' | 'avatar' | 'deleteIcon' | 'onDelete'
  > {
  /** Figma `label` */
  label?: string;
  /** Figma `thumbnailVisible` — shows crv-avatar on the leading edge */
  thumbnailVisible?: boolean;
  /** Figma `deleteVisible` — shows cancel icon; requires `onDelete` when true */
  deleteVisible?: boolean;
  /** Figma `size` */
  size?: CrvChipActionSize;
  /** Figma `color` */
  color?: CrvChipActionColor;
  /** Figma `variant` */
  variant?: CrvChipActionVariant;
  /** Avatar initials when `thumbnailVisible` */
  thumbnailInitials?: string;
  onDelete?: ChipProps['onDelete'];
}
