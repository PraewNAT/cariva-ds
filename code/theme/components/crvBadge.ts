import type { SxProps, Theme } from '@mui/material/styles';
import type { CrvBadgeColor } from '../../components/CrvBadge/CrvBadge.types';
import { getCarivaColors, getCarivaRadius, getCarivaSpacing, getCarivaTypography } from '../carivaTokens';

export const BADGE_DOT_SIZE = 8;
export const BADGE_STANDARD_MIN_SIZE = 20;
export const BADGE_DOT_RING_SIZE = 12;

export function getBadgeColorTokens(theme?: Theme): Record<
  CrvBadgeColor,
  { backgroundColor: string; color: string }
> {
  const c = getCarivaColors(theme);
  return {
    primary: {
      backgroundColor: c.brand.primary.onSurface.default,
      color: c.content.inverse,
    },
    error: {
      backgroundColor: c.status.error.onSurface.default,
      color: c.content.inverse,
    },
    success: {
      backgroundColor: c.status.success.onSurface.default,
      color: c.content.inverse,
    },
    warning: {
      backgroundColor: c.status.warning.onSurface.default,
      color: c.content.inverse,
    },
    info: {
      backgroundColor: c.status.info.onSurface.default,
      color: c.content.inverse,
    },
    default: {
      backgroundColor: c.onSurface.sunken,
      color: c.content.primary,
    },
  };
}

export function getBadgeSx(
  variant: 'dot' | 'standard',
  color: CrvBadgeColor,
): SxProps<Theme> {
  return (theme) => {
    const palette = getBadgeColorTokens(theme)[color];
    const r = getCarivaRadius(theme);
    const s = getCarivaSpacing(theme);
    const ty = getCarivaTypography(theme);

    if (variant === 'dot') {
      return {
        '& .MuiBadge-badge': {
          width: BADGE_DOT_SIZE,
          height: BADGE_DOT_SIZE,
          minWidth: BADGE_DOT_SIZE,
          padding: 0,
          borderRadius: `${r.full}px`,
          backgroundColor: palette.backgroundColor,
        },
      };
    }

    return {
      '& .MuiBadge-badge': {
        minWidth: BADGE_STANDARD_MIN_SIZE,
        height: BADGE_STANDARD_MIN_SIZE,
        borderRadius: `${r.full}px`,
        px: `${s.xs}px`,
        py: `${s['2xs']}px`,
        backgroundColor: palette.backgroundColor,
        color: palette.color,
        fontFamily: ty.fontFamily.sans,
        fontSize: `${ty.fontSize.label.small}px`,
        lineHeight: `${ty.lineHeight.label.small}px`,
        fontWeight: ty.fontWeight.medium,
      },
    };
  };
}

export function getAvatarOnlineBadgeSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    return {
      '& .MuiBadge-badge': {
        border: `${(BADGE_DOT_RING_SIZE - BADGE_DOT_SIZE) / 2}px solid ${c.onSurface.subtle}`,
        boxSizing: 'content-box',
      },
    };
  };
}

/** Static token map (uses default palette when no ThemeProvider). */
export const badgeColorTokens = getBadgeColorTokens();
