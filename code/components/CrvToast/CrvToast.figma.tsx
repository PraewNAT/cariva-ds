import figma from '@figma/code-connect';
import { CrvToast } from './CrvToast';

// Figma node: crv-alert-standard component set (Toast page)
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4165-5387
figma.connect(
  CrvToast,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4165-5387',
  {
    props: {
      variant: figma.enum('variant', {
        primary:   'primary',
        secondary: 'secondary',
      }),
      severity: figma.enum('severity', {
        error:   'error',
        info:    'info',
        success: 'success',
        warning: 'warning',
      }),
      showAction: figma.boolean('showAction'),
    },
    example: ({ variant, severity, showAction }) => (
      <CrvToast variant={variant} severity={severity} showAction={showAction}>
        Title
      </CrvToast>
    ),
  },
);
