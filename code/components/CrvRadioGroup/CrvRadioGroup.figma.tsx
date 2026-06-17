import figma from '@figma/code-connect';
import { CrvRadioGroup } from './CrvRadioGroup';
import { DEFAULT_RADIO_GROUP_OPTIONS } from './crvRadioGroupDefaults';

// Figma node: crv-radio-group component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5863
figma.connect(
  CrvRadioGroup,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5863',
  {
    props: {
      color: figma.enum('color', {
        primary: 'primary',
        error:   'error',
      }),
      disabled: figma.boolean('disabled'),
      label: figma.string('label'),
      labelVisible: figma.boolean('labelVisible'),
      description: figma.string('description'),
      descriptionVisible: figma.boolean('descriptionVisible'),
      radio01Visible: figma.boolean('radio01Visible'),
      radio02Visible: figma.boolean('radio02Visible'),
      radio03Visible: figma.boolean('radio03Visible'),
      radio04Visible: figma.boolean('radio04Visible'),
      radio05Visible: figma.boolean('radio05Visible'),
      radio06Visible: figma.boolean('radio06Visible'),
    },
    example: ({
      color,
      disabled,
      label,
      labelVisible,
      description,
      descriptionVisible,
      radio01Visible,
      radio02Visible,
      radio03Visible,
      radio04Visible,
      radio05Visible,
      radio06Visible,
    }) => {
      const visibility = [
        radio01Visible,
        radio02Visible,
        radio03Visible,
        radio04Visible,
        radio05Visible,
        radio06Visible,
      ];

      return (
        <CrvRadioGroup
          color={color}
          disabled={disabled}
          label={label}
          labelVisible={labelVisible}
          description={description}
          descriptionVisible={descriptionVisible}
          options={DEFAULT_RADIO_GROUP_OPTIONS.map((option, index) => ({
            ...option,
            visible: visibility[index] ?? true,
          }))}
        />
      );
    },
  },
);
