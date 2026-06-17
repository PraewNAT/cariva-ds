import figma from '@figma/code-connect';
import { CrvButton } from './CrvButton';

// Figma node: crv-button-standard component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3646-28000
figma.connect(
  CrvButton,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3646-28000',
  {
    props: {
      variant: figma.enum('variant', {
        contained: 'contained',
        outlined: 'outlined',
        text: 'text',
      }),
      color: figma.enum('color', {
        primary: 'primary',
        error: 'error',
      }),
      size: figma.enum('size', {
        small: 'small',
        medium: 'medium',
        large: 'large',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
      children: figma.textContent('label'),
    },
    example: ({ variant, color, size, disabled, children }) => (
      <CrvButton variant={variant} color={color} size={size} disabled={disabled}>
        {children}
      </CrvButton>
    ),
  },
);
