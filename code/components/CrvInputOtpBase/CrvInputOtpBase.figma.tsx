import figma from '@figma/code-connect';
import { CrvInputOtpBase } from './CrvInputOtpBase';

// Figma node: crv-input-otp-base component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-749
figma.connect(
  CrvInputOtpBase,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-749',
  {
    props: {
      disabled: figma.enum('state', {
        disabled:       true,
        default:        false,
        filled:         false,
        focused:        false,
        focusedFilled:  false,
      }),
    },
    example: ({ disabled }) => (
      <CrvInputOtpBase
        disabled={disabled}
        value=""
        aria-label="OTP digit"
      />
    ),
  },
);
