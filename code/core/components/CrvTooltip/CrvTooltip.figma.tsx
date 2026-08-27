import figma from '@figma/code-connect';
import { CrvTooltip, CrvTooltipWithActionPanel } from './CrvTooltip';

// Figma node: crv-tooltip-standard component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-398
figma.connect(
  CrvTooltip,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-398',
  {
    props: {
      placement: figma.enum('placement', {
        top:    'top',
        bottom: 'bottom',
        left:   'left',
        right:  'right',
        none:   'none',
      }),
    },
    example: ({ placement }) => (
      <CrvTooltip placement={placement} title="My Tooltip">
        <span>Anchor</span>
      </CrvTooltip>
    ),
  },
);

// Figma node: crv-tooltip-with-action component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-3485
figma.connect(
  CrvTooltipWithActionPanel,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-3485',
  {
    props: {
      step: figma.string('step'),
      content: figma.string('content'),
    },
    example: ({ step, content }) => (
      <CrvTooltipWithActionPanel step={step} content={content} />
    ),
  },
);
