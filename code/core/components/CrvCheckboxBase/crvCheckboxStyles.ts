import { colors, radius, spacing, typography } from '../../tokens';
import { glow } from '../../theme/shadows';

export type CrvCheckboxColor = 'primary' | 'error';

// Ground truth from Figma (crv-checkbox-base, node 3815:5417)
export const CHECKBOX_SIZE = 16;
export const CHECKBOX_MARK_SIZE = 14;
export const CHECKBOX_RADIUS = radius['4'];

/**
 * Figma wraps the 16px control in a 20px-tall `Checkbox` frame so the box sits on
 * the label's first text line (label/medium line-height) instead of on the top of
 * its em box. Every variant of crv-checkbox-standard and crv-checkbox-card carries
 * it, which is why neither needs a per-type alignment rule any more.
 */
export const CHECKBOX_LINE_BOX = typography.lineHeight.label.medium;
const CONTROL_OFFSET_Y = (CHECKBOX_LINE_BOX - CHECKBOX_SIZE) / 2;

export function getControlSlotSx() {
  return {
    position:       'relative',
    width:          CHECKBOX_SIZE,
    height:         CHECKBOX_LINE_BOX,
    minWidth:       CHECKBOX_SIZE,
    minHeight:      CHECKBOX_LINE_BOX,
    maxWidth:       CHECKBOX_SIZE,
    maxHeight:      CHECKBOX_LINE_BOX,
    flexShrink:     0,
    alignSelf:      'flex-start',
    lineHeight:     0,
    fontSize:       0,
  };
}

/** Pin MUI SwitchBase inside the line box so check/uncheck cannot shift layout. */
export function getAnchoredControlSx() {
  return {
    position: 'absolute',
    top:      `${CONTROL_OFFSET_Y}px`,
    left:     0,
  };
}

export function getStandardRootSx() {
  return {
    display:       'inline-flex',
    flexDirection: 'row' as const,
    alignItems:    'flex-start',
    gap:           `${spacing.md}px`,
  };
}

export function getCheckboxRootSx(color: CrvCheckboxColor = 'primary') {
  const size = CHECKBOX_SIZE;
  const isError = color === 'error';
  // Figma 3815:5417 state=focusVisible: the ring is a border token, not the brand
  // fill — border/system for primary, border/error so an invalid box stays red.
  // The same state doubles as hover, so the pointer and the keyboard land on one
  // look instead of the control growing a second, undesigned treatment.
  const uncheckedFocus = isError ? colors.border.error : colors.border.system;
  const checkedFocusFill = isError
    ? colors.status.error.onSurface.pressed
    : colors.brand.primary.onSurface.pressed;
  // Figma puts the effect style glow/primary · glow/error on every focusVisible
  // variant: the halo is what makes the state readable, since error only shifts
  // one step of red without it.
  const focusGlow = glow(
    isError ? colors.status.error.onSurface.default : colors.brand.primary.onSurface.default,
  );

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
    '&:hover .crv-checkbox-box--unchecked, &.Mui-focusVisible .crv-checkbox-box--unchecked': {
      boxShadow:       `inset 0 0 0 1px ${uncheckedFocus}`,
      backgroundColor: colors.onSurface.default,
    },
    ['&.Mui-checked:hover .crv-checkbox-box, &.MuiCheckbox-indeterminate:hover .crv-checkbox-box,' +
      '&.Mui-checked.Mui-focusVisible .crv-checkbox-box, &.MuiCheckbox-indeterminate.Mui-focusVisible .crv-checkbox-box']:
      {
        backgroundColor: checkedFocusFill,
        boxShadow:       'none',
      },
    // disabled has no hover: Figma keeps the disabled box flat.
    '&.Mui-disabled': {
      opacity: 1,
    },
    // The halo sits on the root, which is the node Figma carries the effect on —
    // the inner box clips its own overflow and would swallow it.
    '&:hover, &.Mui-focusVisible': {
      boxShadow: focusGlow,
    },
    '&.Mui-disabled, &.Mui-disabled:hover': {
      boxShadow: 'none',
    },
    '&.Mui-disabled:hover .crv-checkbox-box': {
      boxShadow:       'none',
      backgroundColor: colors.onSurface.action.disabled,
    },
    '&.Mui-disabled:hover .crv-checkbox-box--unchecked': {
      boxShadow: `inset 0 0 0 1px ${colors.border.disabled}`,
    },
  };
}

export function getLabelColor(color: CrvCheckboxColor, disabled: boolean) {
  if (disabled) return colors.content.disabled;
  if (color === 'error') return colors.status.error.content.default;
  return colors.content.primary;
}
