import figma from '@figma/code-connect';
import { CrvCheckboxGroup } from './CrvCheckboxGroup';
import { DEFAULT_CHECKBOX_GROUP_OPTIONS } from './crvCheckboxGroupDefaults';

// Figma node: crv-checkbox-group component set
// URL: https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5374
figma.connect(
  CrvCheckboxGroup,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=3815-5374',
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
      errorMessage: figma.string('errorMessage'),
      errorMessageVisible: figma.boolean('errorMessageVisible'),
      checkbox01Visible: figma.boolean('checkbox01Visible'),
      checkbox02Visible: figma.boolean('checkbox02Visible'),
      checkbox03Visible: figma.boolean('checkbox03Visible'),
      checkbox04Visible: figma.boolean('checkbox04Visible'),
      checkbox05Visible: figma.boolean('checkbox05Visible'),
      checkbox06Visible: figma.boolean('checkbox06Visible'),
    },
    example: ({
      color,
      disabled,
      label,
      labelVisible,
      description,
      descriptionVisible,
      errorMessage,
      errorMessageVisible,
      checkbox01Visible,
      checkbox02Visible,
      checkbox03Visible,
      checkbox04Visible,
      checkbox05Visible,
      checkbox06Visible,
    }) => {
      const visibility = [
        checkbox01Visible,
        checkbox02Visible,
        checkbox03Visible,
        checkbox04Visible,
        checkbox05Visible,
        checkbox06Visible,
      ];

      return (
        <CrvCheckboxGroup
          color={color}
          disabled={disabled}
          label={label}
          labelVisible={labelVisible}
          description={description}
          descriptionVisible={descriptionVisible}
          errorMessage={errorMessage}
          errorMessageVisible={errorMessageVisible}
          options={DEFAULT_CHECKBOX_GROUP_OPTIONS.map((option, index) => ({
            ...option,
            visible: visibility[index] ?? true,
          }))}
        />
      );
    },
  },
);
