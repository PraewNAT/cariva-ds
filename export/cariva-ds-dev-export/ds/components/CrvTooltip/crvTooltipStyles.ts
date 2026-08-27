import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing, typography } from '../../tokens';
import type {
  CrvTooltipPlacement,
  CrvTooltipWithActionPlacement,
} from './CrvTooltip.types';

export const TOOLTIP_WIDTH = 240;

export function getStandardTooltipSx(): SxProps<Theme> {
  return {
    backgroundColor: colors.onSurface.invert,
    color:           colors.content.inverse,
    borderRadius:    `${radius['4']}px`,
    px:              `${spacing.sm}px`,
    py:              `${spacing.xs}px`,
    fontFamily:      typography.fontFamily.sans,
    fontSize:        typography.fontSize.label.small,
    lineHeight:      `${typography.lineHeight.label.small}px`,
    fontWeight:      typography.fontWeight.medium,
    maxWidth:        320,
    boxShadow:       'none',
  };
}

export function getStandardArrowSx(): SxProps<Theme> {
  return {
    color: colors.onSurface.invert,
  };
}

export function mapStandardPlacement(
  placement: CrvTooltipPlacement,
): Exclude<CrvTooltipPlacement, 'none'> {
  return placement === 'none' ? 'bottom' : placement;
}

export function getWithActionPaperSx(): SxProps<Theme> {
  return {
    width:           TOOLTIP_WIDTH,
    borderRadius:    `${radius['16']}px`,
    overflow:        'hidden',
    backgroundColor: colors.onSurface.default,
    boxShadow:
      '0px 8px 24px rgba(15, 23, 42, 0.12), 0px 2px 8px rgba(15, 23, 42, 0.08)',
  };
}

export function getStepPillSx(): SxProps<Theme> {
  return {
    alignSelf:       'flex-start',
    display:         'inline-flex',
    alignItems:      'center',
    px:              `${spacing.sm}px`,
    py:              `${spacing['2xs']}px`,
    borderRadius:    `${radius.full}px`,
    backgroundColor: colors.brand.primary.onSurface.muted,
    color:           colors.content.secondary,
    fontFamily:      typography.fontFamily.sans,
    fontSize:        typography.fontSize.body.small,
    lineHeight:      `${typography.lineHeight.body.small}px`,
    fontWeight:      typography.fontWeight.regular,
  };
}

export function getWithActionContentSx(): SxProps<Theme> {
  return {
    color:      colors.content.primary,
    fontFamily: typography.fontFamily.sans,
    fontSize:   typography.fontSize.body.medium,
    lineHeight: `${typography.lineHeight.body.medium}px`,
    fontWeight: typography.fontWeight.regular,
  };
}

export function getWithActionBodySx(): SxProps<Theme> {
  return {
    display:        'flex',
    flexDirection:  'column',
    gap:            `${spacing.sm}px`,
    px:             `${spacing.lg}px`,
    py:             `${spacing.md}px`,
  };
}

export function getWithActionFooterSx(): SxProps<Theme> {
  return {
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'space-between',
    gap:             `${spacing.sm}px`,
    px:              `${spacing.sm}px`,
    py:              `${spacing.md}px`,
    backgroundColor: colors.onSurface.sunken,
  };
}

export function getPopoverAnchorOrigin(
  placement: CrvTooltipWithActionPlacement,
): {
  anchorOrigin: {
    vertical: 'top' | 'bottom' | 'center';
    horizontal: 'left' | 'right' | 'center';
  };
  transformOrigin: {
    vertical: 'top' | 'bottom' | 'center';
    horizontal: 'left' | 'right' | 'center';
  };
} {
  switch (placement) {
    case 'top':
      return {
        anchorOrigin:    { vertical: 'top', horizontal: 'center' },
        transformOrigin: { vertical: 'bottom', horizontal: 'center' },
      };
    case 'top-start':
      return {
        anchorOrigin:    { vertical: 'top', horizontal: 'left' },
        transformOrigin: { vertical: 'bottom', horizontal: 'left' },
      };
    case 'top-end':
      return {
        anchorOrigin:    { vertical: 'top', horizontal: 'right' },
        transformOrigin: { vertical: 'bottom', horizontal: 'right' },
      };
    case 'bottom':
      return {
        anchorOrigin:    { vertical: 'bottom', horizontal: 'center' },
        transformOrigin: { vertical: 'top', horizontal: 'center' },
      };
    case 'bottom-start':
      return {
        anchorOrigin:    { vertical: 'bottom', horizontal: 'left' },
        transformOrigin: { vertical: 'top', horizontal: 'left' },
      };
    case 'bottom-end':
      return {
        anchorOrigin:    { vertical: 'bottom', horizontal: 'right' },
        transformOrigin: { vertical: 'top', horizontal: 'right' },
      };
    case 'left':
      return {
        anchorOrigin:    { vertical: 'center', horizontal: 'left' },
        transformOrigin: { vertical: 'center', horizontal: 'right' },
      };
    case 'right':
      return {
        anchorOrigin:    { vertical: 'center', horizontal: 'right' },
        transformOrigin: { vertical: 'center', horizontal: 'left' },
      };
    default:
      return getPopoverAnchorOrigin('bottom-start');
  }
}

export function getWithActionPreviewPlacementSx(
  placement: CrvTooltipWithActionPlacement,
): SxProps<Theme> {
  return {
    display:        'inline-flex',
    flexDirection:    placement.startsWith('top') ? 'column-reverse' : 'column',
    alignItems:
      placement.endsWith('-start')
        ? 'flex-start'
        : placement.endsWith('-end')
          ? 'flex-end'
          : 'center',
  };
}

export const STANDARD_PREVIEW_PLACEMENTS: CrvTooltipPlacement[] = [
  'none',
  'top',
  'bottom',
  'left',
  'right',
];

export const WITH_ACTION_PREVIEW_PLACEMENTS: CrvTooltipWithActionPlacement[] = [
  'bottom-start',
  'bottom',
  'bottom-end',
  'top',
  'top-start',
  'top-end',
  'left',
  'right',
];
