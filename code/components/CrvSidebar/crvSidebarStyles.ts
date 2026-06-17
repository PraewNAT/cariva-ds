import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing } from '../../tokens';

/** Figma crv-sidebar fixed width (4724:103532). */
export const SIDEBAR_WIDTH = 240;

/** Menu item radius — Foundation tokens (constant across themes). */
export const SIDEBAR_ITEM_RADIUS = radius['12'];
export const SIDEBAR_SUBITEM_RADIUS = radius['8'];

/** Sub-item bar indicator dimensions. */
const BAR_WIDTH = 2;
const BAR_HEIGHT = 40;

export function getSidebarRootSx(): SxProps<Theme> {
  return {
    boxSizing: 'border-box',
    width: SIDEBAR_WIDTH,
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.lg}px`,
    paddingTop: `${spacing.xl}px`,
    paddingBottom: `${spacing.xl}px`,
    backgroundColor: colors.onSurface.default,
  };
}

export function getSidebarLogoSx(): SxProps<Theme> {
  return {
    display: 'flex',
    alignItems: 'center',
    padding: `${spacing.sm}px ${spacing.lg}px`,
    backgroundColor: colors.onSurface.default,
  };
}

export function getSidebarContentSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.xl}px`,
    paddingTop: `${spacing.lg}px`,
    paddingBottom: `${spacing.lg}px`,
    paddingLeft: `${spacing.sm}px`,
    paddingRight: `${spacing.sm}px`,
    flex: 1,
    minHeight: 0,
    overflowY: 'auto',
  };
}

export function getSidebarSectionSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.sm}px`,
  };
}

export function getSidebarHeaderSx(): SxProps<Theme> {
  return {
    padding: `0 ${spacing.lg}px`,
    color: colors.content.secondary,
    fontWeight: 600,
  };
}

export function getNavGroupSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.sm}px`,
  };
}

/** Sub-items container — Figma sub-items frame (HORIZONTAL, pad [8,_,8,24], gap 8). */
export function getSubItemsSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'row',
    gap: `${spacing.sm}px`,
    paddingTop: `${spacing.sm}px`,
    paddingBottom: `${spacing.sm}px`,
    paddingLeft: `${spacing.xl}px`,
  };
}

export function getBarColumnSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: BAR_WIDTH,
    flexShrink: 0,
  };
}

export function getBarSegmentSx(selected: boolean): SxProps<Theme> {
  return {
    width: BAR_WIDTH,
    height: BAR_HEIGHT,
    backgroundColor: selected
      ? colors.brand.primary.onSurface.default
      : colors.border.default,
  };
}

export function getSubItemRowsSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
  };
}
