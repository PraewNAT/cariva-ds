import figma from '@figma/code-connect';
import { CrvBadge } from './CrvBadge';

// Figma node: crv-badge component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4518-82967
figma.connect(
  CrvBadge,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4518-82967',
  {
    props: {
      variant: figma.enum('variant', {
        dot:      'dot',
        standard: 'standard',
      }),
      color: figma.enum('color', {
        primary: 'primary',
        error:   'error',
        success: 'success',
        warning: 'warning',
        info:    'info',
        default: 'default',
      }),
      badgeContent: figma.string('badgeContent'),
    },
    example: ({ variant, color, badgeContent }) => (
      <CrvBadge
        variant={variant}
        color={color}
        badgeContent={badgeContent}
      />
    ),
  },
);
