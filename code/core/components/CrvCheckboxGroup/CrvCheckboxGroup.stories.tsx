'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CrvCheckboxGroup } from './CrvCheckboxGroup';
import { DEFAULT_CHECKBOX_GROUP_OPTIONS } from './crvCheckboxGroupDefaults';
import type { CrvCheckboxColor } from '../CrvCheckbox/CrvCheckbox.types';

const COLORS: CrvCheckboxColor[] = ['primary', 'error'];

const meta: Meta<typeof CrvCheckboxGroup> = {
  title: 'Form/CrvCheckboxGroup',
  component: CrvCheckboxGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Grouped checkboxes with header label, description, and optional error message.',
      },
    },
    controls: {
      include: [
        'color',
        'disabled',
        'label',
        'labelVisible',
        'description',
        'descriptionVisible',
        'errorMessage',
        'errorMessageVisible',
      ],
    },
  },
  argTypes: {
    color: { control: 'select', options: COLORS },
    disabled: { control: 'boolean' },
    label: { control: 'text' },
    labelVisible: { control: 'boolean' },
    description: { control: 'text' },
    descriptionVisible: { control: 'boolean' },
    errorMessage: { control: 'text' },
    errorMessageVisible: { control: 'boolean' },
    options: { table: { disable: true } },
    value: { table: { disable: true } },
    defaultValue: { table: { disable: true } },
    onChange: { table: { disable: true } },
    name: { table: { disable: true } },
    className: { table: { disable: true } },
    sx: { table: { disable: true } },
  },
  args: {
    color: 'primary',
    disabled: false,
    label: 'Sidebar',
    labelVisible: true,
    description: 'Select the items you want to display in the sidebar.',
    descriptionVisible: true,
    errorMessage: 'Your one-time password must be 6 characters.',
    errorMessageVisible: true,
    options: DEFAULT_CHECKBOX_GROUP_OPTIONS,
    defaultValue: ['recents', 'home'],
  },
};

export default meta;
type Story = StoryObj<typeof CrvCheckboxGroup>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Error: Story = {
  args: {
    color: 'error',
    defaultValue: [],
  },
};

export const PartialOptions: Story = {
  args: {
    options: DEFAULT_CHECKBOX_GROUP_OPTIONS.map((option, index) => ({
      ...option,
      visible: index < 3,
    })),
  },
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 32, maxWidth: 420 }}>
      <CrvCheckboxGroup defaultValue={['recents', 'home']} />
      <CrvCheckboxGroup disabled defaultValue={['recents']} />
      <CrvCheckboxGroup color="error" defaultValue={[]} />
    </div>
  ),
};
