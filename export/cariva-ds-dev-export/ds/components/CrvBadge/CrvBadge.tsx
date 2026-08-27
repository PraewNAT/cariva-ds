'use client';

import { forwardRef } from 'react';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import { getBadgeSx } from './crvBadgeStyles';
import type { CrvBadgeProps } from './CrvBadge.types';

const hiddenAnchor = (
  <Box
    component="span"
    aria-hidden
    sx={{ display: 'inline-block', width: 0, height: 0, overflow: 'hidden' }}
  />
);

export const CrvBadge = forwardRef<HTMLSpanElement, CrvBadgeProps>(
  function CrvBadge(
    {
      variant = 'dot',
      color = 'primary',
      badgeContent = '1',
      children,
      overlap = 'rectangular',
      anchorOrigin = { vertical: 'top', horizontal: 'right' },
      sx,
      ...rest
    },
    ref,
  ) {
    const isDot = variant === 'dot';

    return (
      <Badge
        ref={ref}
        variant={variant}
        badgeContent={isDot ? '' : badgeContent}
        overlap={overlap}
        anchorOrigin={anchorOrigin}
        sx={[getBadgeSx(variant, color), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        {...rest}
      >
        {children ?? hiddenAnchor}
      </Badge>
    );
  },
);
