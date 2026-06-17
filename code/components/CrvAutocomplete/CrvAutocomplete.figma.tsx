import figma from '@figma/code-connect';
import { CrvAutocomplete } from './CrvAutocomplete';

// Figma node: crv-autocomplete component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4454-12745
figma.connect(
  CrvAutocomplete,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4454-12745',
  {
    props: {
      size: figma.enum('size', {
        small:  'small',
        medium: 'medium',
      }),
      disabled: figma.enum('disabled', {
        true:  true,
        false: false,
      }),
      error: figma.enum('error', {
        true:  true,
        false: false,
      }),
      helperTextVisible: figma.boolean('helperTextVisible'),
    },
    example: ({ size, disabled, error, helperTextVisible }) => (
      <CrvAutocomplete
        size={size}
        disabled={disabled}
        error={error}
        label="Label"
        placeholder="Search or select..."
        helperTextVisible={helperTextVisible}
        helperText="Helper text"
        errorMessage="Error message"
        options={[
          { value: 'a', label: 'Option A' },
          { value: 'b', label: 'Option B' },
        ]}
      />
    ),
  },
);
