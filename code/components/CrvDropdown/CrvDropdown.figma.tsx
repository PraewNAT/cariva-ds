import figma from '@figma/code-connect';
import { CrvDropdown } from './CrvDropdown';

// Figma node: crv-dropdown component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-3909
figma.connect(
  CrvDropdown,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-3909',
  {
    props: {
      size: figma.enum('size', {
        small:  'small',
        medium: 'medium',
      }),
      error: figma.enum('error', {
        true:  true,
        false: false,
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      labelVisible: figma.boolean('labelVisible'),
      helperTextVisible: figma.boolean('helperTextVisible'),
      errorMessageVisible: figma.boolean('errorMessageVisible'),
      label: figma.string('label'),
      placeholder: figma.string('content'),
      helperText: figma.string('helperText'),
      errorMessage: figma.string('errorMessage'),
    },
    example: ({
      size,
      error,
      disabled,
      labelVisible,
      helperTextVisible,
      errorMessageVisible,
      label,
      placeholder,
      helperText,
      errorMessage,
    }) => (
      <CrvDropdown
        size={size}
        error={error}
        disabled={disabled}
        labelVisible={labelVisible}
        label={label}
        placeholder={placeholder}
        helperTextVisible={helperTextVisible}
        helperText={helperText}
        errorMessageVisible={errorMessageVisible}
        errorMessage={errorMessage}
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />
    ),
  },
);
