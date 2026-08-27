import figma from '@figma/code-connect';
import { CrvAvatar } from '../CrvAvatar';
import { CrvAvatarGroup } from './CrvAvatarGroup';

// Figma node: crv-avatar-group component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4457-63950
figma.connect(
  CrvAvatarGroup,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4457-63950',
  {
    props: {
      size: figma.enum('size', {
        large:  'large',
        medium: 'medium',
        small:  'small',
        xSmall: 'xSmall',
      }),
      max: figma.enum('max', {
        '2': 2,
        '3': 3,
        '4': 4,
        '5': 5,
      }),
    },
    example: ({ size, max }) => (
      <CrvAvatarGroup size={size} max={max}>
        <CrvAvatar content="text" initials="AB" />
        <CrvAvatar content="text" initials="CD" />
        <CrvAvatar content="text" initials="EF" />
        <CrvAvatar content="text" initials="GH" />
        <CrvAvatar content="text" initials="IJ" />
      </CrvAvatarGroup>
    ),
  },
);
