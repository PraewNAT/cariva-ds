'use client';

import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { CrvButtonMic } from './CrvButtonMic';

const meta: Meta<typeof CrvButtonMic> = {
  title: 'Buttons/CrvButtonMic',
  component: CrvButtonMic,
  parameters: {
    docs: {
      description: {
        component:
          'Audio input picker. Figma crv-button-mic node 5862:33778. Use only for choosing the microphone.',
      },
    },
  },
  argTypes: {
    label: { control: 'text' },
    active: { control: 'boolean' },
    showWaveform: { control: 'boolean' },
    sx: { table: { disable: true } },
  },
  args: {
    label: 'Default - MacBook Pro Microphone (Built-in)',
    active: true,
    showWaveform: true,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 240 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CrvButtonMic>;

export const Playground: Story = {};

export const States: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: 240 }}>
      <CrvButtonMic label="Default - MacBook Pro Microphone (Built-in)" active />
      <CrvButtonMic label="Default - MacBook Pro Microphone (Built-in)" />
      <CrvButtonMic label="ยังไม่ได้เลือกไมโครโฟน" showWaveform={false} />
    </Box>
  ),
};
