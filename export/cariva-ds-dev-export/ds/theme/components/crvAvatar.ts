import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvAvatarSize } from '../../components/CrvAvatar/CrvAvatar.types';
import { getCarivaColors, getCarivaRadius, getCarivaTypography } from '../carivaTokens';

export const AVATAR_SIZE_PX: Record<CrvAvatarSize, number> = {
  large: 40,
  medium: 32,
  small: 24,
  xSmall: 18,
};

const ICON_SLOT_PX: Record<CrvAvatarSize, number> = {
  large: 24,
  medium: 24,
  small: 20,
  xSmall: 18,
};

const ICON_GLYPH_PX: Record<CrvAvatarSize, number> = {
  large: 16,
  medium: 16,
  small: 13,
  xSmall: 12,
};

export const GROUP_BORDER_PX = 2;

export function getAvatarSx(
  size: CrvAvatarSize,
  content: 'image' | 'text' | 'icon',
): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const r = getCarivaRadius(theme);
    const ty = getCarivaTypography(theme);
    const dimension = AVATAR_SIZE_PX[size];

    return {
      width: dimension,
      height: dimension,
      fontSize: ty.fontSize.body.small,
      lineHeight: `${ty.lineHeight.body.small}px`,
      fontWeight: ty.fontWeight.medium,
      fontFamily: ty.fontFamily.sans,
      color: c.content.primary,
      backgroundColor: content === 'image' ? 'transparent' : c.onSurface.sunken,
      borderRadius: `${r.full}px`,
    };
  };
}

export function getIconSize(size: CrvAvatarSize) {
  return {
    slot: ICON_SLOT_PX[size],
    glyph: ICON_GLYPH_PX[size],
  };
}

export function getGroupOverlapPx(size: CrvAvatarSize) {
  switch (size) {
    case 'large':
    case 'medium':
      return -12;
    case 'small':
      return -8;
    case 'xSmall':
      return -4;
  }
}

export function getSurplusTypography(size: CrvAvatarSize, theme?: Theme) {
  const ty = getCarivaTypography(theme);
  if (size === 'large') {
    return {
      fontSize: ty.fontSize.body.medium,
      lineHeight: `${ty.lineHeight.body.medium}px`,
    };
  }
  return {
    fontSize: ty.fontSize.body.small,
    lineHeight: `${ty.lineHeight.body.small}px`,
  };
}
