'use client';

import { forwardRef } from 'react';
import MuiButton from '@mui/material/Button';
import { typography, productStyle, defaultProductStyle } from '../../tokens';
import { buttonSizing } from '../../theme/buttonSizing';
import {
  getCrvButtonDisabledSx,
  getCrvButtonElevatedSx,
  getCrvButtonOutlinedSx,
  getCrvButtonTextSx,
} from '../../theme/components/crvButton';
import type { CrvButtonProps } from './CrvButton.types';

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

    const metrics = buttonSizing[size];

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
            height: metrics.height,
            minHeight: metrics.height,
            paddingTop: `${metrics.paddingY}px`,
            paddingBottom: `${metrics.paddingY}px`,
            // Figma's outlined stroke sits outside the frame and takes no layout space;
            // a CSS border does, so give its 1px back from the side padding.
            paddingLeft: `${metrics.paddingX - (variant === 'outlined' ? 1 : 0)}px`,
            paddingRight: `${metrics.paddingX - (variant === 'outlined' ? 1 : 0)}px`,
            gap: `${metrics.gap}px`,
            '& .MuiSvgIcon-root': { fontSize: metrics.iconSize },
            // MUI puts its own margins on the icon slots (and an 18px icon on size=small);
            // `gap` above is the only icon↔label spacing Figma has.
            // Doubled class: MUI's slot styles load after ours at equal specificity.
            '& .MuiButton-startIcon.MuiButton-startIcon, & .MuiButton-endIcon.MuiButton-endIcon': { margin: 0 },
            '& .MuiButton-startIcon.MuiButton-startIcon > *:nth-of-type(1), & .MuiButton-endIcon.MuiButton-endIcon > *:nth-of-type(1)': {
              fontSize: metrics.iconSize,
            },
            borderRadius: `${productStyle[defaultProductStyle].interactive}px`,
            textTransform: 'none',
            fontSize: `${typography.fontSize.label[metrics.label]}px`,
            lineHeight: `${typography.lineHeight.label[metrics.label]}px`,
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
