'use client';

import { forwardRef } from 'react';
import MuiFab from '@mui/material/Fab';
import { colors, radius } from '../../tokens';
import type { CrvFabColor, CrvFabProps, CrvFabSize } from './CrvFab.types';

const SIZE_BY_SIZE: Record<CrvFabSize, number> = {
  small:  40,
  medium: 56,
  large:  64,
};

const ICON_SIZE_BY_SIZE: Record<CrvFabSize, number> = {
  small:  20,
  medium: 24,
  large:  28,
};

type State = 'default' | 'hover' | 'pressed';

/**
 * Sourced from Figma variant set crv-fab (4497:77574).
 * 24 combinations (size × color × state) verified 2026-06-15.
 */

function bgFor(color: CrvFabColor, state: State): string {
  if (color === 'primary') {
    const palette = colors.brand.primary.onSurface;
    return palette[state];
  }

  if (state === 'default') return colors.onSurface.default;
  return colors.onSurface.action[state];
}

function iconColorFor(color: CrvFabColor, disabled: boolean): string {
  if (disabled) return colors.content.disabled;
  return color === 'primary' ? colors.content.onBrand : colors.content.primary;
}

function borderFor(color: CrvFabColor, state: State, disabled: boolean): string {
  if (color === 'primary') return 'none';

  if (disabled) return `1px solid ${colors.border.disabled}`;

  if (state === 'default') return `1px solid ${colors.border.default}`;
  return `1px solid ${colors.border.strong}`;
}

// Ground truth from Figma (crv-fab, node 4497:77574)
export const CrvFab = forwardRef<HTMLButtonElement, CrvFabProps>(
  function CrvFab(
    {
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

    return (
      <MuiFab
        ref={ref}
        disabled={disabled}
        sx={{
          width: dim,
          height: dim,
          minHeight: dim,
          padding: 0,
          boxShadow: 'none',
          borderRadius: `${radius.full}px`,
          backgroundColor: bgFor(color, 'default'),
          color: iconColorFor(color, Boolean(disabled)),
          border: borderFor(color, 'default', Boolean(disabled)),
          '&:hover': {
            boxShadow: 'none',
            backgroundColor: bgFor(color, 'hover'),
            color: iconColorFor(color, false),
            border: borderFor(color, 'hover', false),
          },
          '&:active': {
            boxShadow: 'none',
            backgroundColor: bgFor(color, 'pressed'),
            color: iconColorFor(color, false),
            border: borderFor(color, 'pressed', false),
          },
          '&.Mui-disabled, &:disabled': {
            boxShadow: 'none !important',
            backgroundColor: `${colors.onSurface.action.disabled} !important`,
            color: `${colors.content.disabled} !important`,
            border: `${borderFor(color, 'default', true)} !important`,
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
      </MuiFab>
    );
  },
);
