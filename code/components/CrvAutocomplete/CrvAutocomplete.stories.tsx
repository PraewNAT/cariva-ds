'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { CrvAutocomplete } from './CrvAutocomplete';
import type { CrvAutocompleteOption } from './CrvAutocomplete.types';

const HOSPITAL_OPTIONS: CrvAutocompleteOption[] = [
  { value: 'ramathibodi', label: 'โรงพยาบาลรามาธิบดี' },
  { value: 'chulalongkorn', label: 'โรงพยาบาลจุฬาลงกรณ์' },
  { value: 'siriraj', label: 'โรงพยาบาลศิริราช' },
  { value: 'phramongkut', label: 'โรงพยาบาลพระมงกุฎเกล้า' },
];

const meta: Meta<typeof CrvAutocomplete> = {
  title: 'Form/CrvAutocomplete',
  component: CrvAutocomplete,
  parameters: {
    docs: {
      description: {
        component:
          'Searchable select — wraps MUI Autocomplete. Use when options are too many for CrvDropdown.',
      },
    },
    controls: {
      include: [
        'size',
        'label',
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
    label: 'โรงพยาบาล',
    placeholder: 'Search or select...',
    helperText: 'Helper text',
    helperTextVisible: false,
    error: false,
    errorMessage: 'กรุณาเลือกจากรายการที่มี',
    errorMessageVisible: true,
    disabled: false,
    options: HOSPITAL_OPTIONS,
  },
  render: (args) => {
    const [value, setValue] = useState<CrvAutocompleteOption | null>(null);
    return (
      <CrvAutocomplete
        {...args}
        value={value}
        onChange={(_, newValue) => setValue(newValue)}
      />
    );
  },
};

export default meta;
type Story = StoryObj<typeof CrvAutocomplete>;

export const Default: Story = {
  args: {
    label: 'โรงพยาบาล',
    placeholder: 'Search or select...',
  },
};

export const Medium: Story = {
  args: { size: 'medium', label: 'โรงพยาบาล' },
};

export const Small: Story = {
  args: { size: 'small', label: 'โรงพยาบาล' },
};

export const WithHelperText: Story = {
  args: {
    label: 'โรงพยาบาล',
    helperTextVisible: true,
    helperText: 'พิมพ์เพื่อค้นหาโรงพยาบาล',
  },
};

export const Filled: Story = {
  render: (args) => (
    <CrvAutocomplete
      {...args}
      value={HOSPITAL_OPTIONS[0]}
      options={HOSPITAL_OPTIONS}
    />
  ),
};

export const Error: Story = {
  args: {
    label: 'โรงพยาบาล',
    error: true,
    errorMessage: 'กรุณาเลือกจากรายการที่มี',
  },
};

export const Disabled: Story = {
  render: (args) => (
    <CrvAutocomplete
      {...args}
      disabled
      value={HOSPITAL_OPTIONS[0]}
      options={HOSPITAL_OPTIONS}
    />
  ),
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 32, maxWidth: 360 }}>
      {(['medium', 'small'] as const).map((size) => (
        <div key={size} style={{ display: 'grid', gap: 16 }}>
          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{size}</p>
          <CrvAutocomplete
            size={size}
            label="Label"
            placeholder="Search or select..."
            options={HOSPITAL_OPTIONS}
          />
          <CrvAutocomplete
            size={size}
            label="Label"
            value={HOSPITAL_OPTIONS[0]}
            options={HOSPITAL_OPTIONS}
            helperTextVisible
            helperText="Helper text"
          />
          <CrvAutocomplete
            size={size}
            label="Label"
            error
            errorMessage="Error message"
            options={HOSPITAL_OPTIONS}
          />
          <CrvAutocomplete
            size={size}
            label="Label"
            disabled
            value={HOSPITAL_OPTIONS[0]}
            options={HOSPITAL_OPTIONS}
          />
        </div>
      ))}
    </div>
  ),
};
