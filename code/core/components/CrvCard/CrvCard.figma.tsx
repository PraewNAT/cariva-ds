import figma from '@figma/code-connect';
import { CrvCard } from './CrvCard';

// Figma node: crv-card-horizontal component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4570-20745
figma.connect(
  CrvCard,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4570-20745',
  {
    props: {
      imagePosition: figma.enum('type', {
        'default-right': 'right',
        'default-left': 'left',
        imgAbsolute: 'absolute',
      }),
      showTag: figma.boolean('showTag'),
      showTopMessage: figma.boolean('showTopMessage'),
      showDescription: figma.boolean('showDescription'),
      showImage: figma.boolean('ShowImg'),
    },
    example: ({ imagePosition, showTag, showTopMessage, showDescription, showImage }) => (
      <CrvCard
        orientation="horizontal"
        imagePosition={imagePosition}
        showTag={showTag}
        showTopMessage={showTopMessage}
        showDescription={showDescription}
        showImage={showImage}
        tag="Label"
        topMessage="Update 12 มิ.ย.67  15:28 น."
        header="Header"
        description="Description"
      />
    ),
  },
);

// Figma node: crv-card-vertical component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4657-31022
figma.connect(
  CrvCard,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4657-31022',
  {
    props: {
      showTag: figma.boolean('showTag'),
      showImage: figma.boolean('showImg'),
    },
    example: ({ showTag, showImage }) => (
      <CrvCard
        orientation="vertical"
        showTag={showTag}
        showImage={showImage}
        tag="Label"
        header="Header"
        description="Description"
      />
    ),
  },
);
