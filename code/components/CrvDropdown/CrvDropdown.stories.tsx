'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CrvDropdown } from './CrvDropdown';
import type { CrvDropdownOption } from './CrvDropdown.types';

const PROVINCE_OPTIONS: CrvDropdownOption[] = [
  { value: 'bkk', label: 'กรุงเทพมหานคร' },
  { value: 'cnx', label: 'เชียงใหม่' },
  { value: 'pkt', label: 'ภูเก็ต' },
  { value: 'kkn', label: 'ขอนแก่น' },
];

const meta: Meta<typeof CrvDropdown> = {
  title: 'Form/CrvDropdown',
  component: CrvDropdown,
  parameters: {
    docs: {
      description: {
        component:
          'Dropdown select — wraps MUI Select. For choosing one option from a list (3–7 items).',
      },
    },
    controls: {
      include: [
        'size',
        'label',
        'labelVisible',
        'placeholder',
        'helperText',
        'helperTextVisible',
        'error',
        'errorMessage',
        'errorMessageVisible',
        'disabled',
      ],
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium'] },
    labelVisible: { control: 'boolean' },
    helperTextVisible: { control: 'boolean' },
    errorMessageVisible: { control: 'boolean' },
    error: { control: 'boolean' },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    placeholder: { control: 'text' },
    helperText: { control: 'text' },
    errorMessage: { control: 'text' },
    options: { table: { disable: true } },
    value: { table: { disable: true } },
    onChange: { table: { disable: true } },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    size: 'medium',
    label: 'จังหวัด',
    labelVisible: true,
    placeholder: 'เลือกจังหวัด',
    helperText: 'เลือกจังหวัดที่ตั้งขององค์กร',
    helperTextVisible: false,
    error: false,
    errorMessage: 'กรุณาเลือกจังหวัด',
    errorMessageVisible: true,
    disabled: false,
    options: PROVINCE_OPTIONS,
  },
  render: (args) => {
    const [value, setValue] = useState('');
    return (
      <CrvDropdown
        {...args}
        value={value}
        onChange={(e) => setValue(e.target.value as string)}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof CrvDropdown>;

export const Default: Story = {
  args: {
    label: 'จังหวัด',
    placeholder: 'เลือกจังหวัด',
  },
};

export const Medium: Story = {
  args: { size: 'medium', label: 'จังหวัด', placeholder: 'เลือกจังหวัด' },
};

export const Small: Story = {
  args: { size: 'small', label: 'จังหวัด', placeholder: 'เลือกจังหวัด' },
};

export const WithHelperText: Story = {
  args: {
    label: 'ประเภทผู้ใช้',
    placeholder: 'เลือกประเภท',
    helperTextVisible: true,
    helperText: 'เลือกประเภทที่ตรงกับบทบาทในระบบ',
  },
};

export const Filled: Story = {
  render: (args) => (
    <CrvDropdown {...args} value="bkk" options={PROVINCE_OPTIONS} />
  ),
};

export const Error: Story = {
  args: {
    label: 'จังหวัด',
    placeholder: 'เลือกจังหวัด',
    error: true,
    errorMessage: 'กรุณาเลือกจังหวัด',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <CrvDropdown {...args} value="bkk" disabled options={PROVINCE_OPTIONS} />
  ),
};

export const WithoutLabel: Story = {
  args: {
    labelVisible: false,
    placeholder: 'เลือกจังหวัด',
    'aria-label': 'จังหวัด',
  },
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 32, maxWidth: 384 }}>
      {(['medium', 'small'] as const).map((size) => (
        <div key={size} style={{ display: 'grid', gap: 16 }}>
          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{size}</p>
          <CrvDropdown
            size={size}
            label="Label"
            placeholder="Select..."
            options={PROVINCE_OPTIONS}
          />
          <CrvDropdown
            size={size}
            label="Label"
            placeholder="Select..."
            value="bkk"
            options={PROVINCE_OPTIONS}
            helperTextVisible
            helperText="Help text"
          />
          <CrvDropdown
            size={size}
            label="Label"
            placeholder="Select..."
            error
            errorMessage="Error message"
            options={PROVINCE_OPTIONS}
          />
          <CrvDropdown
            size={size}
            label="Label"
            value="bkk"
            disabled
            options={PROVINCE_OPTIONS}
          />
        </div>
      ))}
    </div>
  ),
};
