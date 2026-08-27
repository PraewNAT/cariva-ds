import figma from '@figma/code-connect';
import { CrvCheckboxBase } from './CrvCheckboxBase';

// Figma node: crv-checkbox-base component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5417
figma.connect(
  CrvCheckboxBase,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5417',
  {
    props: {
      checked: figma.enum('checked', {
        true:  true,
        false: false,
      }),
      indeterminate: figma.enum('indeterminate', {
        true:  true,
        false: false,
      }),
      disabled: figma.enum('state', {
        disabled: true,
        default:  false,
        focusVisible: false,
      }),
    },
    example: ({ checked, indeterminate, disabled }) => (
      <CrvCheckboxBase
        checked={checked}
        indeterminate={indeterminate}
        disabled={disabled}
        aria-label="Checkbox"
      />
    ),
  },
);
