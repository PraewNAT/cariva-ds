import { colors, radius, spacing } from '../../tokens';

export type CrvCheckboxColor = 'primary' | 'error';
export type CrvCheckboxLayoutType = 'default' | 'groupItem';

// Ground truth from Figma (crv-checkbox-base, node 3815:5417)
export const CHECKBOX_SIZE = 16;
export const CHECKBOX_MARK_SIZE = 14;
export const CHECKBOX_RADIUS = radius['4'];

export function getControlSlotSx(type: CrvCheckboxLayoutType = 'default') {
  return {
    position:       'relative',
    width:          CHECKBOX_SIZE,
    height:         CHECKBOX_SIZE,
    minWidth:       CHECKBOX_SIZE,
    minHeight:      CHECKBOX_SIZE,
    maxWidth:       CHECKBOX_SIZE,
    maxHeight:      CHECKBOX_SIZE,
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

export function getStandardRootSx(type: CrvCheckboxLayoutType = 'default') {
  return {
    display:       'inline-flex',
    flexDirection: 'row' as const,
    alignItems:    type === 'groupItem' ? 'center' : 'flex-start',
    gap:           `${spacing.md}px`,
  };
}

export function getCheckboxRootSx() {
  const size = CHECKBOX_SIZE;

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
      // MUI SwitchBase defaults to borderRadius: 50% (radio-style). Override to
      // Figma radius/4 so overflow:hidden clips a rounded square, not a circle.
      borderRadius:    `${CHECKBOX_RADIUS}px`,
      overflow:        'hidden',
    },
    '&.Mui-checked, &.MuiCheckbox-indeterminate, &.Mui-disabled': {
      p:        0,
      width:    size,
      height:   size,
      minWidth: size,
      minHeight: size,
    },
    color: 'transparent',
    '& .crv-checkbox-box': {
      width:           size,
      height:          size,
      minWidth:        size,
      minHeight:       size,
      maxWidth:        size,
      maxHeight:       size,
      borderRadius:    `${CHECKBOX_RADIUS}px`,
    },
    '&:hover .crv-checkbox-box--unchecked': {
      boxShadow: `inset 0 0 0 1px ${colors.border.strong}`,
    },
    '&.Mui-focusVisible .crv-checkbox-box--unchecked': {
      boxShadow:       `inset 0 0 0 1px ${colors.brand.primary.onSurface.default}`,
      backgroundColor: colors.onSurface.default,
    },
    '&.Mui-checked.Mui-focusVisible .crv-checkbox-box, &.MuiCheckbox-indeterminate.Mui-focusVisible .crv-checkbox-box':
      {
        backgroundColor: colors.brand.primary.onSurface.pressed,
        boxShadow:       'none',
      },
    '&.Mui-disabled': {
      opacity: 1,
    },
  };
}

export function getLabelColor(color: CrvCheckboxColor, disabled: boolean) {
  if (disabled) return colors.content.disabled;
  if (color === 'error') return colors.status.error.content.default;
  return colors.content.primary;
}
