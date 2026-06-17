import figma from '@figma/code-connect';
import { CheckboxCheckMark, CheckboxRemoveMark } from './crvCheckboxIcons';

// Figma Material icon: check (Style=rounded used in crv-checkbox-base)
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3646-19997
figma.connect(
  CheckboxCheckMark,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3646-19997',
  {
    props: {
      style: figma.enum('Style', {
        rounded: 'rounded',
      }),
    },
    example: () => <CheckboxCheckMark />,
  },
);

// Figma Material icon: remove (indeterminate dash in crv-checkbox-base)
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3646-11388
figma.connect(
  CheckboxRemoveMark,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3646-11388',
  {
    props: {
      style: figma.enum('Style', {
        rounded: 'rounded',
      }),
    },
    example: () => <CheckboxRemoveMark />,
  },
);
