import { colors, radius, spacing, typography } from '../../tokens';
import type { CrvBadgeColor } from './CrvBadge.types';

// Ground truth from Figma (crv-badge, node 4518:82967)
export const BADGE_DOT_SIZE = 8;
export const BADGE_STANDARD_MIN_SIZE = 20;
/** Avatar online badge ring — Figma crv-avatar badge frame 12×12 around 8×8 dot */
export const BADGE_DOT_RING_SIZE = 12;

export const badgeColorTokens: Record<
  CrvBadgeColor,
  { backgroundColor: string; color: string }
> = {
  primary: {
    backgroundColor: colors.brand.primary.onSurface.default,
    color:           colors.content.inverse,
  },
  error: {
    backgroundColor: colors.status.error.onSurface.default,
    color:           colors.content.inverse,
  },
  success: {
    backgroundColor: colors.status.success.onSurface.default,
    color:           colors.content.inverse,
  },
  warning: {
    backgroundColor: colors.status.warning.onSurface.default,
    color:           colors.content.inverse,
  },
  info: {
    backgroundColor: colors.status.info.onSurface.default,
    color:           colors.content.inverse,
  },
  default: {
    backgroundColor: colors.onSurface.sunken,
    color:           colors.content.primary,
  },
};

export function getBadgeSx(
  variant: 'dot' | 'standard',
  color: CrvBadgeColor,
) {
  const palette = badgeColorTokens[color];

  if (variant === 'dot') {
    return {
      '& .MuiBadge-badge': {
        width:           BADGE_DOT_SIZE,
        height:          BADGE_DOT_SIZE,
        minWidth:        BADGE_DOT_SIZE,
        padding:         0,
        borderRadius:    `${radius.full}px`,
        backgroundColor: palette.backgroundColor,
      },
    };
  }

  return {
    '& .MuiBadge-badge': {
      minWidth:        BADGE_STANDARD_MIN_SIZE,
      height:          BADGE_STANDARD_MIN_SIZE,
      borderRadius:    `${radius.full}px`,
      px:              `${spacing.xs}px`,
      py:              `${spacing['2xs']}px`,
      backgroundColor: palette.backgroundColor,
      color:           palette.color,
      fontFamily:      typography.fontFamily.sans,
      fontSize:        `${typography.fontSize.label.small}px`,
      lineHeight:      `${typography.lineHeight.label.small}px`,
      fontWeight:      typography.fontWeight.medium,
    },
  };
}

/** Online status ring on avatar — composes on top of dot + success color */
export function getAvatarOnlineBadgeSx() {
  return {
    '& .MuiBadge-badge': {
      border:    `${(BADGE_DOT_RING_SIZE - BADGE_DOT_SIZE) / 2}px solid ${colors.onSurface.subtle}`,
      boxSizing: 'content-box',
    },
  };
}
