import figma from '@figma/code-connect';
import { CrvSwitchBase } from './CrvSwitchBase';

// Figma node: crv-switch-base component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-1752
figma.connect(
  CrvSwitchBase,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-1752',
  {
    props: {
      checked: figma.enum('checked', {
        true:  true,
        false: false,
      }),
      size: figma.enum('size', {
        medium: 'medium',
        small:  'small',
      }),
      disabled: figma.enum('state', {
        disabled:     true,
        default:      false,
        focusVisible: false,
      }),
    },
    example: ({ checked, size, disabled }) => (
      <CrvSwitchBase
        checked={checked}
        size={size}
        disabled={disabled}
        inputProps={{ 'aria-label': 'Toggle setting' }}
      />
    ),
  },
);
