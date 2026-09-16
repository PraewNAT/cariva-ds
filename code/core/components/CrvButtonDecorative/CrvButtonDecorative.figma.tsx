import figma from '@figma/code-connect';
import { CrvButtonDecorative } from './CrvButtonDecorative';

// Figma node: crv-button-decorative
figma.connect(
  CrvButtonDecorative,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=5844-33868',
  {
    props: {
      size: figma.enum('size', { small: 'small', medium: 'medium', large: 'large' }),
      disabled: figma.enum('state', { disabled: true }),
      children: figma.string('children'),
      startIcon: figma.boolean('startIconVisible', {
        true: figma.instance('startIcon'),
        false: undefined,
      }),
      endIcon: figma.boolean('endIconVisible', {
        true: figma.instance('endIcon'),
        false: undefined,
      }),
    },
    example: ({ size, disabled, children, startIcon, endIcon }) => (
      <CrvButtonDecorative size={size} disabled={disabled} startIcon={startIcon} endIcon={endIcon}>
        {children}
      </CrvButtonDecorative>
    ),
  },
);
