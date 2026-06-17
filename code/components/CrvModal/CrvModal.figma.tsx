import figma from '@figma/code-connect';
import { CrvModal } from './CrvModal';

// Figma node: crv-modal component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4712-1805
figma.connect(
  CrvModal,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4712-1805',
  {
    props: {
      type: figma.enum('type', {
        default:     'default',
        alignCenter: 'alignCenter',
      }),
      breakpoint: figma.enum('breakpoint', {
        sm:  'sm',
        'md+': 'md+',
      }),
      showContent: figma.boolean('showContent'),
      showDescription: figma.boolean('showDescription'),
      showIcon: figma.boolean('showIcon'),
      showCTA: figma.boolean('showCTA'),
    },
    example: ({ type, breakpoint, showContent, showDescription, showIcon, showCTA }) => (
      <CrvModal
        open
        type={type}
        breakpoint={breakpoint}
        showContent={showContent}
        showDescription={showDescription}
        showIcon={showIcon}
        showCTA={showCTA}
        title="Header"
        description="Description"
      />
    ),
  },
);
