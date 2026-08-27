import figma from '@figma/code-connect';
import { CrvBottomSheet } from './CrvBottomSheet';

// Figma node: crv-bottom-sheet-header component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4485-31705
figma.connect(
  CrvBottomSheet,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4485-31705',
  {
    props: {
      variant: figma.enum('type', {
        Default: 'default',
        Search: 'search',
      }),
      showHeaderGradient: figma.boolean('showTopColor'),
    },
    example: ({ variant, showHeaderGradient }) => (
      <CrvBottomSheet
        open
        variant={variant}
        showHeaderGradient={showHeaderGradient}
        title="Select a city"
      >
        {/* content slot */}
      </CrvBottomSheet>
    ),
  },
);
