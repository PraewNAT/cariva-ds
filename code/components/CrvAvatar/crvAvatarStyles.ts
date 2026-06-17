import { colors, radius, typography } from '../../tokens';
import type { CrvAvatarSize } from './CrvAvatar.types';

// Ground truth from Figma (crv-avatar, node 4315:10055)
export const AVATAR_SIZE_PX: Record<CrvAvatarSize, number> = {
  large:  40,
  medium: 32,
  small:  24,
  xSmall: 18,
};

const ICON_SLOT_PX: Record<CrvAvatarSize, number> = {
  large:  24,
  medium: 24,
  small:  20,
  xSmall: 18,
};

const ICON_GLYPH_PX: Record<CrvAvatarSize, number> = {
  large:  16,
  medium: 16,
  small:  13,
  xSmall: 12,
};

export const GROUP_BORDER_PX = 2;

export function getAvatarSx(size: CrvAvatarSize, content: 'image' | 'text' | 'icon') {
  const dimension = AVATAR_SIZE_PX[size];

  return {
    width:           dimension,
    height:          dimension,
    fontSize:        typography.fontSize.body.small,
    lineHeight:      `${typography.lineHeight.body.small}px`,
    fontWeight:      typography.fontWeight.medium,
    fontFamily:      typography.fontFamily.sans,
    color:           colors.content.primary,
    backgroundColor: content === 'image' ? 'transparent' : colors.onSurface.sunken,
    borderRadius:    `${radius.full}px`,
  };
}

export function getIconSize(size: CrvAvatarSize) {
  return {
    slot:  ICON_SLOT_PX[size],
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

export function getSurplusTypography(size: CrvAvatarSize) {
  if (size === 'large') {
    return {
      fontSize:   typography.fontSize.body.medium,
      lineHeight: `${typography.lineHeight.body.medium}px`,
    };
  }

  return {
    fontSize:   typography.fontSize.body.small,
    lineHeight: `${typography.lineHeight.body.small}px`,
  };
}
