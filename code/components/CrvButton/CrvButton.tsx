'use client';

import { forwardRef } from 'react';
import MuiButton from '@mui/material/Button';
import { colors, spacing, typography, productStyle, defaultProductStyle } from '../../tokens';
import type { CrvButtonProps, CrvButtonSize } from './CrvButton.types';

const HEIGHT_BY_SIZE: Record<CrvButtonSize, number> = {
  small: 32,
  medium: 40,
  large: 48,
};

const PADDING_V_BY_SIZE: Record<CrvButtonSize, number> = {
  small: spacing.xs,
  medium: spacing.sm,
  large: spacing.md,
};

export const CrvButton = forwardRef<HTMLButtonElement, CrvButtonProps>(
  function CrvButton(
    {
      variant = 'contained',
      color = 'primary',
      size = 'medium',
      loading = false,
      startIcon,
      endIcon,
      children,
      sx,
      ...rest
    },
    ref,
  ) {
    return (
      <MuiButton
        ref={ref}
        variant={variant}
        color={color}
        size={size}
        loading={loading}
        loadingPosition="start"
        startIcon={loading ? undefined : startIcon}
        endIcon={loading ? undefined : endIcon}
        sx={{
          height: HEIGHT_BY_SIZE[size],
          minHeight: HEIGHT_BY_SIZE[size],
          paddingTop: `${PADDING_V_BY_SIZE[size]}px`,
          paddingBottom: `${PADDING_V_BY_SIZE[size]}px`,
          paddingLeft: `${spacing.lg}px`,
          paddingRight: `${spacing.lg}px`,
          gap: `${spacing.sm}px`,
          borderRadius: `${productStyle[defaultProductStyle].interactive}px`,
          textTransform: 'none',
          // Typography — Figma uses label/large (16/24) for ALL sizes
          fontSize: `${typography.fontSize.label.large}px`,
          lineHeight: `${typography.lineHeight.label.large}px`,
          fontWeight: typography.fontWeight.medium,
          fontFamily: typography.fontFamily.sans,
          // Disabled — explicit override to match Figma tokens.
          // Figma: contained + outlined disabled both fill slate/100 (no border on outlined).
          // Text disabled stays transparent. All labels use content/disabled.
          '&.Mui-disabled, &:disabled': {
            backgroundColor:
              variant === 'text'
                ? 'transparent !important'
                : `${colors.onSurface.action.disabled} !important`,
            color: `${colors.content.disabled} !important`,
            border: 'none !important',
          },
          ...sx,
        }}
        {...rest}
      >
        {children}
      </MuiButton>
    );
  },
);
