'use client';

import type { Meta, StoryObj } from '@storybook/react';
import dayjs from 'dayjs';
import { CrvDatePicker, CrvDateTimePicker, CrvTimePicker } from './CrvDateTimePicker';

const meta: Meta<typeof CrvDateTimePicker> = {
  title: 'Form/CrvDateTimePicker',
  component: CrvDateTimePicker,
  parameters: {
    docs: {
      description: {
        component:
          'Date and time picker wrappers over MUI X. Behavior stays MUI; font, color, and field states follow Cariva DS tokens.',
      },
    },
    controls: {
      include: ['label', 'size', 'helperText', 'error', 'errorMessage', 'disabled', 'fullWidth'],
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    label: { control: 'text' },
    helperText: { control: 'text' },
    error: { control: 'boolean' },
    errorMessage: { control: 'text' },
    disabled: { control: 'boolean' },
    fullWidth: { control: 'boolean' },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    slotProps: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    label: 'วันที่และเวลา',
    size: 'medium',
    helperText: '',
    error: false,
    errorMessage: 'เลือกวันที่และเวลาให้ถูกต้อง',
    disabled: false,
    fullWidth: true,
    defaultValue: dayjs('2026-06-16T09:30:00'),
  },
};

export default meta;
type Story = StoryObj<typeof CrvDateTimePicker>;

export const DateTime: Story = {};

export const DateOnly: Story = {
  render: (args) => (
    <CrvDatePicker
      label="วันที่"
      size={args.size}
      helperText={args.helperText}
      error={args.error}
      errorMessage={args.errorMessage}
      disabled={args.disabled}
      fullWidth={args.fullWidth}
      defaultValue={dayjs('2026-06-16')}
    />
  ),
};

export const TimeOnly: Story = {
  render: (args) => (
    <CrvTimePicker
      label="เวลา"
      size={args.size}
      helperText={args.helperText}
      error={args.error}
      errorMessage={args.errorMessage}
      disabled={args.disabled}
      fullWidth={args.fullWidth}
      defaultValue={dayjs('2026-06-16T09:30:00')}
    />
  ),
};

export const Small: Story = {
  args: {
    size: 'small',
    label: 'วันที่และเวลา',
  },
};

export const WithHelperText: Story = {
  args: {
    helperText: 'เลือกวันนัดหมายตามเวลาท้องถิ่น',
  },
};

export const Error: Story = {
  args: {
    error: true,
    errorMessage: 'กรุณาเลือกวันที่และเวลา',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
  },
};

export const AllTypes: Story = {
  render: () => (
    <div style={{ display: 'grid', gap: 24, maxWidth: 360 }}>
      <CrvDatePicker label="วันที่" defaultValue={dayjs('2026-06-16')} />
      <CrvTimePicker label="เวลา" defaultValue={dayjs('2026-06-16T09:30:00')} />
      <CrvDateTimePicker
        label="วันที่และเวลา"
        defaultValue={dayjs('2026-06-16T09:30:00')}
      />
    </div>
  ),
};
