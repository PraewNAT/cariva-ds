'use client';

import {
  Children,
  cloneElement,
  isValidElement,
} from 'react';
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { colors, radius, typography } from '../../tokens';
import {
  AVATAR_SIZE_PX,
  getGroupOverlapPx,
  getSurplusTypography,
  GROUP_BORDER_PX,
} from '../CrvAvatar/crvAvatarStyles';
import type { CrvAvatarProps } from '../CrvAvatar/CrvAvatar.types';
import type { CrvAvatarGroupProps } from './CrvAvatarGroup.types';

// Ground truth from Figma (crv-avatar-group, node 4457:63950)
export function CrvAvatarGroup({
  size = 'large',
  max = 2,
  children,
  className,
}: CrvAvatarGroupProps) {
  const items = Children.toArray(children).filter(isValidElement) as React.ReactElement<CrvAvatarProps>[];
  const avatarSlots = max - 1;
  const visibleItems = items.slice(0, avatarSlots);
  const surplus = Math.max(items.length - avatarSlots, 0);
  const overlap = getGroupOverlapPx(size);
  const dimension = AVATAR_SIZE_PX[size];
  const surplusTypography = getSurplusTypography(size);

  return (
    <Box
      className={className}
      sx={{
        display:    'inline-flex',
        alignItems: 'center',
      }}
    >
      {visibleItems.map((child, index) => (
        <Box
          key={child.key ?? index}
          sx={{
            ml:     index === 0 ? 0 : `${overlap}px`,
            zIndex: visibleItems.length - index,
            '& .MuiAvatar-root': {
              border: `${GROUP_BORDER_PX}px solid ${colors.onSurface.default}`,
              boxSizing: 'border-box',
            },
          }}
        >
          {cloneElement(child, {
            size,
            badge: false,
          })}
        </Box>
      ))}

      {surplus > 0 && (
        <Box
          sx={{
            ml:     visibleItems.length === 0 ? 0 : `${overlap}px`,
            zIndex: 0,
          }}
        >
          <Avatar
            sx={{
              width: dimension,
              height: dimension,
              borderRadius: `${radius.full}px`,
              backgroundColor: colors.onSurface.action.selected,
              border: `${GROUP_BORDER_PX}px solid ${colors.onSurface.default}`,
              boxSizing: 'border-box',
              fontFamily: typography.fontFamily.sans,
              fontWeight: typography.fontWeight.medium,
              color: colors.content.secondary,
              ...surplusTypography,
            }}
          >
            +{surplus}
          </Avatar>
        </Box>
      )}
    </Box>
  );
}
