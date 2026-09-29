import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvAvatarSize } from '../../components/CrvAvatar/CrvAvatar.types';
import { getCarivaColors, getCarivaRadius, getCarivaTypography } from '../carivaTokens';

export const AVATAR_SIZE_PX: Record<CrvAvatarSize, number> = {
  large: 40,
  medium: 32,
  small: 24,
  xSmall: 20,
};

/**
 * content=text — Figma draws the initials with the label scale, one step down per
 * size, and pads the circle so long initials cannot touch the edge:
 * large 14/20 pad 8 · medium 12/16 pad 4 · small 10/16 pad 4 · xSmall 10/16 pad 2.
 */
const INITIALS_STYLE: Record<CrvAvatarSize, { size: 'medium' | 'small' | 'xsmall'; padding: number }> = {
  large: { size: 'medium', padding: 8 },
  medium: { size: 'small', padding: 4 },
  small: { size: 'xsmall', padding: 4 },
  xSmall: { size: 'xsmall', padding: 2 },
};

// content=icon — Figma 4315:10055. The icon slot is `icon/size/6|5|4|3`, centred,
// so padding is (avatar − slot) / 2: 8 / 6 / 4 / 3px. Same for badge=false and
// badge=true (the badge only overlays the corner). Glyph is the vector drawn inside
// the slot — MUI icons already inset it, so render the icon at `slot`.
const ICON_SLOT_PX: Record<CrvAvatarSize, number> = {
  large: 24,
  medium: 20,
  small: 16,
  xSmall: 12,
};

const ICON_GLYPH_PX: Record<CrvAvatarSize, number> = {
  large: 16,
  medium: 13.33,
  small: 10.67,
  xSmall: 8,
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
    const initials = INITIALS_STYLE[size];

    return {
      width: dimension,
      height: dimension,
      fontSize: ty.fontSize.label[initials.size],
      lineHeight: `${ty.lineHeight.label[initials.size]}px`,
      fontWeight: ty.fontWeight.medium,
      fontFamily: ty.fontFamily.sans,
      color: c.content.primary,
      backgroundColor: content === 'image' ? 'transparent' : c.onSurface.sunken,
      borderRadius: `${r.full}px`,
      ...(content === 'text' && { padding: `${initials.padding}px` }),
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
