import { colors, radius, typography } from '../../tokens';

// Ground truth from Figma (crv-input-otp-base, node 4315:749)
export const OTP_SLOT_SIZE = 40;
export const OTP_SLOT_RADIUS = radius['12'];

export function getOtpSlotWrapperSx(disabled = false) {
  const ringColor = disabled ? colors.border.disabled : colors.border.default;

  return {
    width:           OTP_SLOT_SIZE,
    height:          OTP_SLOT_SIZE,
    minWidth:        OTP_SLOT_SIZE,
    minHeight:       OTP_SLOT_SIZE,
    maxWidth:        OTP_SLOT_SIZE,
    maxHeight:       OTP_SLOT_SIZE,
    borderRadius:    `${OTP_SLOT_RADIUS}px`,
    border:          '2px solid transparent',
    boxShadow:       `inset 0 0 0 1px ${ringColor}`,
    backgroundColor: colors.onSurface.default,
    boxSizing:       'border-box' as const,
    display:         'flex',
    alignItems:      'center',
    justifyContent:  'center',
    overflow:        'hidden',
    transition:      'box-shadow 120ms ease',
    '&:focus-within': disabled
      ? {}
      : {
          boxShadow: `inset 0 0 0 2px ${colors.border.system}`,
        },
  };
}

export function getOtpSlotInputSx(disabled = false) {
  return {
    width:        '100%',
    height:       '100%',
    border:       'none',
    outline:      'none',
    background:   'transparent',
    textAlign:    'center',
    padding:      0,
    fontFamily:   typography.fontFamily.sans,
    fontSize:     `${typography.fontSize.body.large}px`,
    lineHeight:   `${typography.lineHeight.body.large}px`,
    fontWeight:   typography.fontWeight.regular,
    color:        disabled ? colors.content.disabled : colors.content.primary,
    caretColor:   colors.brand.primary.content.default,
    MozAppearance: 'textfield',
    '&::-webkit-outer-spin-button, &::-webkit-inner-spin-button': {
      WebkitAppearance: 'none',
      margin:           0,
    },
  };
}
