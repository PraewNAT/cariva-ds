import figma from '@figma/code-connect';
import { CrvTextArea } from './CrvTextArea';

// Figma node: crv-text-area-standard component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4164-1571
figma.connect(
  CrvTextArea,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4164-1571',
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
      secondaryLabelVisible: figma.boolean('secondaryLabelVisible'),
      helperTextVisible: figma.boolean('helperTextVisible'),
      placeholder: figma.string('placeholder'),
      value: figma.string('value'),
    },
    example: ({
      size,
      disabled,
      error,
      secondaryLabelVisible,
      helperTextVisible,
      placeholder,
      value,
    }) => (
      <CrvTextArea
        size={size}
        disabled={disabled}
        error={error}
        label="Label"
        secondaryLabelVisible={secondaryLabelVisible}
        secondaryLabel="optional"
        helperTextVisible={helperTextVisible}
        helperText="Help text"
        errorMessage="Error message"
        placeholder={placeholder}
        value={value}
      />
    ),
  },
);
