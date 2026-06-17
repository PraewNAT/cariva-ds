import figma from '@figma/code-connect';
import { CrvAvatar } from './CrvAvatar';

// Figma node: crv-avatar component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-10055
figma.connect(
  CrvAvatar,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4315-10055',
  {
    props: {
      variant: figma.enum('variant', {
        circular: 'circular',
      }),
      content: figma.enum('content', {
        image: 'image',
        text:  'text',
        icon:  'icon',
      }),
      size: figma.enum('size', {
        large:  'large',
        medium: 'medium',
        small:  'small',
        xSmall: 'xSmall',
      }),
      badge: figma.enum('badge', {
        true:  true,
        false: false,
      }),
      initials: figma.string('initials'),
    },
    example: ({ variant, content, size, badge, initials }) => (
      <CrvAvatar
        variant={variant}
        content={content}
        size={size}
        badge={badge}
        initials={initials}
      />
    ),
  },
);
