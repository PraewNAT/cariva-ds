'use client';

import { forwardRef } from 'react';
import MuiIconButton from '@mui/material/IconButton';
import { useTheme } from '@mui/material/styles';
import type { Theme } from '@mui/material/styles';
import { productStyle, defaultProductStyle } from '../../tokens';
import { getCarivaColors } from '../../theme';
import { getCrvButtonIconOutlinedTokens } from '../CrvButton/crvButtonStyles';
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

function bgFor(
  variant: CrvButtonIconVariant,
  color: CrvButtonIconColor,
  state: State,
  theme: Theme,
): string {
  const colors = getCarivaColors(theme);

  if (variant === 'contained') {
    const palette =
      color === 'primary'
        ? colors.brand.primary.onSurface
        : colors.status.error.onSurface;
    return palette[state];
  }

  if (state === 'default') return 'transparent';

  if (variant === 'outlined') {
    const tokens = getCrvButtonIconOutlinedTokens(color, theme);
    if (state === 'hover') return tokens.hoverBg;
    return tokens.pressedBg;
  }

  if (color === 'primary') {
    return state === 'hover'
      ? colors.brand.primary.onSurface.subtle
      : colors.brand.primary.onSurface.muted;
  }
  return state === 'hover'
    ? colors.status.error.onSurface.subtle
    : colors.status.error.onSurface.muted;
}

function iconColorFor(
  variant: CrvButtonIconVariant,
  color: CrvButtonIconColor,
  state: State,
  theme: Theme,
): string {
  const colors = getCarivaColors(theme);

  if (variant === 'contained') return colors.content.onBrand;

  if (variant === 'outlined') {
    const tokens = getCrvButtonIconOutlinedTokens(color, theme);
    if (color === 'primary') return tokens.color;
    return state === 'pressed' ? tokens.pressedColor : tokens.color;
  }

  if (color === 'primary') return colors.brand.primary.content.default;
  return state === 'pressed'
    ? colors.status.error.content.strong
    : colors.status.error.content.default;
}

function borderFor(
  variant: CrvButtonIconVariant,
  color: CrvButtonIconColor,
  theme: Theme,
): string {
  if (variant !== 'outlined') return 'transparent';
  return getCrvButtonIconOutlinedTokens(color, theme).borderColor;
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
    const theme = useTheme();
    const colors = getCarivaColors(theme);
    const dim = SIZE_BY_SIZE[size];
    const iconSize = ICON_SIZE_BY_SIZE[size];
    const isOutlined = variant === 'outlined';
    const outlinedBorder = isOutlined ? `1px solid ${borderFor(variant, color, theme)}` : 'none';

    return (
      <MuiIconButton
        ref={ref}
        disabled={disabled}
        sx={{
          width: dim,
          height: dim,
          padding: 0,
          borderRadius: `${productStyle[defaultProductStyle].interactive}px`,
          backgroundColor: bgFor(variant, color, 'default', theme),
          color: iconColorFor(variant, color, 'default', theme),
          border: outlinedBorder,
          '&:hover': {
            backgroundColor: bgFor(variant, color, 'hover', theme),
            color: iconColorFor(variant, color, 'hover', theme),
            border: isOutlined ? outlinedBorder : 'none',
          },
          '&:active': {
            backgroundColor: bgFor(variant, color, 'pressed', theme),
            color: iconColorFor(variant, color, 'pressed', theme),
            border: isOutlined ? outlinedBorder : 'none',
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
