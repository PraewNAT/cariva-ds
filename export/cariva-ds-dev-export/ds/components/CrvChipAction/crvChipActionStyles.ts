import { colors, productStyle, defaultProductStyle, spacing, typography } from '../../tokens';
import type {
  CrvChipActionColor,
  CrvChipActionSize,
  CrvChipActionVariant,
} from './CrvChipAction.types';

type ChipState = 'default' | 'hover' | 'pressed' | 'focusVisible';

// Ground truth from Figma (crv-chip-action, node 4459:62796)
export const CHIP_MIN_WIDTH = 40;
export const CHIP_HEIGHT: Record<CrvChipActionSize, number> = {
  small:  24,
  medium: 32,
};

export const CHIP_DELETE_ICON: Record<CrvChipActionSize, number> = {
  small:  16,
  medium: 24,
};

export const CHIP_DELETE_GLYPH: Record<CrvChipActionSize, number> = {
  small:  13,
  medium: 20,
};

const CHIP_LABEL_TYPOGRAPHY: Record<
  CrvChipActionSize,
  { fontSize: number; lineHeight: number }
> = {
  small: {
    fontSize:   typography.fontSize.label.small,
    lineHeight: typography.lineHeight.label.small,
  },
  medium: {
    fontSize:   typography.fontSize.label.medium,
    lineHeight: typography.lineHeight.label.medium,
  },
};

function filledBackground(color: CrvChipActionColor, state: ChipState): string {
  if (color === 'primary') {
    const palette = colors.brand.primary.onSurface;
    if (state === 'hover' || state === 'focusVisible') return palette.hover;
    if (state === 'pressed') return palette.pressed;
    return palette.default;
  }

  if (state === 'hover') return colors.onSurface.action.hover;
  if (state === 'pressed') return colors.onSurface.action.pressed;
  if (state === 'focusVisible') return colors.brand.primary.onSurface.subtle;
  return colors.onSurface.subtle;
}

function outlinedBackground(color: CrvChipActionColor, state: ChipState): string {
  if (state === 'default') return 'transparent';

  if (color === 'primary') {
    return colors.brand.primary.onSurface.subtle;
  }

  if (state === 'hover') return colors.onSurface.action.hover;
  if (state === 'pressed') return colors.onSurface.action.pressed;
  if (state === 'focusVisible') return colors.brand.primary.onSurface.subtle;
  return 'transparent';
}

function background(
  variant: CrvChipActionVariant,
  color: CrvChipActionColor,
  state: ChipState,
): string {
  return variant === 'filled'
    ? filledBackground(color, state)
    : outlinedBackground(color, state);
}

function labelColor(
  variant: CrvChipActionVariant,
  color: CrvChipActionColor,
  disabled: boolean,
): string {
  if (disabled) return colors.content.disabled;
  if (variant === 'outlined' && color === 'primary') {
    return colors.brand.primary.content.default;
  }
  if (variant === 'filled' && color === 'primary') {
    return colors.content.onBrand;
  }
  return colors.content.primary;
}

function deleteColor(
  variant: CrvChipActionVariant,
  color: CrvChipActionColor,
  disabled: boolean,
): string {
  if (disabled) return colors.content.disabled;
  if (variant === 'filled' && color === 'primary') return colors.content.onBrand;
  return colors.content.secondary;
}

function border(
  variant: CrvChipActionVariant,
  color: CrvChipActionColor,
  disabled: boolean,
): string {
  if (variant !== 'outlined') return 'none';

  if (disabled) return `1px solid ${colors.border.disabled}`;

  if (color === 'primary') {
    return `1px solid ${colors.brand.primary.onSurface.default}`;
  }

  return `1px solid ${colors.border.default}`;
}

export function getChipActionSx(
  size: CrvChipActionSize,
  color: CrvChipActionColor,
  variant: CrvChipActionVariant,
  disabled: boolean,
) {
  const height = CHIP_HEIGHT[size];
  const radius = productStyle[defaultProductStyle].interactive;
  const labelTypography = CHIP_LABEL_TYPOGRAPHY[size];

  const stateSx = (state: ChipState) => ({
    backgroundColor: disabled
      ? variant === 'filled'
        ? colors.onSurface.action.disabled
        : 'transparent'
      : background(variant, color, state),
    color: labelColor(variant, color, disabled),
    border: border(variant, color, disabled),
    '& .MuiChip-deleteIcon': {
      color: deleteColor(variant, color, disabled),
    },
  });

  return {
    '&&': {
      height,
      maxHeight: height,
      minWidth: CHIP_MIN_WIDTH,
      borderRadius: `${radius}px`,
      padding: `${spacing.xs}px`,
      gap: `${spacing.xs}px`,
      boxShadow: 'none',
      fontFamily: typography.fontFamily.sans,
      fontSize: `${labelTypography.fontSize}px`,
      lineHeight: `${labelTypography.lineHeight}px`,
      fontWeight: typography.fontWeight.medium,
      ...stateSx('default'),
      '&:hover': stateSx('hover'),
      '&:active': stateSx('pressed'),
      '&.Mui-focusVisible, &:focus-visible': stateSx('focusVisible'),
      '&.Mui-disabled, &:disabled': {
        opacity: 1,
        ...stateSx('default'),
        pointerEvents: 'none',
      },
    },
    '& .MuiChip-label': {
      padding: 0,
      fontFamily: typography.fontFamily.sans,
      fontSize: `${labelTypography.fontSize}px`,
      lineHeight: `${labelTypography.lineHeight}px`,
      fontWeight: typography.fontWeight.medium,
    },
    '& .MuiChip-avatar': {
      margin: 0,
      width: 24,
      height: 24,
    },
    '& .MuiChip-deleteIcon': {
      margin: 0,
      width: CHIP_DELETE_ICON[size],
      height: CHIP_DELETE_ICON[size],
      fontSize: CHIP_DELETE_GLYPH[size],
    },
  };
}
