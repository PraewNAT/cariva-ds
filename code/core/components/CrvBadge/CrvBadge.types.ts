import type { BadgeProps } from '@mui/material/Badge';
import type { ReactNode } from 'react';

export type CrvBadgeVariant = 'dot' | 'standard';
export type CrvBadgeColor =
  | 'primary'
  | 'error'
  | 'success'
  | 'warning'
  | 'info'
  | 'default';

export interface CrvBadgeProps
  extends Omit<BadgeProps, 'variant' | 'color' | 'badgeContent' | 'children'> {
  /** Figma `variant` */
  variant?: CrvBadgeVariant;
  /** Figma `color` */
  color?: CrvBadgeColor;
  /** Figma `badgeContent` — shown in standard variant */
  badgeContent?: ReactNode;
  /** Anchor element the badge overlays */
  children?: ReactNode;
  /**
   * Use `circular` when wrapping round avatars so the badge hugs the circle edge.
   * Icons/buttons use `rectangular` (default).
   */
  overlap?: 'rectangular' | 'circular';
}
