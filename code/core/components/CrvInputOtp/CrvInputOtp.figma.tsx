import figma from '@figma/code-connect';
import { CrvInputOtp } from './CrvInputOtp';

// Figma node: crv-input-otp-standard component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-1164
figma.connect(
  CrvInputOtp,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-1164',
  {
    props: {
      error: figma.enum('state', {
        error:   true,
        default: false,
      }),
      label: figma.string('label'),
      helperText: figma.string('helperText'),
      errorMessage: figma.string('errorMessage'),
    },
    example: ({ error, label, helperText, errorMessage }) => (
      <CrvInputOtp
        error={error}
        label={label}
        helperText={helperText}
        helperTextVisible
        errorMessage={errorMessage}
      />
    ),
  },
);
