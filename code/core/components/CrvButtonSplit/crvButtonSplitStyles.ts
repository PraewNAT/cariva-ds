import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, typography } from '../../tokens';
import { buttonSizing } from '../../theme/buttonSizing';
import type { CrvButtonSplitColor, CrvButtonSplitSize } from './CrvButtonSplit.types';

export const HEIGHT_BY_SIZE: Record<CrvButtonSplitSize, number> = {
  small: buttonSizing.small.height,
  medium: buttonSizing.medium.height,
  large: buttonSizing.large.height,
};

export const ICON_SIZE_BY_SIZE: Record<CrvButtonSplitSize, number> = {
  small: buttonSizing.small.iconSize,
  medium: buttonSizing.medium.iconSize,
  large: buttonSizing.large.iconSize,
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
  const metrics = buttonSizing[size];

  return {
    display: 'inline-flex',
    alignItems: 'center',
    gap: `${metrics.gap}px`,
    px: `${metrics.paddingX}px`,
    py: `${metrics.paddingY}px`,
    color: disabled ? colors.content.disabled : colors.content.onBrand,
    fontFamily: typography.fontFamily.ui,
    fontSize: `${typography.fontSize.label.medium}px`,
    lineHeight: `${typography.lineHeight.label.medium}px`,
    fontWeight: typography.fontWeight.medium,
    textTransform: 'none',
    '& .MuiSvgIcon-root': { fontSize: metrics.iconSize },
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
  const metrics = buttonSizing[size];

  return {
    display: 'inline-flex',
    alignItems: 'center',
    justifyContent: 'center',
    // The trigger is square like an icon-only button: Figma pads it 8 / 8 / 12.
    px: `${metrics.squarePadding}px`,
    color: disabled ? colors.content.disabled : colors.content.onBrand,
    '& .MuiSvgIcon-root': { fontSize: metrics.iconSize },
  };
}
