import figma from '@figma/code-connect';
import { CrvMobileStepper, CrvStep, CrvStepper, CrvStepperIcon } from './index';

// Figma node: crv-stepper-icon
figma.connect(
  CrvStepperIcon,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4714-6245',
  {
    props: {
      state: figma.enum('state', {
        Default: 'default',
        Done:    'done',
      }),
    },
    example: ({ state }) => (
      <CrvStepperIcon state={state} value="1" />
    ),
  },
);

// Figma node: crv-stepper-base
figma.connect(
  CrvStep,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4714-6331',
  {
    props: {
      state: figma.enum('state', {
        Inactive: 'inactive',
        Active:   'active',
        Complete: 'complete',
        Error:    'error',
        Warning:  'warning',
        Info:     'info',
        Success:  'success',
      }),
      textAlign: figma.enum('text', {
        Left:   'left',
        Center: 'center',
      }),
      optional: figma.boolean('optional'),
      stepTitle: figma.string('stepTitleContent'),
      optionalContent: figma.string('optionalContent'),
    },
    example: ({
      state,
      textAlign,
      optional,
      stepTitle,
      optionalContent,
    }) => (
      <CrvStep
        state={state}
        textAlign={textAlign}
        optional={optional}
        stepTitle={stepTitle}
        optionalContent={optionalContent}
      />
    ),
  },
);

// Figma node: crv-stepper
figma.connect(
  CrvStepper,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4714-6502',
  {
    props: {
      alignment: figma.enum('alignment', {
        'Horizontal*': 'horizontal',
        Vertical:      'vertical',
      }),
      textAlign: figma.enum('text', {
        Left:   'left',
        Center: 'center',
      }),
      showOptional: figma.enum('optional', {
        false: false,
        true:  true,
      }),
      smallScreen: figma.enum('smallScreen', {
        false: false,
        true:  true,
      }),
    },
    example: ({ alignment, textAlign, showOptional, smallScreen }) => (
      <CrvStepper
        steps={[
          { label: 'Step title' },
          { label: 'Step title' },
          { label: 'Step title' },
        ]}
        activeStep={1}
        alignment={alignment}
        textAlign={textAlign}
        showOptional={showOptional}
        smallScreen={smallScreen}
      />
    ),
  },
);

// Figma node: crv-mobile-stepper
figma.connect(
  CrvMobileStepper,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4714-6420',
  {
    props: {
      progressType: figma.enum('progressType', {
        Dots:     'dots',
        Text:     'text',
        Progress: 'progress',
      }),
    },
    example: ({ progressType }) => (
      <CrvMobileStepper
        progressType={progressType}
        activeStep={0}
        steps={5}
      />
    ),
  },
);
