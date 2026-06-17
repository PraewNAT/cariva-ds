import type { AvatarProps } from '@mui/material/Avatar';
import type { ReactNode } from 'react';

export type CrvAvatarVariant = 'circular';
export type CrvAvatarContent = 'image' | 'text' | 'icon';
export type CrvAvatarSize = 'large' | 'medium' | 'small' | 'xSmall';

export interface CrvAvatarProps
  extends Omit<AvatarProps, 'children' | 'variant' | 'sizes'> {
  /** Figma `variant` — circular only */
  variant?: CrvAvatarVariant;
  /** Figma `content` */
  content?: CrvAvatarContent;
  /** Figma `size` */
  size?: CrvAvatarSize;
  /** Figma `badge` — online indicator */
  badge?: boolean;
  /** Figma `initials` — used when content=text */
  initials?: string;
  /** Profile image URL — used when content=image */
  src?: string;
  alt?: string;
  /** Custom icon — used when content=icon */
  icon?: ReactNode;
}
