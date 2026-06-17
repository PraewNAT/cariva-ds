import figma from '@figma/code-connect';
import { CrvButtonIcon } from './CrvButtonIcon';

// Figma node: crv-button-icon component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3730-5246
figma.connect(
  CrvButtonIcon,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3730-5246',
  {
    props: {
      variant: figma.enum('variant', {
        contained: 'contained',
        outlined: 'outlined',
        ghost: 'ghost',
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
    },
    example: ({ variant, color, size, disabled }) => (
      <CrvButtonIcon
        variant={variant}
        color={color}
        size={size}
        disabled={disabled}
        aria-label="action"
      >
        {/* TODO: replace with actual icon */}
        <span />
      </CrvButtonIcon>
    ),
  },
);
