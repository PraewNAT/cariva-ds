import { colors, radius, spacing } from '../../tokens';

export type CrvRadioColor = 'primary' | 'error';
export type CrvRadioLayoutType = 'default' | 'groupItem';

// Ground truth from Figma (crv-radio-base, node 3848:6592)
export const RADIO_SIZE = 16;
export const RADIO_DOT_SIZE = 10;
export const RADIO_RADIUS = radius.full;

export function getControlSlotSx(type: CrvRadioLayoutType = 'default') {
  return {
    position:       'relative',
    width:          RADIO_SIZE,
    height:         RADIO_SIZE,
    minWidth:       RADIO_SIZE,
    minHeight:      RADIO_SIZE,
    maxWidth:       RADIO_SIZE,
    maxHeight:      RADIO_SIZE,
    flexShrink:     0,
    alignSelf:      type === 'groupItem' ? 'center' : 'flex-start',
    lineHeight:     0,
    fontSize:       0,
  };
}

/** Pin MUI SwitchBase inside the fixed control slot so check/uncheck cannot shift layout. */
export function getAnchoredControlSx() {
  return {
    position: 'absolute',
    top:      0,
    left:     0,
  };
}

export function getStandardRootSx(type: CrvRadioLayoutType = 'default') {
  return {
    display:       'inline-flex',
    flexDirection: 'row' as const,
    alignItems:    type === 'groupItem' ? 'center' : 'flex-start',
    gap:           `${spacing.md}px`,
  };
}

export function getRadioRootSx() {
  const size = RADIO_SIZE;

  return {
    '&&': {
      p:               0,
      m:               0,
      width:           size,
      height:          size,
      minWidth:        size,
      minHeight:       size,
      maxWidth:        size,
      maxHeight:       size,
      flexShrink:      0,
      boxSizing:       'border-box',
      display:         'inline-flex',
      alignItems:      'center',
      justifyContent:  'center',
      lineHeight:      0,
      verticalAlign:   'top',
      overflow:        'hidden',
    },
    '&.Mui-checked, &.Mui-disabled': {
      p:        0,
      width:    size,
      height:   size,
      minWidth: size,
      minHeight: size,
    },
    color: 'transparent',
    '& .crv-radio-box': {
      width:           size,
      height:          size,
      minWidth:        size,
      minHeight:       size,
      maxWidth:        size,
      maxHeight:       size,
    },
    '&:hover:not(.Mui-disabled) .crv-radio-box--unchecked': {
      boxShadow: `inset 0 0 0 1px ${colors.border.strong}`,
    },
    '&.Mui-focusVisible:not(.Mui-checked) .crv-radio-box--unchecked': {
      boxShadow:       `inset 0 0 0 1px ${colors.border.system}`,
      backgroundColor: colors.onSurface.default,
    },
    '&.Mui-checked.Mui-focusVisible .crv-radio-box': {
      boxShadow:       `inset 0 0 0 2px ${colors.border.system}`,
      backgroundColor: colors.onSurface.default,
    },
    '&.Mui-disabled': {
      opacity: 1,
    },
  };
}

export function getLabelColor(color: CrvRadioColor, disabled: boolean) {
  if (disabled) return colors.content.disabled;
  if (color === 'error') return colors.status.error.content.default;
  return colors.content.primary;
}
