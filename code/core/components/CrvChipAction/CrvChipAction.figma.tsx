import figma from '@figma/code-connect';
import { CrvChipAction } from './CrvChipAction';

// Figma node: crv-chip-action component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4459-62796
figma.connect(
  CrvChipAction,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4459-62796',
  {
    props: {
      label: figma.string('label'),
      thumbnailVisible: figma.boolean('thumbnailVisible'),
      deleteVisible: figma.boolean('deleteVisible'),
      size: figma.enum('size', {
        small:  'small',
        medium: 'medium',
      }),
      color: figma.enum('color', {
        default: 'default',
        primary: 'primary',
      }),
      variant: figma.enum('variant', {
        filled:   'filled',
        outlined: 'outlined',
      }),
      disabled: figma.enum('state', {
        disabled: true,
      }),
    },
    example: ({
      label,
      thumbnailVisible,
      deleteVisible,
      size,
      color,
      variant,
      disabled,
    }) => (
      <CrvChipAction
        label={label}
        thumbnailVisible={thumbnailVisible}
        deleteVisible={deleteVisible}
        size={size}
        color={color}
        variant={variant}
        disabled={disabled}
        onDelete={() => undefined}
      />
    ),
  },
);
