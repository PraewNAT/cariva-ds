import figma from '@figma/code-connect';
import { CrvSwitch } from './CrvSwitch';

// Figma node: crv-switch component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-1672
figma.connect(
  CrvSwitch,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3875-1672',
  {
    props: {
      disabled: figma.boolean('disabled'),
      color: figma.enum('color', {
        primary: 'primary',
        error:   'error',
      }),
      labelPlacement: figma.enum('labelPlacement', {
        end:   'end',
        start: 'start',
      }),
      label: figma.string('label'),
      labelVisible: figma.boolean('labelVisible'),
      description: figma.string('description'),
      descriptionVisible: figma.boolean('descriptionVisible'),
    },
    example: ({
      disabled,
      color,
      labelPlacement,
      label,
      labelVisible,
      description,
      descriptionVisible,
    }) => (
      <CrvSwitch
        disabled={disabled}
        color={color}
        labelPlacement={labelPlacement}
        label={label}
        labelVisible={labelVisible}
        description={description}
        descriptionVisible={descriptionVisible}
      />
    ),
  },
);
