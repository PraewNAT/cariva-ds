'use client';

import { forwardRef } from 'react';
import MuiIconButton from '@mui/material/IconButton';
import { colors, productStyle, defaultProductStyle } from '../../tokens';
import type {
  CrvButtonIconColor,
  CrvButtonIconProps,
  CrvButtonIconSize,
  CrvButtonIconVariant,
} from './CrvButtonIcon.types';

const SIZE_BY_SIZE: Record<CrvButtonIconSize, number> = {
  small: 32,
  medium: 40,
  large: 48,
};

const ICON_SIZE_BY_SIZE: Record<CrvButtonIconSize, number> = {
  small: 20,
  medium: 20,
  large: 24,
};

type State = 'default' | 'hover' | 'pressed';

/**
 * Sourced from Figma variant set crv-button-icon (3730:5246).
 * All 24 combinations (variant × color × state) verified 2026-06-15.
 */

function bgFor(
  variant: CrvButtonIconVariant,
  color: CrvButtonIconColor,
  state: State,
): string {
  // Contained = filled surface, deepens on hover/pressed
  if (variant === 'contained') {
    const palette =
      color === 'primary'
        ? colors.brand.primary.onSurface
        : colors.status.error.onSurface;
    return palette[state];
  }

  // Outlined + Ghost: default = transparent, both gain tinted bg on hover/pressed
  if (state === 'default') return 'transparent';

  if (variant === 'outlined') {
    // Outlined hover/pressed: neutral tint for primary, error tint for error
    if (color === 'primary') {
      return state === 'hover'
        ? colors.onSurface.action.hover // slate/100
        : colors.onSurface.action.pressed; // slate/200
    }
    return state === 'hover'
      ? colors.status.error.onSurface.subtle // red/50
      : colors.status.error.onSurface.muted; // red/100
  }

  // Ghost hover/pressed: matches color tint
  if (color === 'primary') {
    return state === 'hover'
      ? colors.brand.primary.onSurface.subtle // blue/50
      : colors.brand.primary.onSurface.muted; // blue/100
  }
  return state === 'hover'
    ? colors.status.error.onSurface.subtle // red/50
    : colors.status.error.onSurface.muted; // red/100
}

function iconColorFor(
  variant: CrvButtonIconVariant,
  color: CrvButtonIconColor,
  state: State,
): string {
  // Contained: always white on filled surface
  if (variant === 'contained') return colors.content.onBrand;

  // Outlined: primary icon = neutral slate, error icon = red (darker on pressed)
  if (variant === 'outlined') {
    if (color === 'primary') return colors.content.secondary; // slate/700 all states
    return state === 'pressed'
      ? colors.status.error.content.strong // red/700
      : colors.status.error.content.default; // red/600
  }

  // Ghost: primary icon = brand blue, error icon = red (darker on pressed)
  if (color === 'primary') return colors.brand.primary.content.default; // blue/600
  return state === 'pressed'
    ? colors.status.error.content.strong
    : colors.status.error.content.default;
}

function borderFor(color: CrvButtonIconColor): string {
  return color === 'error' ? colors.border.error : colors.border.default;
}

export const CrvButtonIcon = forwardRef<HTMLButtonElement, CrvButtonIconProps>(
  function CrvButtonIcon(
    {
      variant = 'contained',
      color = 'primary',
      size = 'medium',
      disabled,
      children,
      sx,
      ...rest
    },
    ref,
  ) {
    const dim = SIZE_BY_SIZE[size];
    const iconSize = ICON_SIZE_BY_SIZE[size];
    const isOutlined = variant === 'outlined';

    return (
      <MuiIconButton
        ref={ref}
        disabled={disabled}
        sx={{
          width: dim,
          height: dim,
          padding: 0,
          borderRadius: `${productStyle[defaultProductStyle].interactive}px`,
          backgroundColor: bgFor(variant, color, 'default'),
          color: iconColorFor(variant, color, 'default'),
          border: isOutlined ? `1px solid ${borderFor(color)}` : 'none',
          '&:hover': {
            backgroundColor: bgFor(variant, color, 'hover'),
            color: iconColorFor(variant, color, 'hover'),
            border: 'none',
          },
          '&:active': {
            backgroundColor: bgFor(variant, color, 'pressed'),
            color: iconColorFor(variant, color, 'pressed'),
            border: 'none',
          },
          '&.Mui-disabled': {
            backgroundColor: `${colors.onSurface.action.disabled} !important`,
            color: `${colors.content.disabled} !important`,
            border: 'none !important',
          },
          '& > svg': {
            width: iconSize,
            height: iconSize,
          },
          ...sx,
        }}
        {...rest}
      >
        {children}
      </MuiIconButton>
    );
  },
);
