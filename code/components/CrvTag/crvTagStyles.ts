import type { SxProps, Theme } from '@mui/material/styles';
import { colors, defaultProductStyle, productStyle, spacing, typography } from '../../tokens';
import type {
  CrvTagColor,
  CrvTagColorVariant,
  CrvTagContent,
  CrvTagSize,
  CrvTagVariant,
} from './CrvTag.types';

export const TAG_HEIGHT: Record<CrvTagSize, number> = {
  small:  20,
  medium: 26,
  large:  38,
};

export const TAG_COLOR_HEIGHT = 22;
export const TAG_ICON_SIZE = 14;

const TAG_PADDING_X: Record<CrvTagSize, number> = {
  small:  spacing.sm,
  medium: spacing.sm,
  large:  spacing.md,
};

const TAG_LABEL_TYPOGRAPHY: Record<
  CrvTagSize,
  { fontSize: number; lineHeight: number }
> = {
  small: {
    fontSize:   typography.fontSize.label.small,
    lineHeight: typography.lineHeight.label.small,
  },
  medium: {
    fontSize:   typography.fontSize.label.small,
    lineHeight: typography.lineHeight.label.small,
  },
  large: {
    fontSize:   typography.fontSize.label.medium,
    lineHeight: typography.lineHeight.label.medium,
  },
};

const filledColorTokens: Record<CrvTagColor, { backgroundColor: string; color: string }> = {
  default: {
    backgroundColor: colors.brand.primary.onSurface.default,
    color:           colors.content.onBrand,
  },
  secondary: {
    backgroundColor: colors.onSurface.sunken,
    color:           colors.content.primary,
  },
  error: {
    backgroundColor: colors.status.error.onSurface.default,
    color:           colors.content.onBrand,
  },
  success: {
    backgroundColor: colors.status.success.onSurface.default,
    color:           colors.content.onBrand,
  },
  warning: {
    backgroundColor: colors.status.warning.onSurface.default,
    color:           colors.content.onBrand,
  },
};

const colorTagTokens: Record<CrvTagColorVariant, { backgroundColor: string; color: string }> = {
  primary: {
    backgroundColor: colors.brand.primary.onSurface.muted,
    color:           colors.brand.primary.content.strong,
  },
  sky: {
    backgroundColor: colors.accent.sky.A01,
    color:           colors.accent.sky.A04,
  },
  cyan: {
    backgroundColor: colors.accent.cyan.A01,
    color:           colors.accent.cyan.A04,
  },
  pink: {
    backgroundColor: colors.accent.pink.A01,
    color:           colors.accent.pink.A04,
  },
  purple: {
    backgroundColor: colors.accent.purple.A01,
    color:           colors.accent.purple.A04,
  },
  emerald: {
    backgroundColor: colors.accent.emerald.A01,
    color:           colors.accent.emerald.A04,
  },
  amber: {
    backgroundColor: colors.accent.amber.A01,
    color:           colors.accent.amber.A04,
  },
  orange: {
    backgroundColor: colors.accent.orange.A01,
    color:           colors.accent.orange.A04,
  },
};

function standardColorTokens(
  variant: CrvTagVariant,
  color: CrvTagColor,
) {
  if (variant === 'outlined') {
    return {
      backgroundColor: 'transparent',
      color:           colors.content.primary,
      border:          `1px solid ${colors.border.default}`,
    };
  }

  return {
    ...filledColorTokens[color],
    border: '1px solid transparent',
  };
}

export function getTagSx(
  variant: CrvTagVariant,
  color: CrvTagColor,
  content: CrvTagContent,
  size: CrvTagSize,
): SxProps<Theme> {
  const height = TAG_HEIGHT[size];
  const type = TAG_LABEL_TYPOGRAPHY[size];
  const token = standardColorTokens(variant, color);

  return {
    minWidth:        content === 'number' ? height : undefined,
    height,
    maxHeight:       height,
    boxSizing:       'border-box',
    display:         'inline-flex',
    alignItems:      'center',
    justifyContent:  'center',
    gap:             `${spacing.xs}px`,
    px:              `${content === 'number' ? 0 : TAG_PADDING_X[size]}px`,
    borderRadius:    `${productStyle[defaultProductStyle].interactive}px`,
    border:          token.border,
    backgroundColor: token.backgroundColor,
    color:           token.color,
    fontFamily:      typography.fontFamily.sans,
    fontSize:        `${type.fontSize}px`,
    lineHeight:      `${type.lineHeight}px`,
    fontWeight:      typography.fontWeight.medium,
    whiteSpace:      'nowrap',
    '& .MuiSvgIcon-root, & svg': {
      width:  TAG_ICON_SIZE,
      height: TAG_ICON_SIZE,
      color:  'currentColor',
    },
  };
}

export function getTagColorSx(color: CrvTagColorVariant): SxProps<Theme> {
  const token = colorTagTokens[color];

  return {
    height:          TAG_COLOR_HEIGHT,
    maxHeight:       TAG_COLOR_HEIGHT,
    boxSizing:       'border-box',
    display:         'inline-flex',
    alignItems:      'center',
    justifyContent:  'center',
    px:              `${spacing.sm}px`,
    borderRadius:    `${productStyle[defaultProductStyle].interactive}px`,
    border:          '1px solid transparent',
    backgroundColor: token.backgroundColor,
    color:           token.color,
    fontFamily:      typography.fontFamily.sans,
    fontSize:        `${typography.fontSize.label.small}px`,
    lineHeight:      `${typography.lineHeight.label.small}px`,
    fontWeight:      typography.fontWeight.medium,
    whiteSpace:      'nowrap',
  };
}
