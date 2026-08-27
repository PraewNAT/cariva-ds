import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing, typography } from '../../tokens';
import type { CrvDropdownSize } from '../CrvDropdown';
import type { CrvPaginationSize } from './CrvPagination.types';

export function paginationDropdownSize(size: CrvPaginationSize): CrvDropdownSize {
  return size === 'large' ? 'medium' : 'small';
}

export const PAGINATION_ITEM_SIZE: Record<CrvPaginationSize, number> = {
  large:  40,
  medium: 32,
};

export const PAGINATION_CONTAINER_HEIGHT: Record<CrvPaginationSize, number> = {
  large:  48,
  medium: 40,
};

export const PAGINATION_ICON_SIZE: Record<CrvPaginationSize, number> = {
  large:  22,
  medium: 20,
};

export const PAGINATION_SELECT_WIDTH = 77;
export const PAGINATION_SELECT_HEIGHT = 46;

export const paginationLabelSx: SxProps<Theme> = {
  fontFamily: typography.fontFamily.sans,
  fontSize:   `${typography.fontSize.label.medium}px`,
  lineHeight: `${typography.lineHeight.label.medium}px`,
  fontWeight: typography.fontWeight.medium,
  color:      colors.content.primary,
};

export function paginationRootSx(size: CrvPaginationSize): SxProps<Theme> {
  return {
    display:    'inline-flex',
    alignItems: 'center',
    gap:        `${spacing.lg}px`,
    minHeight:  PAGINATION_CONTAINER_HEIGHT[size],
  };
}

export function paginationPagesSx(size: CrvPaginationSize): SxProps<Theme> {
  return {
    display:         'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    gap:            `${spacing.sm}px`,
    minHeight:      PAGINATION_CONTAINER_HEIGHT[size],
    px:             `${spacing.xs}px`,
    borderRadius:   `${radius.full}px`,
    backgroundColor: colors.bg.subtle,
  };
}

export function paginationItemSx(
  size: CrvPaginationSize,
  selected = false,
  disabled = false,
): SxProps<Theme> {
  const itemSize = PAGINATION_ITEM_SIZE[size];

  return {
    width:          itemSize,
    height:         itemSize,
    minWidth:       itemSize,
    p:              0,
    border:         0,
    borderRadius:   `${radius.full}px`,
    display:        'inline-flex',
    alignItems:     'center',
    justifyContent: 'center',
    cursor:         disabled ? 'default' : 'pointer',
    fontFamily:     typography.fontFamily.sans,
    fontSize:       `${typography.fontSize.label.medium}px`,
    lineHeight:     `${typography.lineHeight.label.medium}px`,
    fontWeight:     typography.fontWeight.medium,
    color:          selected ? colors.content.inverse : colors.content.primary,
    backgroundColor: selected ? colors.brand.primary.onSurface.default : 'transparent',
    transition:     'background-color 120ms ease, color 120ms ease',
    '&:hover': disabled
      ? undefined
      : {
          backgroundColor: selected
            ? colors.brand.primary.onSurface.hover
            : colors.brand.primary.onSurface.subtle,
        },
    '&:active': disabled
      ? undefined
      : {
          backgroundColor: selected
            ? colors.brand.primary.onSurface.pressed
            : colors.brand.primary.onSurface.muted,
        },
    '&:focus-visible': {
      outline:       `2px solid ${colors.border.system}`,
      outlineOffset: 2,
    },
    '&:disabled': {
      color:           colors.content.disabled,
      backgroundColor: 'transparent',
      cursor:          'default',
    },
  };
}

export function paginationControllerSx(
  size: CrvPaginationSize,
  disabled = false,
): SxProps<Theme> {
  const itemSize = PAGINATION_ITEM_SIZE[size];
  const iconSize = PAGINATION_ICON_SIZE[size];

  return {
    width:           itemSize,
    height:          itemSize,
    minWidth:        itemSize,
    p:               0,
    borderRadius:    `${radius.full}px`,
    border:          disabled ? `1px solid ${colors.border.disabled}` : 0,
    color:           disabled ? colors.content.disabled : colors.content.inverse,
    backgroundColor: disabled ? 'transparent' : colors.brand.primary.onSurface.default,
    transition:      'background-color 120ms ease, border-color 120ms ease',
    '&:hover': disabled
      ? undefined
      : {
          backgroundColor: colors.brand.primary.onSurface.hover,
        },
    '&:active': disabled
      ? undefined
      : {
          backgroundColor: colors.brand.primary.onSurface.pressed,
        },
    '&:focus-visible': {
      outline:       `2px solid ${colors.border.system}`,
      outlineOffset: 2,
    },
    '&:disabled': {
      color:           colors.content.disabled,
      borderColor:     colors.border.disabled,
      backgroundColor: 'transparent',
    },
    '& .MuiSvgIcon-root': {
      width:  iconSize,
      height: iconSize,
    },
  };
}

export function paginationSelectSx(): SxProps<Theme> {
  return {
    width:    PAGINATION_SELECT_WIDTH,
    minWidth: PAGINATION_SELECT_WIDTH,
    maxWidth: PAGINATION_SELECT_WIDTH,
    flex:     '0 0 auto',
    '& .MuiSelect-select': {
      textAlign: 'center',
    },
  };
}
