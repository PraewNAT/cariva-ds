import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing, typography } from '../../tokens';

/** Figma draws five bars: 8, 12, 16, 12, 8 px tall. */
export const WAVEFORM_BAR_HEIGHTS = [8, 12, 16, 12, 8] as const;
export const WAVEFORM_BAR_WIDTH = 4;
export const MIC_ICON_SIZE = 16;

export function getMicButtonSx(): SxProps<Theme> {
  return {
    display: 'flex',
    alignItems: 'center',
    gap: `${spacing.xs}px`,
    height: 32,
    px: `${spacing.sm}px`,
    py: `${spacing.sm}px`,
    borderRadius: `${radius['12']}px`,
    backgroundColor: 'transparent',
    fontFamily: typography.fontFamily.ui,
    fontSize: `${typography.fontSize.label.small}px`,
    lineHeight: `${typography.lineHeight.label.small}px`,
    color: colors.content.secondary,
    '&:hover': { backgroundColor: colors.onSurface.action.hover },
    '&:active': { backgroundColor: colors.onSurface.action.pressed },
    '& .MuiSvgIcon-root': { fontSize: MIC_ICON_SIZE, color: colors.content.secondary },
  };
}

export function getWaveformBarSx(height: number, active: boolean, index: number): SxProps<Theme> {
  return {
    width: WAVEFORM_BAR_WIDTH,
    height,
    borderRadius: `${radius.full}px`,
    backgroundColor: colors.status.active.onSurface.default,
    ...(active
      ? {
          animation: 'crvMicPulse 900ms ease-in-out infinite',
          animationDelay: `${index * 90}ms`,
          '@keyframes crvMicPulse': {
            '0%, 100%': { transform: 'scaleY(1)' },
            '50%': { transform: 'scaleY(0.45)' },
          },
          '@media (prefers-reduced-motion: reduce)': { animation: 'none' },
        }
      : {}),
  };
}
