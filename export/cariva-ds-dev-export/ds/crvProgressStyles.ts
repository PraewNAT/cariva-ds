import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius } from './tokens';

/** Shared semantic colors — Figma crv-linear/circular-progress (4456:16573 / 4456:16646). */
export type CrvProgressColor = 'primary' | 'error' | 'success' | 'warning';

export interface CrvProgressPalette {
  track: string;
  fill: string;
  buffer: string;
}

export function getProgressPalette(color: CrvProgressColor): CrvProgressPalette {
  if (color === 'primary') {
    return {
      track: colors.brand.primary.onSurface.subtle,
      fill: colors.brand.primary.onSurface.default,
      buffer: colors.brand.primary.onSurface.muted,
    };
  }

  const status = colors.status[color];
  return {
    track: status.onSurface.subtle,
    fill: status.onSurface.default,
    buffer: status.onSurface.muted,
  };
}

/** Figma linear bar height — 4px. */
export const LINEAR_PROGRESS_HEIGHT = 4;

export function getLinearProgressSx(color: CrvProgressColor): SxProps<Theme> {
  const palette = getProgressPalette(color);

  return {
    height: LINEAR_PROGRESS_HEIGHT,
    borderRadius: `${radius.full}px`,
    backgroundColor: palette.track,
    '& .MuiLinearProgress-bar': {
      borderRadius: `${radius.full}px`,
      backgroundColor: palette.fill,
    },
    '& .MuiLinearProgress-bar1Buffer': {
      backgroundColor: palette.fill,
    },
    '& .MuiLinearProgress-bar2Buffer': {
      borderRadius: `${radius.full}px`,
      backgroundColor: palette.buffer,
    },
  };
}

export const CIRCULAR_PROGRESS_SIZE = {
  small:  24,
  medium: 40,
  large:  56,
} as const;

export type CrvCircularProgressSize = keyof typeof CIRCULAR_PROGRESS_SIZE;

/** Ring thickness derived from Figma arc innerRadius ratios. */
export const CIRCULAR_PROGRESS_THICKNESS: Record<CrvCircularProgressSize, number> = {
  small:  3,
  medium: 4,
  large:  5.6,
};
