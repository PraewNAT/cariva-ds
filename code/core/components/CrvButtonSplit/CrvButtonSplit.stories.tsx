'use client';

import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import SaveRoundedIcon from '@mui/icons-material/SaveRounded';
import { CrvButtonSplit } from './CrvButtonSplit';
import type { CrvButtonSplitColor, CrvButtonSplitSize } from './CrvButtonSplit.types';

const COLORS: CrvButtonSplitColor[] = ['primary', 'error'];
const SIZES: CrvButtonSplitSize[] = ['small', 'medium', 'large'];

const meta: Meta<typeof CrvButtonSplit> = {
  title: 'Buttons/CrvButtonSplit',
  component: CrvButtonSplit,
  parameters: {
    docs: {
      description: {
        component:
          'One main action with a trigger for its alternatives. Figma crv-button-split node 5981:34184.',
      },
    },
  },
  argTypes: {
    color: { control: 'inline-radio', options: COLORS },
    size: { control: 'inline-radio', options: SIZES },
    disabled: { control: 'boolean' },
    children: { control: 'text' },
  },
  args: { color: 'primary', size: 'medium', children: 'บันทึก', triggerLabel: 'ตัวเลือกอื่น' },
};

export default meta;
type Story = StoryObj<typeof CrvButtonSplit>;

export const Playground: Story = {};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3 }}>
      {COLORS.map((color) => (
        <Box key={color} sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
          {SIZES.map((size) => (
            <CrvButtonSplit key={size} color={color} size={size} triggerLabel="ตัวเลือกอื่น">
              บันทึก
            </CrvButtonSplit>
          ))}
          <CrvButtonSplit
            color={color}
            startIcon={<SaveRoundedIcon />}
            triggerLabel="ตัวเลือกอื่น"
          >
            บันทึก
          </CrvButtonSplit>
          <CrvButtonSplit color={color} disabled triggerLabel="ตัวเลือกอื่น">
            ปิดใช้งาน
          </CrvButtonSplit>
        </Box>
      ))}
    </Box>
  ),
};
