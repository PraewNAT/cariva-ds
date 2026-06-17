'use client';

import { forwardRef } from 'react';
import Avatar from '@mui/material/Avatar';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { colors } from '../../tokens';
import { CrvBadge } from '../CrvBadge';
import { getAvatarOnlineBadgeSx } from '../CrvBadge/crvBadgeStyles';
import { getAvatarSx, getIconSize } from './crvAvatarStyles';
import type { CrvAvatarProps } from './CrvAvatar.types';

export const CrvAvatar = forwardRef<HTMLSpanElement, CrvAvatarProps>(
  function CrvAvatar(
    {
      variant = 'circular',
      content = 'text',
      size = 'large',
      badge = false,
      initials = 'OP',
      src,
      alt,
      icon,
      sx,
      ...rest
    },
    ref,
  ) {
    const iconSizes = getIconSize(size);
    const resolvedIcon = icon ?? (
      <PersonOutlineIcon
        sx={{
          fontSize: iconSizes.glyph,
          color:    colors.content.primary,
        }}
      />
    );

    const avatar = (
      <Avatar
        ref={badge ? undefined : ref}
        variant={variant}
        src={content === 'image' ? src : undefined}
        alt={alt}
        sx={{
          ...getAvatarSx(size, content),
          ...sx,
        }}
        {...rest}
      >
        {content === 'text' && initials}
        {content === 'icon' && resolvedIcon}
      </Avatar>
    );

    if (!badge) {
      return avatar;
    }

    return (
      <CrvBadge
        ref={ref}
        variant="dot"
        color="success"
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        sx={getAvatarOnlineBadgeSx()}
      >
        {avatar}
      </CrvBadge>
    );
  },
);
