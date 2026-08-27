import figma from '@figma/code-connect';
import { CrvInputHorizontal } from './CrvInputHorizontal';

// Figma node: crv-input-horizontal component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3760-6895
figma.connect(
  CrvInputHorizontal,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3760-6895',
  {
    props: {
      size: figma.enum('size', {
        small:  'small',
        medium: 'medium',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      error: figma.enum('state', {
        error: true,
      }),
      startAdornmentVisible: figma.boolean('startAdornmentVisible'),
      helperTextVisible: figma.boolean('helperTextVisible'),
      placeholder: figma.string('placeholder'),
      value: figma.string('value'),
    },
    example: ({
      size,
      disabled,
      error,
      startAdornmentVisible,
      helperTextVisible,
      placeholder,
      value,
    }) => (
      <CrvInputHorizontal
        size={size}
        disabled={disabled}
        error={error}
        label="Label"
        labelWidth={120}
        startAdornmentVisible={startAdornmentVisible}
        helperTextVisible={helperTextVisible}
        helperText="Help text"
        errorMessage="Error message"
        placeholder={placeholder}
        value={value}
      />
    ),
  },
);
