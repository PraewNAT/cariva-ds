'use client';

import { forwardRef } from 'react';
import MuiButton from '@mui/material/Button';
import { spacing, typography, productStyle, defaultProductStyle } from '../../tokens';
import {
  getCrvButtonDisabledSx,
  getCrvButtonElevatedSx,
  getCrvButtonOutlinedSx,
  getCrvButtonTextSx,
} from '../../theme/components/crvButton';
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
    // `elevated` and `neutral` are DS-only — MUI has no such variant or palette
    // entry, so they render on a neutral MUI base and take their look from sx.
    const muiVariant = variant === 'elevated' ? 'text' : variant;
    const muiColor = color === 'neutral' ? 'primary' : color;

    return (
      <MuiButton
        ref={ref}
        variant={muiVariant}
        color={muiColor}
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
            fontFamily: typography.fontFamily.ui,
          },
          getCrvButtonDisabledSx(variant === 'elevated' ? 'contained' : variant),
          variant === 'outlined' ? getCrvButtonOutlinedSx(color) : {},
          variant === 'text' && color === 'neutral' ? getCrvButtonTextSx(color) : {},
          variant === 'elevated' ? getCrvButtonElevatedSx(color) : {},
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      >
        {children}
      </MuiButton>
    );
  },
);
