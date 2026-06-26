'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import MenuItem from '@mui/material/MenuItem';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { colors, spacing, typography } from '../../tokens';
import { CrvCheckboxBase } from '../CrvCheckboxBase';
import {
  CHECKBOX_SIZE,
  getAnchoredControlSx,
  getControlSlotSx,
} from '../CrvCheckboxBase/crvCheckboxStyles';
import type { CrvMenuItemProps } from './CrvMenuItem.types';

const ITEM_MIN_HEIGHT = 40;
const ICON_SLOT_SIZE = 20;
const CHECKBOX_SLOT_OFFSET = (ICON_SLOT_SIZE - CHECKBOX_SIZE) / 2;

const baseSx = {
  minHeight:    ITEM_MIN_HEIGHT,
  py:           `${spacing.sm}px`,
  px:           `${spacing.lg}px`,
  gap:          `${spacing.md}px`,
  display:      'flex',
  alignItems:   'center',
  borderRadius: 0,
  fontFamily:   typography.fontFamily.sans,
  fontSize:     `${typography.fontSize.body.medium}px`,
  lineHeight:   `${typography.lineHeight.body.medium}px`,
  fontWeight:   typography.fontWeight.medium,
  color:        colors.content.primary,
  backgroundColor: colors.onSurface.default,
  transition:   'background-color 120ms ease',
  '&:hover': {
    backgroundColor: colors.onSurface.action.hover,
  },
  '&.Mui-selected': {
    backgroundColor: colors.onSurface.action.selected,
    color:           colors.content.primary,
    '&:hover': {
      backgroundColor: colors.onSurface.action.selected,
    },
  },
  '&.Mui-focusVisible': {
    backgroundColor: colors.onSurface.action.hover,
  },
  '&.Mui-disabled': {
    opacity: 1,
    color:   colors.content.disabled,
  },
};

export const CrvMenuItem = forwardRef<HTMLLIElement, CrvMenuItemProps>(
  function CrvMenuItem(
    {
      variant = 'default',
      leftIconVisible = true,
      rightIconVisible = true,
      leftIcon,
      rightIcon,
      children,
      selected = false,
      disabled = false,
      sx,
      ...rest
    },
    ref,
  ) {
    const resolvedLeftIcon = leftIcon ?? (
      <PersonOutlineIcon
        sx={{
          fontSize: ICON_SLOT_SIZE,
          color:    disabled ? colors.content.disabled : colors.content.secondary,
        }}
      />
    );
    const resolvedRightIcon = rightIcon ?? (
      <ChevronRightIcon
        sx={{
          fontSize: ICON_SLOT_SIZE,
          color:    disabled ? colors.content.disabled : colors.content.secondary,
        }}
      />
    );

    return (
      <MenuItem
        ref={ref}
        selected={selected}
        disabled={disabled}
        disableGutters
        sx={[baseSx, ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
        {...rest}
      >
        {variant === 'checkbox' && (
          <Box
            sx={{
              ...getControlSlotSx(),
              width:    ICON_SLOT_SIZE,
              height:   ICON_SLOT_SIZE,
              minWidth: ICON_SLOT_SIZE,
              minHeight: ICON_SLOT_SIZE,
              maxWidth: ICON_SLOT_SIZE,
              maxHeight: ICON_SLOT_SIZE,
            }}
          >
            <CrvCheckboxBase
              checked={Boolean(selected)}
              disabled={Boolean(disabled)}
              tabIndex={-1}
              sx={{
                ...getAnchoredControlSx(),
                top:  CHECKBOX_SLOT_OFFSET,
                left: CHECKBOX_SLOT_OFFSET,
              }}
            />
          </Box>
        )}

        {variant === 'default' && leftIconVisible && (
          <Box
            component="span"
            sx={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              width:          ICON_SLOT_SIZE,
              height:         ICON_SLOT_SIZE,
              flexShrink:     0,
            }}
          >
            {resolvedLeftIcon}
          </Box>
        )}

        <Box component="span" sx={{ flex: 1, minWidth: 0 }}>
          {children}
        </Box>

        {rightIconVisible && (
          <Box
            component="span"
            sx={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              width:          ICON_SLOT_SIZE,
              height:         ICON_SLOT_SIZE,
              flexShrink:     0,
            }}
          >
            {resolvedRightIcon}
          </Box>
        )}
      </MenuItem>
    );
  },
);
