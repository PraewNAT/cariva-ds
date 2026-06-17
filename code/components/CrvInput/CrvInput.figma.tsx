import figma from '@figma/code-connect';
import { CrvInput } from './CrvInput';

// Figma node: crv-input-standard component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3760-6623
figma.connect(
  CrvInput,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3760-6623',
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
      labelVisible: figma.boolean('labelVisible'),
      secondaryLabelVisible: figma.boolean('secondaryLabelVisible'),
      startAdornmentVisible: figma.boolean('startAdornmentVisible'),
      helperTextVisible: figma.boolean('helperTextVisible'),
      placeholder: figma.string('placeholder'),
      value: figma.string('value'),
    },
    example: ({
      size,
      disabled,
      error,
      labelVisible,
      secondaryLabelVisible,
      startAdornmentVisible,
      helperTextVisible,
      placeholder,
      value,
    }) => (
      <CrvInput
        size={size}
        disabled={disabled}
        error={error}
        labelVisible={labelVisible}
        label="Label"
        secondaryLabelVisible={secondaryLabelVisible}
        secondaryLabel="optional"
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
