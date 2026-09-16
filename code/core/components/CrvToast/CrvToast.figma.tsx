import figma from '@figma/code-connect';
import { CrvToast } from './CrvToast';

// Figma node: crv-toast-standard component set (Toast page)
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=6413-55828
figma.connect(
  CrvToast,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=6413-55828',
  {
    props: {
      variant: figma.enum('Variant', {
        Filled: 'filled',
        Outlined: 'outlined',
        Standard: 'standard',
      }),
      severity: figma.enum('Severity', {
        Error: 'error',
        Warning: 'warning',
        Info: 'info',
        Success: 'success',
        Notification: 'notification',
      }),
      title: figma.boolean('Title?', {
        true: figma.string('↳ Title'),
        false: undefined,
      }),
      description: figma.boolean('Description?', {
        true: figma.string('↳ Description'),
        false: undefined,
      }),
      action: figma.boolean('Action?', {
        true: figma.instance('↳Instance'),
        false: undefined,
      }),
      // Code Connect allows no logic in the example, so the handler itself is
      // mapped here — present when the toggle is on, absent when it is off.
      onClose: figma.boolean('On Close?', {
        true: () => {},
        false: undefined,
      }),
    },
    example: ({ variant, severity, title, description, action, onClose }) => (
      <CrvToast
        variant={variant}
        severity={severity}
        title={title}
        description={description}
        action={action}
        onClose={onClose}
      />
    ),
  },
);
