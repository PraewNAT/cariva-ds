import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing, typography } from '../../tokens';
import type { CrvButtonSplitColor, CrvButtonSplitSize } from './CrvButtonSplit.types';

export const HEIGHT_BY_SIZE: Record<CrvButtonSplitSize, number> = {
  small: 32,
  medium: 36,
  large: 48,
};

export const ICON_SIZE_BY_SIZE: Record<CrvButtonSplitSize, number> = {
  small: 16,
  medium: 20,
  large: 24,
};

function surface(color: CrvButtonSplitColor) {
  return color === 'primary' ? colors.brand.primary : colors.status.error;
}

/** Both halves share one pill; only the divider separates them. */
export function getSplitRootSx(
  color: CrvButtonSplitColor,
  size: CrvButtonSplitSize,
  disabled: boolean,
): SxProps<Theme> {
  const s = surface(color);
  return {
    display: 'inline-flex',
    alignItems: 'stretch',
    height: HEIGHT_BY_SIZE[size],
    borderRadius: `${radius.full}px`,
    overflow: 'hidden',
    backgroundColor: disabled ? colors.onSurface.action.disabled : s.onSurface.default,
    ...(disabled
      ? {}
      : {
          '&:hover': { backgroundColor: s.onSurface.hover },
          '&:active': { backgroundColor: s.onSurface.pressed },
        }),
  };
}

export function getSplitActionSx(
  size: CrvButtonSplitSize,
  disabled: boolean,
): SxProps<Theme> {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: `${spacing.sm}px`,
    px: `${spacing.lg}px`,
    py: `${spacing.sm}px`,
    color: disabled ? colors.content.disabled : colors.content.onBrand,
    fontFamily: typography.fontFamily.ui,
    fontSize: `${typography.fontSize.label.medium}px`,
    lineHeight: `${typography.lineHeight.label.medium}px`,
    fontWeight: typography.fontWeight.medium,
    textTransform: 'none',
    '& .MuiSvgIcon-root': { fontSize: ICON_SIZE_BY_SIZE[size] },
  };
}

export function getSplitDividerSx(
  color: CrvButtonSplitColor,
  disabled: boolean,
): SxProps<Theme> {
  return {
    width: '1px',
    alignSelf: 'stretch',
    backgroundColor: disabled
      ? colors.border.disabled
      : color === 'primary'
        ? colors.brand.primary.border.strong
        : colors.status.error.border.strong,
  };
}

export function getSplitTriggerSx(
  size: CrvButtonSplitSize,
  disabled: boolean,
): SxProps<Theme> {
  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    pl: `${spacing.md}px`,
    pr: `${spacing.sm}px`,
    color: disabled ? colors.content.disabled : colors.content.onBrand,
    '& .MuiSvgIcon-root': { fontSize: ICON_SIZE_BY_SIZE[size] },
  };
}
