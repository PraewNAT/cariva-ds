import figma from '@figma/code-connect';
import { CrvRating } from './CrvRating';

// Figma node: <Rating> component set — Rating page section 4887:4952
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4887-7022
figma.connect(
  CrvRating,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4887-7022',
  {
    props: {
      size: figma.enum('Size', {
        Small:  'small',
        'Medium*': 'medium',
        Large:  'large',
      }),
      readOnly: figma.boolean('Disabled'),
    },
    example: ({ size, readOnly }) => (
      <CrvRating size={size} readOnly={readOnly} defaultValue={2.5} precision={0.5} />
    ),
  },
);
