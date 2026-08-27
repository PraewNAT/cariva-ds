'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import RadioButtonUncheckedRoundedIcon from '@mui/icons-material/RadioButtonUncheckedRounded';
import { getTagColorSx, getTagSx } from './crvTagStyles';
import type { CrvTagColorProps, CrvTagProps } from './CrvTag.types';

const defaultIcon = <RadioButtonUncheckedRoundedIcon />;

function mergeSx(base: SxProps<Theme>, sx?: SxProps<Theme>): SxProps<Theme> {
  if (!sx) return base;
  return (Array.isArray(sx) ? [base, ...sx] : [base, sx]) as SxProps<Theme>;
}

export const CrvTag = forwardRef<HTMLSpanElement, CrvTagProps>(
  function CrvTag(
    {
      variant = 'filled',
      color = 'default',
      content = 'label',
      size = 'small',
      label = 'Label',
      badgeContent = '8',
      startIconVisible = false,
      endIconVisible = false,
      startIcon = defaultIcon,
      endIcon = defaultIcon,
      children,
      sx,
      ...rest
    },
    ref,
  ) {
    const isNumber = content === 'number';
    const body = children ?? (isNumber ? badgeContent : label);

    return (
      <Box
        ref={ref}
        component="span"
        sx={mergeSx(getTagSx(variant, color, content, size), sx)}
        {...rest}
      >
        {!isNumber && startIconVisible && startIcon}
        {body}
        {!isNumber && endIconVisible && endIcon}
      </Box>
    );
  },
);

export const CrvTagColor = forwardRef<HTMLSpanElement, CrvTagColorProps>(
  function CrvTagColor(
    {
      color = 'primary',
      label = 'Label',
      children,
      sx,
      ...rest
    },
    ref,
  ) {
    return (
      <Box
        ref={ref}
        component="span"
        sx={mergeSx(getTagColorSx(color), sx)}
        {...rest}
      >
        {children ?? label}
      </Box>
    );
  },
);
