import figma from '@figma/code-connect';
import { CrvButtonSplit } from './CrvButtonSplit';

// Figma node: crv-button-split
figma.connect(
  CrvButtonSplit,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=5981-34184',
  {
    props: {
      color: figma.enum('color', { primary: 'primary', error: 'error' }),
      size: figma.enum('size', { small: 'small', medium: 'medium', large: 'large' }),
      disabled: figma.enum('state', { disabled: true }),
      children: figma.string('children'),
      startIcon: figma.boolean('startIconVisible', {
        true: figma.instance('startIcon'),
        false: undefined,
      }),
    },
    example: ({ color, size, disabled, children, startIcon }) => (
      <CrvButtonSplit
        color={color}
        size={size}
        disabled={disabled}
        startIcon={startIcon}
        triggerLabel="ตัวเลือกอื่น"
      >
        {children}
      </CrvButtonSplit>
    ),
  },
);
