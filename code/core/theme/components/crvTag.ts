import type { SxProps, Theme } from '@mui/material/styles';
import type {
  CrvTagColor,
  CrvTagColorVariant,
  CrvTagContent,
  CrvTagSize,
  CrvTagVariant,
} from '../../components/CrvTag/CrvTag.types';
import { defaultProductStyle, productStyle } from '../../tokens';
import { getCarivaColors, getCarivaSpacing, getCarivaTypography } from '../carivaTokens';

export const TAG_HEIGHT: Record<CrvTagSize, number> = {
  small: 20,
  medium: 26,
  large: 38,
};

export const TAG_COLOR_HEIGHT = 22;
export const TAG_ICON_SIZE = 14;

function tagPaddingX(size: CrvTagSize, theme: Theme): number {
  const s = getCarivaSpacing(theme);
  return size === 'large' ? s.md : s.sm;
}

function tagLabelTypography(size: CrvTagSize, theme: Theme) {
  const ty = getCarivaTypography(theme);
  if (size === 'large') {
    return {
      fontSize: ty.fontSize.label.medium,
      lineHeight: ty.lineHeight.label.medium,
    };
  }
  return {
    fontSize: ty.fontSize.label.small,
    lineHeight: ty.lineHeight.label.small,
  };
}

function filledColorTokens(theme: Theme): Record<CrvTagColor, { backgroundColor: string; color: string }> {
  const c = getCarivaColors(theme);
  return {
    default: {
      backgroundColor: c.brand.primary.onSurface.default,
      color: c.content.onBrand,
    },
    secondary: {
      backgroundColor: c.onSurface.sunken,
      color: c.content.primary,
    },
    error: {
      backgroundColor: c.status.error.onSurface.default,
      color: c.content.onBrand,
    },
    success: {
      backgroundColor: c.status.success.onSurface.default,
      color: c.content.onBrand,
    },
    warning: {
      backgroundColor: c.status.warning.onSurface.default,
      color: c.content.onBrand,
    },
  };
}

function colorTagTokens(theme: Theme): Record<CrvTagColorVariant, { backgroundColor: string; color: string }> {
  const c = getCarivaColors(theme);
  return {
    primary: {
      backgroundColor: c.brand.primary.onSurface.muted,
      color: c.brand.primary.content.strong,
    },
    sky: { backgroundColor: c.accent.sky.A01, color: c.accent.sky.A04 },
    cyan: { backgroundColor: c.accent.cyan.A01, color: c.accent.cyan.A04 },
    pink: { backgroundColor: c.accent.pink.A01, color: c.accent.pink.A04 },
    purple: { backgroundColor: c.accent.purple.A01, color: c.accent.purple.A04 },
    emerald: { backgroundColor: c.accent.emerald.A01, color: c.accent.emerald.A04 },
    amber: { backgroundColor: c.accent.amber.A01, color: c.accent.amber.A04 },
    orange: { backgroundColor: c.accent.orange.A01, color: c.accent.orange.A04 },
  };
}

function standardColorTokens(
  variant: CrvTagVariant,
  color: CrvTagColor,
  theme: Theme,
) {
  const c = getCarivaColors(theme);
  if (variant === 'outlined') {
    return {
      backgroundColor: 'transparent',
      color: c.content.primary,
      border: `1px solid ${c.border.default}`,
    };
  }
  return {
    ...filledColorTokens(theme)[color],
    border: '1px solid transparent',
  };
}

export function getTagSx(
  variant: CrvTagVariant,
  color: CrvTagColor,
  content: CrvTagContent,
  size: CrvTagSize,
): SxProps<Theme> {
  return (theme) => {
    const s = getCarivaSpacing(theme);
    const ty = getCarivaTypography(theme);
    const height = TAG_HEIGHT[size];
    const type = tagLabelTypography(size, theme);
    const token = standardColorTokens(variant, color, theme);

    return {
      minWidth: content === 'number' ? height : undefined,
      height,
      maxHeight: height,
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      gap: `${s.xs}px`,
      px: `${content === 'number' ? 0 : tagPaddingX(size, theme)}px`,
      borderRadius: `${productStyle[defaultProductStyle].interactive}px`,
      border: token.border,
      backgroundColor: token.backgroundColor,
      color: token.color,
      fontFamily: ty.fontFamily.sans,
      fontSize: `${type.fontSize}px`,
      lineHeight: `${type.lineHeight}px`,
      fontWeight: ty.fontWeight.medium,
      whiteSpace: 'nowrap',
      '& .MuiSvgIcon-root, & svg': {
        width: TAG_ICON_SIZE,
        height: TAG_ICON_SIZE,
        color: 'currentColor',
      },
    };
  };
}

export function getTagColorSx(color: CrvTagColorVariant): SxProps<Theme> {
  return (theme) => {
    const s = getCarivaSpacing(theme);
    const ty = getCarivaTypography(theme);
    const token = colorTagTokens(theme)[color];

    return {
      height: TAG_COLOR_HEIGHT,
      maxHeight: TAG_COLOR_HEIGHT,
      boxSizing: 'border-box',
      display: 'inline-flex',
      alignItems: 'center',
      justifyContent: 'center',
      px: `${s.sm}px`,
      borderRadius: `${productStyle[defaultProductStyle].interactive}px`,
      border: '1px solid transparent',
      backgroundColor: token.backgroundColor,
      color: token.color,
      fontFamily: ty.fontFamily.sans,
      fontSize: `${ty.fontSize.label.small}px`,
      lineHeight: `${ty.lineHeight.label.small}px`,
      fontWeight: ty.fontWeight.medium,
      whiteSpace: 'nowrap',
    };
  };
}
