import { forwardRef, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import { colors } from '../../tokens';
import type { CrvCheckboxColor } from './crvCheckboxStyles';
import { CHECKBOX_MARK_SIZE, CHECKBOX_RADIUS, CHECKBOX_SIZE } from './crvCheckboxStyles';

export function CheckboxCheckMark() {
  // Figma check (3646:19997) Style=rounded — bbox in 14×14: x≈2.23 y≈3.50 w≈9.77 h≈7.34
  return (
    <svg
      width={CHECKBOX_MARK_SIZE}
      height={CHECKBOX_MARK_SIZE}
      viewBox="0 0 14 14"
      aria-hidden
      style={{ display: 'block' }}
    >
      <path
        fill="currentColor"
        d="M5.34 9.3 3.04 7.02 2.23 7.78 5.34 10.84 12.01 4.24 11.24 3.5Z"
      />
    </svg>
  );
}

export function CheckboxRemoveMark() {
  return (
    <svg
      width={CHECKBOX_MARK_SIZE}
      height={CHECKBOX_MARK_SIZE}
      viewBox="0 0 14 14"
      aria-hidden
      style={{ display: 'block' }}
    >
      <rect x="2.92" y="6.42" width="8.17" height="1.17" rx="0.58" fill="currentColor" />
    </svg>
  );
}

const boxBase = {
  width:           CHECKBOX_SIZE,
  height:          CHECKBOX_SIZE,
  minWidth:        CHECKBOX_SIZE,
  minHeight:       CHECKBOX_SIZE,
  maxWidth:        CHECKBOX_SIZE,
  maxHeight:       CHECKBOX_SIZE,
  borderRadius:    `${CHECKBOX_RADIUS}px`,
  boxSizing:       'border-box' as const,
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'center',
  flexShrink:      0,
  overflow:        'hidden',
};

/** Strips MUI cloneElement `fontSize` so icon metrics cannot shift layout. */
const CheckboxIconShell = forwardRef<
  HTMLSpanElement,
  { children: ReactNode; fontSize?: unknown }
>(function CheckboxIconShell({ children, fontSize: _fontSize, ...rest }, ref) {
  return (
    <Box
      ref={ref}
      component="span"
      {...rest}
      sx={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          CHECKBOX_SIZE,
        height:         CHECKBOX_SIZE,
        minWidth:       CHECKBOX_SIZE,
        minHeight:      CHECKBOX_SIZE,
        maxWidth:       CHECKBOX_SIZE,
        maxHeight:      CHECKBOX_SIZE,
        flexShrink:     0,
        lineHeight:     0,
        fontSize:       0,
      }}
    >
      {children}
    </Box>
  );
});

function markColor(disabled: boolean) {
  return disabled ? colors.content.disabled : colors.content.onBrand;
}

function checkedFillColor(disabled: boolean) {
  return disabled
    ? colors.onSurface.action.disabled
    : colors.brand.primary.onSurface.default;
}

function uncheckedBorderColor(disabled: boolean, color: CrvCheckboxColor) {
  if (disabled) return colors.border.disabled;
  if (color === 'error') return colors.border.error;
  return colors.border.default;
}

function renderMark(checked: boolean, indeterminate: boolean) {
  if (indeterminate) {
    return <CheckboxRemoveMark />;
  }
  if (checked) {
    return <CheckboxCheckMark />;
  }
  return null;
}

function renderCheckboxVisual(
  checked: boolean,
  indeterminate: boolean,
  disabled: boolean,
  color: CrvCheckboxColor,
) {
  const isCheckedVisual = checked || indeterminate;
  const isUnchecked = !isCheckedVisual;

  return (
    <CheckboxIconShell>
      <Box
        className={
          isUnchecked
            ? 'crv-checkbox-box crv-checkbox-box--unchecked'
            : 'crv-checkbox-box'
        }
        sx={{
          ...boxBase,
          boxShadow: isUnchecked
            ? `inset 0 0 0 1px ${uncheckedBorderColor(disabled, color)}`
            : disabled
              ? `inset 0 0 0 1px ${colors.border.disabled}`
              : 'none',
          backgroundColor: isCheckedVisual
            ? checkedFillColor(disabled)
            : disabled
              ? colors.onSurface.action.disabled
              : 'transparent',
          color: isCheckedVisual ? markColor(disabled) : undefined,
        }}
      >
        <Box
          sx={{
            width:          CHECKBOX_MARK_SIZE,
            height:         CHECKBOX_MARK_SIZE,
            minWidth:       CHECKBOX_MARK_SIZE,
            minHeight:      CHECKBOX_MARK_SIZE,
            display:        'flex',
            alignItems:     'center',
            justifyContent: 'center',
            flexShrink:     0,
            lineHeight:     0,
            visibility:     isCheckedVisual ? 'visible' : 'hidden',
          }}
        >
          {renderMark(checked, indeterminate)}
        </Box>
      </Box>
    </CheckboxIconShell>
  );
}

export function uncheckedIcon(disabled = false, color: CrvCheckboxColor = 'primary') {
  return renderCheckboxVisual(false, false, disabled, color);
}

export function checkedIcon(disabled = false) {
  return renderCheckboxVisual(true, false, disabled, 'primary');
}

export function indeterminateIcon(disabled = false) {
  return renderCheckboxVisual(false, true, disabled, 'primary');
}
