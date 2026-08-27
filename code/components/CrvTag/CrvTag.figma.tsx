import figma from '@figma/code-connect';
import { CrvTag, CrvTagColor } from './CrvTag';

// Figma node: crv-tag-standard component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4459-31603
figma.connect(
  CrvTag,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4459-31603',
  {
    props: {
      variant: figma.enum('variant', {
        filled:   'filled',
        outlined: 'outlined',
      }),
      color: figma.enum('color', {
        default:   'default',
        secondary: 'secondary',
        error:     'error',
        success:   'success',
        warning:   'warning',
      }),
      content: figma.enum('children', {
        label:  'label',
        number: 'number',
      }),
      size: figma.enum('size', {
        small:  'small',
        medium: 'medium',
        large:  'large',
      }),
      label: figma.string('label'),
      badgeContent: figma.string('badgeContent'),
      startIconVisible: figma.boolean('startIconVisible'),
      endIconVisible: figma.boolean('endIconVisible'),
    },
    example: ({
      variant,
      color,
      content,
      size,
      label,
      badgeContent,
      startIconVisible,
      endIconVisible,
    }) => (
      <CrvTag
        variant={variant}
        color={color}
        content={content}
        size={size}
        label={label}
        badgeContent={badgeContent}
        startIconVisible={startIconVisible}
        endIconVisible={endIconVisible}
      />
    ),
  },
);

// Figma node: crv-tag-color component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3936-5879
figma.connect(
  CrvTagColor,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3936-5879',
  {
    props: {
      color: figma.enum('color', {
        primary: 'primary',
        sky:     'sky',
        cyan:    'cyan',
        pink:    'pink',
        purple:  'purple',
        emerald: 'emerald',
        amber:   'amber',
        orange:  'orange',
      }),
    },
    example: ({ color }) => (
      <CrvTagColor color={color} label="Label" />
    ),
  },
);
