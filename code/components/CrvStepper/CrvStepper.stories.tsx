'use client';

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Stepper from '@mui/material/Stepper';
import {
  CrvMobileStepper,
  CrvStep,
  CrvStepper,
  CrvStepperIcon,
} from './index';
import type {
  CrvMobileStepperProgressType,
  CrvStepState,
  CrvStepTextAlign,
} from './CrvStepper.types';

const STEP_STATES: CrvStepState[] = [
  'inactive',
  'active',
  'complete',
  'error',
  'warning',
  'info',
  'success',
];

const DEMO_STEPS = [
  { label: 'Step title' },
  { label: 'Step title' },
  { label: 'Step title' },
];

const meta: Meta<typeof CrvStepper> = {
  title: 'Navigation/CrvStepper',
  component: CrvStepper,
  parameters: {
    docs: {
      description: {
        component:
          'Multi-step progress indicator. Maps to Figma Stepper page node 4714:6228.',
      },
    },
    controls: {
      include: ['activeStep', 'alignment', 'textAlign', 'showOptional', 'smallScreen'],
    },
  },
  argTypes: {
    activeStep: { control: { type: 'number', min: 0, max: 2 } },
    alignment: { control: 'inline-radio', options: ['horizontal', 'vertical'] },
    textAlign: { control: 'inline-radio', options: ['left', 'center'] },
    showOptional: { control: 'boolean' },
    smallScreen: { control: 'boolean' },
    steps: { table: { disable: true } },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    steps: DEMO_STEPS,
    activeStep: 1,
    alignment: 'horizontal',
    textAlign: 'left',
    showOptional: false,
    smallScreen: false,
  },
};

export default meta;
type Story = StoryObj<typeof CrvStepper>;

export const Playground: Story = {};

export const WithOptional: Story = {
  args: {
    showOptional: true,
    steps: DEMO_STEPS.map((step) => ({ ...step, optional: 'Optional' })),
  },
};

export const Vertical: Story = {
  args: {
    alignment: 'vertical',
    activeStep: 1,
  },
  decorators: [
    (Story) => (
      <Box sx={{ maxWidth: 280 }}>
        <Story />
      </Box>
    ),
  ],
};

export const CenterLabels: Story = {
  args: {
    textAlign: 'center',
    activeStep: 1,
  },
};

export const StepIconStates: StoryObj<typeof CrvStepperIcon> = {
  render: () => (
    <Box sx={{ display: 'flex', gap: 2 }}>
      <CrvStepperIcon state="default" value={1} />
      <CrvStepperIcon state="done" />
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const StepBaseStates: Story = {
  render: () => (
    <Stepper activeStep={-1} connector={null} sx={{ gap: 3, flexWrap: 'wrap' }}>
      {STEP_STATES.map((state) => (
        <CrvStep key={state} state={state} stepTitle="Step title" />
      ))}
    </Stepper>
  ),
  parameters: { controls: { disable: true } },
};

const PROGRESS_TYPES: CrvMobileStepperProgressType[] = ['text', 'dots', 'progress'];

export const MobileStepperVariants: StoryObj<typeof CrvMobileStepper> = {
  render: () => {
    const [activeStep, setActiveStep] = useState(0);
    return (
      <Box sx={{ display: 'grid', gap: 4 }}>
        {PROGRESS_TYPES.map((progressType) => (
          <Box key={progressType} sx={{ display: 'grid', gap: 1 }}>
            <Typography variant="caption">{progressType}</Typography>
            <CrvMobileStepper
              progressType={progressType}
              activeStep={activeStep}
              steps={5}
              onBack={() => setActiveStep((step) => Math.max(step - 1, 0))}
              onNext={() => setActiveStep((step) => Math.min(step + 1, 4))}
            />
          </Box>
        ))}
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};

export const SemanticStates: Story = {
  args: {
    activeStep: 1,
    steps: [
      { label: 'Complete', state: 'complete' },
      { label: 'Error step', state: 'error' },
      { label: 'Warning step', state: 'warning' },
      { label: 'Info step', state: 'info' },
      { label: 'Success step', state: 'success' },
    ],
  },
};

export const AllTextAlignments: Story = {
  render: () => {
    const alignments: CrvStepTextAlign[] = ['left', 'center'];
    return (
      <Box sx={{ display: 'grid', gap: 4 }}>
        {alignments.map((textAlign) => (
          <Box key={textAlign} sx={{ display: 'grid', gap: 1 }}>
            <Typography variant="caption">{textAlign}</Typography>
            <CrvStepper
              steps={DEMO_STEPS}
              activeStep={1}
              textAlign={textAlign}
            />
          </Box>
        ))}
      </Box>
    );
  },
  parameters: { controls: { disable: true } },
};
