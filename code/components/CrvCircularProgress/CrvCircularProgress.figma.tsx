import figma from '@figma/code-connect';
import { CrvCircularProgress } from './CrvCircularProgress';

// Figma node: crv-circular-progress component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4456-16646
figma.connect(
  CrvCircularProgress,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4456-16646',
  {
    props: {
      variant: figma.enum('variant', {
        determinate:   'determinate',
        indeterminate: 'indeterminate',
      }),
      size: figma.enum('size', {
        small:  'small',
        medium: 'medium',
        large:  'large',
      }),
      color: figma.enum('color', {
        primary: 'primary',
        error:   'error',
        success: 'success',
        warning: 'warning',
      }),
    },
    example: ({ variant, size, color }) => (
      <CrvCircularProgress variant={variant} size={size} color={color} value={60} />
    ),
  },
);
