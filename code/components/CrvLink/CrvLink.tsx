'use client';

import { forwardRef } from 'react';
import MuiLink from '@mui/material/Link';
import Box from '@mui/material/Box';
import { colors, spacing, typography } from '../../tokens';
import type { CrvLinkProps, CrvLinkSize } from './CrvLink.types';

// Ground truth from Figma (crv-link component set, node 4165:5267)
// All sizes share fontSize=16/lineHeight=24/fontWeight=500 (label/large)
// Underline: always present (styleOverrideTable confirms UNDERLINE across all size×state)
// Background: transparent in all states
// Heights per Figma measured bounding boxes:
const HEIGHT_BY_SIZE: Record<CrvLinkSize, number> = {
  small:  32,
  medium: 40,
  large:  48,
};

const PADDING_V_BY_SIZE: Record<CrvLinkSize, number> = {
  small:  spacing.xs,   // 4px
  medium: spacing.sm,   // 8px
  large:  spacing.md,   // 12px
};

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
    return (
      <MuiLink
        ref={ref}
        underline="always"
        onClick={disabled ? undefined : onClick}
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : undefined}
        sx={{
          display:        'inline-flex',
          alignItems:     'center',
          gap:            `${spacing.sm}px`,
          height:         HEIGHT_BY_SIZE[size],
          minHeight:      HEIGHT_BY_SIZE[size],
          paddingTop:     `${PADDING_V_BY_SIZE[size]}px`,
          paddingBottom:  `${PADDING_V_BY_SIZE[size]}px`,
          // Typography — Figma uses label/large (16/24/500) for ALL sizes
          fontSize:       `${typography.fontSize.label.large}px`,
          lineHeight:     `${typography.lineHeight.label.large}px`,
          fontWeight:     typography.fontWeight.medium,
          fontFamily:     typography.fontFamily.sans,
          // Color per state — disabled overrides via inline, hover/pressed via pseudo
          color: disabled
            ? `${colors.content.disabled} !important`
            : colors.content.link.default,
          '&:hover': disabled
            ? {}
            : { color: colors.content.link.hover },
          '&:active': disabled
            ? {}
            : { color: colors.content.link.pressed },
          // Disabled interaction
          pointerEvents: disabled ? 'none' : undefined,
          cursor:        disabled ? 'not-allowed' : 'pointer',
          // Underline color follows text color
          textDecorationColor: 'currentColor',
          ...sx,
        }}
        {...rest}
      >
        {startIcon && (
          <Box
            component="span"
            sx={{
              display:    'inline-flex',
              alignItems: 'center',
              width:      20,
              height:     20,
              flexShrink: 0,
              color:      'inherit',
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
              display:    'inline-flex',
              alignItems: 'center',
              width:      20,
              height:     20,
              flexShrink: 0,
              color:      'inherit',
            }}
          >
            {endIcon}
          </Box>
        )}
      </MuiLink>
    );
  },
);
