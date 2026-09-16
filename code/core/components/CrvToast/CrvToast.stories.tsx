'use client';

import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { CrvButton } from '../CrvButton';
import { CrvToast } from './CrvToast';
import { TOAST_WIDTH } from './crvToastStyles';
import type { CrvToastSeverity, CrvToastVariant } from './CrvToast.types';

const VARIANTS: CrvToastVariant[] = ['filled', 'outlined', 'standard'];
const SEVERITIES: CrvToastSeverity[] = [
  'error',
  'warning',
  'info',
  'success',
  'notification',
];

const meta: Meta<typeof CrvToast> = {
  title: 'Feedback/CrvToast',
  component: CrvToast,
  parameters: {
    docs: {
      description: {
        component:
          'Toast for feedback messages. Maps to Figma crv-toast-standard node 6413:55828.',
      },
    },
    controls: {
      include: ['variant', 'severity', 'title', 'description'],
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: VARIANTS },
    severity: { control: 'inline-radio', options: SEVERITIES },
    title: { control: 'text' },
    description: { control: 'text' },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
    onClose: { table: { disable: true } },
    action: { table: { disable: true } },
    icon: { table: { disable: true } },
  },
  args: {
    variant: 'standard',
    severity: 'error',
    title: 'ไม่สามารถบันทึกได้',
    description: 'ตรวจสอบการเชื่อมต่อแล้วลองใหม่',
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: TOAST_WIDTH }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CrvToast>;

export const Playground: Story = {};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: 'flex', gap: 4, width: TOAST_WIDTH * 3 + 64 }}>
      {VARIANTS.map((variant) => (
        <Box
          key={variant}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: TOAST_WIDTH }}
        >
          {SEVERITIES.map((severity) => (
            <CrvToast
              key={severity}
              variant={variant}
              severity={severity}
              title="{Title}"
              description="{Description}"
            />
          ))}
        </Box>
      ))}
    </Box>
  ),
};

export const WithActionAndClose: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, width: TOAST_WIDTH }}>
      {VARIANTS.map((variant) => (
        <CrvToast
          key={variant}
          variant={variant}
          severity="error"
          title="ลบไฟล์แล้ว"
          description="ไฟล์ถูกย้ายไปถังขยะ"
          // Figma uses color=neutral here; CrvButton has no neutral colour yet.
          action={
            <CrvButton variant="text" size="small">
              เลิกทำ
            </CrvButton>
          }
          onClose={() => {}}
        />
      ))}
    </Box>
  ),
};

export const TitleOnly: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <CrvToast severity="success" title="บันทึกข้อมูลสำเร็จ" onClose={() => {}} />
  ),
};
