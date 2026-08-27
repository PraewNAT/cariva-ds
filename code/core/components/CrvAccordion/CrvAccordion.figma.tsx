import figma from '@figma/code-connect';
import { CrvAccordion } from './CrvAccordion';

// Figma node: crv-accordion-standard component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-191
figma.connect(
  CrvAccordion,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4167-191',
  {
    props: {
      expanded: figma.enum('expanded', {
        true:  true,
        false: false,
      }),
      showIcon: figma.boolean('showIcon'),
    },
    example: ({ expanded, showIcon }) => (
      <CrvAccordion
        expanded={expanded}
        showIcon={showIcon}
        title="Is it accessible?"
      >
        Yes. It adheres to the WAI-ARIA design pattern.
      </CrvAccordion>
    ),
  },
);
