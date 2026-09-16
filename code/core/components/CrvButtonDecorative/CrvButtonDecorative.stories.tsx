'use client';

import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import AutoAwesomeRoundedIcon from '@mui/icons-material/AutoAwesomeRounded';
import { CrvButtonDecorative } from './CrvButtonDecorative';
import type { CrvButtonDecorativeSize } from './CrvButtonDecorative.types';

const SIZES: CrvButtonDecorativeSize[] = ['small', 'medium', 'large'];

const meta: Meta<typeof CrvButtonDecorative> = {
  title: 'Buttons/CrvButtonDecorative',
  component: CrvButtonDecorative,
  parameters: {
    docs: {
      description: {
        component:
          'Gradient AI button. Figma crv-button-decorative node 5844:33868. Use only for the primary action of an AI feature.',
      },
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: SIZES },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
    sx: { table: { disable: true } },
  },
  args: { size: 'medium', children: 'ถามผู้ช่วย AI' },
};

export default meta;
type Story = StoryObj<typeof CrvButtonDecorative>;

export const Playground: Story = {};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {SIZES.map((size) => (
        <Box key={size} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          <CrvButtonDecorative size={size}>ถามผู้ช่วย AI</CrvButtonDecorative>
          <CrvButtonDecorative size={size} startIcon={<AutoAwesomeRoundedIcon />}>
            สรุปด้วย AI
          </CrvButtonDecorative>
          <CrvButtonDecorative size={size} disabled>
            ปิดใช้งาน
          </CrvButtonDecorative>
        </Box>
      ))}
    </Box>
  ),
};
