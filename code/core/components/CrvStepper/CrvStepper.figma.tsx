import figma from '@figma/code-connect';
import { CrvStepperCompact, CrvStep, CrvStepper, CrvStepperMarker } from './index';

// Figma node: crv-stepper-marker
figma.connect(
  CrvStepperMarker,
  'https://www.figma.com/design/XgxprkSY5mGbzIIwlmscCt/Cariva-Core-Design-System?node-id=4714-6245',
  {
    props: {
      status: figma.enum('status', {
        Default: 'default',
        Active:  'active',
        Done:    'done',
        Error:   'error',
        Warning: 'warning',
        Info:    'info',
        Success: 'success',
      }),
      content: figma.enum('content', {
        number: 'number',
        icon:   'icon',
      }),
      // `icon` is a plain child instance, not an instance-swap property, so
      // there is nothing to bind to — `figma.instance('icon')` emitted a bare
      // `icon={}` into the snippet. The consumer passes their own icon; the
      // number variants take a value instead.
      value: figma.enum('content', {
        number: '1',
        icon:   undefined,
      }),
    },
    example: ({ status, content, value }) => (
      <CrvStepperMarker status={status} content={content} value={value} />
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

// Figma node: crv-stepper-compact
figma.connect(
  CrvStepperCompact,
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
      <CrvStepperCompact
        progressType={progressType}
        activeStep={0}
        steps={5}
      />
    ),
  },
);
