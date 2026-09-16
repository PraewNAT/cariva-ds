import figma from '@figma/code-connect';
import { CrvDrawer } from './CrvDrawer';

// Figma node: crv-drawer component
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4497-77989
figma.connect(
  CrvDrawer,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4497-77989',
  {
    props: {
      children: figma.children(['contentSlot']),
    },
    example: ({ children }) => (
      <CrvDrawer open onClose={() => {}}>
        {children}
      </CrvDrawer>
    ),
  },
);
