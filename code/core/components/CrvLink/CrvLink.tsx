'use client';

import { forwardRef } from 'react';
import MuiLink from '@mui/material/Link';
import Box from '@mui/material/Box';
import { getCrvLinkSx } from '../../theme/components/crvLink';
import { buttonSizing } from '../../theme/buttonSizing';
import type { CrvLinkProps } from './CrvLink.types';

export const CrvLink = forwardRef<HTMLAnchorElement, CrvLinkProps>(
  function CrvLink(
    {
      size = 'medium',
      disabled = false,
      startIcon,
      endIcon,
      children,
      onClick,
      sx,
      ...rest
    },
    ref,
  ) {
    const { iconSize } = buttonSizing[size];

    return (
      <MuiLink
        ref={ref}
        underline="always"
        onClick={disabled ? undefined : onClick}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        sx={[getCrvLinkSx(size, disabled), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        {...rest}
      >
        {startIcon && (
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              width: iconSize,
              height: iconSize,
              flexShrink: 0,
              color: 'inherit',
            }}
          >
            {startIcon}
          </Box>
        )}
        {children}
        {endIcon && (
          <Box
            component="span"
            sx={{
              display: 'inline-flex',
              alignItems: 'center',
              width: iconSize,
              height: iconSize,
              flexShrink: 0,
              color: 'inherit',
            }}
          >
            {endIcon}
          </Box>
        )}
      </MuiLink>
    );
  },
);
