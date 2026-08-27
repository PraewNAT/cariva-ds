import { forwardRef, type ReactNode } from 'react';
import Box from '@mui/material/Box';
import { colors } from '../../tokens';
import { RADIO_DOT_SIZE, RADIO_RADIUS, RADIO_SIZE } from './crvRadioStyles';

const circleBase = {
  width:           RADIO_SIZE,
  height:          RADIO_SIZE,
  minWidth:        RADIO_SIZE,
  minHeight:       RADIO_SIZE,
  maxWidth:        RADIO_SIZE,
  maxHeight:       RADIO_SIZE,
  borderRadius:    `${RADIO_RADIUS}px`,
  boxSizing:       'border-box' as const,
  display:         'flex',
  alignItems:      'center',
  justifyContent:  'center',
  flexShrink:      0,
  overflow:        'hidden',
};

/** Strips MUI cloneElement `fontSize` so icon metrics cannot shift layout. */
const RadioIconShell = forwardRef<
  HTMLSpanElement,
  { children: ReactNode; fontSize?: unknown }
>(function RadioIconShell({ children, fontSize: _fontSize, ...rest }, ref) {
  return (
    <Box
      ref={ref}
      component="span"
      {...rest}
      sx={{
        display:        'inline-flex',
        alignItems:     'center',
        justifyContent: 'center',
        width:          RADIO_SIZE,
        height:         RADIO_SIZE,
        minWidth:       RADIO_SIZE,
        minHeight:      RADIO_SIZE,
        maxWidth:       RADIO_SIZE,
        maxHeight:      RADIO_SIZE,
        flexShrink:     0,
        lineHeight:     0,
        fontSize:       0,
      }}
    >
      {children}
    </Box>
  );
});

function ringColor(checked: boolean, disabled: boolean) {
  if (disabled) return colors.border.disabled;
  if (checked) return colors.brand.primary.onSurface.default;
  return colors.border.default;
}

function fillColor(disabled: boolean) {
  return disabled ? colors.onSurface.action.disabled : colors.onSurface.default;
}

function dotColor(disabled: boolean) {
  return disabled ? colors.content.disabled : colors.brand.primary.onSurface.default;
}

function renderRadioVisual(checked: boolean, disabled: boolean) {
  return (
    <RadioIconShell>
      <Box
        className={
          checked ? 'crv-radio-box' : 'crv-radio-box crv-radio-box--unchecked'
        }
        sx={{
          ...circleBase,
          backgroundColor: fillColor(disabled),
          boxShadow:       `inset 0 0 0 1px ${ringColor(checked, disabled)}`,
        }}
      >
        <Box
          className="crv-radio-dot"
          sx={{
            width:           RADIO_DOT_SIZE,
            height:          RADIO_DOT_SIZE,
            minWidth:        RADIO_DOT_SIZE,
            minHeight:       RADIO_DOT_SIZE,
            borderRadius:    '50%',
            flexShrink:      0,
            backgroundColor: checked
              ? dotColor(disabled)
              : 'transparent',
          }}
        />
      </Box>
    </RadioIconShell>
  );
}

export function uncheckedIcon(disabled = false) {
  return renderRadioVisual(false, disabled);
}

export function checkedIcon(disabled = false) {
  return renderRadioVisual(true, disabled);
}
