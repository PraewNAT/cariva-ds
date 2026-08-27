import type { ReactElement, ReactNode } from 'react';
import type { CrvAvatarSize } from '../CrvAvatar/CrvAvatar.types';

export type CrvAvatarGroupMax = 2 | 3 | 4 | 5;

export interface CrvAvatarGroupProps {
  /** Figma `size` — applied to every avatar in the group */
  size?: CrvAvatarSize;
  /** Figma `max` — total visible slots including +N overflow */
  max?: CrvAvatarGroupMax;
  children: ReactNode;
  className?: string;
}

export type CrvAvatarGroupChild = ReactElement;
