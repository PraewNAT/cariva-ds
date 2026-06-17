import figma from '@figma/code-connect';
import { CrvLinearProgress } from './CrvLinearProgress';

// Figma node: crv-linear-progress component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4456-16573
figma.connect(
  CrvLinearProgress,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4456-16573',
  {
    props: {
      variant: figma.enum('variant', {
        determinate:   'determinate',
        indeterminate: 'indeterminate',
        buffer:        'buffer',
      }),
      color: figma.enum('color', {
        primary: 'primary',
        error:   'error',
        success: 'success',
        warning: 'warning',
      }),
    },
    example: ({ variant, color }) => (
      <CrvLinearProgress variant={variant} color={color} value={60} valueBuffer={80} />
    ),
  },
);
