'use client';

import { forwardRef } from 'react';
import MuiButton from '@mui/material/Button';
import { spacing, typography, productStyle, defaultProductStyle } from '../../tokens';
import { getCrvButtonOutlinedSx, getCrvButtonDisabledSx } from './crvButtonStyles';
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
        sx={[
          {
            height: HEIGHT_BY_SIZE[size],
            minHeight: HEIGHT_BY_SIZE[size],
            paddingTop: `${PADDING_V_BY_SIZE[size]}px`,
            paddingBottom: `${PADDING_V_BY_SIZE[size]}px`,
            paddingLeft: `${spacing.lg}px`,
            paddingRight: `${spacing.lg}px`,
            gap: `${spacing.sm}px`,
            borderRadius: `${productStyle[defaultProductStyle].interactive}px`,
            textTransform: 'none',
            fontSize: `${typography.fontSize.label.large}px`,
            lineHeight: `${typography.lineHeight.label.large}px`,
            fontWeight: typography.fontWeight.medium,
            fontFamily: typography.fontFamily.sans,
          },
          getCrvButtonDisabledSx(variant),
          variant === 'outlined' ? getCrvButtonOutlinedSx(color) : {},
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      >
        {children}
      </MuiButton>
    );
  },
);
