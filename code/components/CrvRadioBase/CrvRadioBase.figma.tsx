import figma from '@figma/code-connect';
import { CrvRadioBase } from './CrvRadioBase';

// Figma node: crv-radio-base component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3848-6592
figma.connect(
  CrvRadioBase,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3848-6592',
  {
    props: {
      checked: figma.enum('checked', {
        true:  true,
        false: false,
      }),
      disabled: figma.enum('state', {
        disabled:     true,
        default:      false,
        focusVisible: false,
      }),
    },
    example: ({ checked, disabled }) => (
      <CrvRadioBase
        checked={checked}
        disabled={disabled}
        aria-label="Radio option"
      />
    ),
  },
);
