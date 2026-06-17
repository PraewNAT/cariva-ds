import figma from '@figma/code-connect';
import { CrvCheckbox } from './CrvCheckbox';

// Figma node: crv-checkbox-standard component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5291
figma.connect(
  CrvCheckbox,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5291',
  {
    props: {
      type: figma.enum('type', {
        default:   'default',
        groupItem: 'groupItem',
      }),
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
      type,
      disabled,
      color,
      labelPlacement,
      label,
      labelVisible,
      description,
      descriptionVisible,
    }) => (
      <CrvCheckbox
        type={type}
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
