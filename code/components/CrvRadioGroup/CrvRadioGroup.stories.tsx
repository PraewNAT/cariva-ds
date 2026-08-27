'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CrvRadioGroup } from './CrvRadioGroup';
import { DEFAULT_RADIO_GROUP_OPTIONS } from './crvRadioGroupDefaults';
import type { CrvRadioColor } from '../CrvRadioBase/crvRadioStyles';

const COLORS: CrvRadioColor[] = ['primary', 'error'];

const meta: Meta<typeof CrvRadioGroup> = {
  title: 'Form/CrvRadioGroup',
  component: CrvRadioGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Grouped radio buttons — single selection with label, description, and error message.',
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
        'defaultValue',
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
    defaultValue: { control: 'text' },
    options: { table: { disable: true } },
    value: { table: { disable: true } },
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
    options: DEFAULT_RADIO_GROUP_OPTIONS,
    defaultValue: 'recents',
  },
};

export default meta;
type Story = StoryObj<typeof CrvRadioGroup>;

export const Default: Story = {};

export const Disabled: Story = {
  args: { disabled: true, defaultValue: 'home' },
};

export const Error: Story = {
  args: {
    color: 'error',
    defaultValue: '',
  },
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 32, maxWidth: 420 }}>
      <CrvRadioGroup defaultValue="recents" />
      <CrvRadioGroup disabled defaultValue="home" />
      <CrvRadioGroup color="error" defaultValue="" />
    </div>
  ),
};
