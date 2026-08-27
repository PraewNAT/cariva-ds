import figma from '@figma/code-connect';
import { CrvMenuItem } from './CrvMenuItem';

// Figma node: crv-menu-item component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4454-12758
figma.connect(
  CrvMenuItem,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4454-12758',
  {
    props: {
      variant: figma.enum('variant', {
        default:  'default',
        checkbox: 'checkbox',
      }),
      selected: figma.enum('selected', {
        true:  true,
        false: false,
      }),
      disabled: figma.enum('disabled', {
        true:  true,
        false: false,
      }),
      leftIconVisible: figma.boolean('closeLefticon'),
      rightIconVisible: figma.boolean('closeRighticon'),
    },
    example: ({
      variant,
      selected,
      disabled,
      leftIconVisible,
      rightIconVisible,
    }) => (
      <CrvMenuItem
        variant={variant}
        selected={selected}
        disabled={disabled}
        leftIconVisible={leftIconVisible}
        rightIconVisible={rightIconVisible}
      >
        Menu item
      </CrvMenuItem>
    ),
  },
);
