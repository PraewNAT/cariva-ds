import { colors, radius, spacing } from '../../tokens';

export type CrvSwitchBaseSize = 'small' | 'medium';

const METRICS: Record<
  CrvSwitchBaseSize,
  { width: number; height: number; thumb: number; padding: number; translate: number }
> = {
  medium: { width: 44, height: 24, thumb: 20, padding: 2, translate: 20 },
  small:  { width: 36, height: 20, thumb: 16, padding: 2, translate: 16 },
};

export const SWITCH_THUMB_SHADOW = '0 1px 2px rgba(30, 58, 138, 0.25)';

export const SWITCH_MEDIUM_WIDTH = METRICS.medium.width;
export const SWITCH_MEDIUM_HEIGHT = METRICS.medium.height;

export function getTrackColor(checked: boolean, disabled: boolean) {
  if (disabled && checked) return colors.brand.primary.onSurface.muted;
  if (disabled) return colors.onSurface.action.disabled;
  if (checked) return colors.brand.primary.onSurface.default;
  return colors.border.default;
}

export function getControlSlotSx(size: CrvSwitchBaseSize = 'medium') {
  const { width, height } = METRICS[size];

  return {
    position:   'relative',
    width,
    height,
    minWidth:   width,
    minHeight:  height,
    maxWidth:   width,
    maxHeight:  height,
    flexShrink: 0,
    alignSelf:  'flex-start',
    lineHeight: 0,
  };
}

/** Pin control inside the fixed slot so on/off cannot shift layout. */
export function getAnchoredControlSx() {
  return {
    position: 'absolute',
    top:      0,
    left:     0,
  };
}

export function getStandardRootSx() {
  return {
    display:       'inline-flex',
    flexDirection: 'row' as const,
    alignItems:    'flex-start',
    gap:           `${spacing.lg}px`,
  };
}

// Ground truth from Figma (crv-switch-base, node 3875:1752)
export function getSwitchBaseSx(
  size: CrvSwitchBaseSize = 'medium',
  checked = false,
  disabled = false,
) {
  const { width, height } = METRICS[size];

  return {
    position:        'relative',
    width,
    height,
    minWidth:        width,
    minHeight:       height,
    p:               0,
    m:               0,
    border:          'none',
    borderRadius:    `${radius.full}px`,
    backgroundColor: getTrackColor(checked, disabled),
    cursor:          disabled ? 'not-allowed' : 'pointer',
    display:         'block',
    flexShrink:      0,
    overflow:        'visible',
    opacity:         1,
    transition:      'background-color 120ms ease',
    '&:focus-visible': {
      outline:       `2px solid ${colors.border.system}`,
      outlineOffset: 2,
    },
  };
}

export type CrvSwitchColor = 'primary' | 'error';

export function getLabelColor(color: CrvSwitchColor, disabled: boolean) {
  if (disabled) return colors.content.disabled;
  if (color === 'error') return colors.status.error.content.default;
  return colors.content.primary;
}
