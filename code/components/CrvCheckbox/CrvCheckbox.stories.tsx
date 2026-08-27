'use client';

import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CrvCheckbox } from './CrvCheckbox';
import type {
  CrvCheckboxColor,
  CrvCheckboxProps,
  CrvCheckboxType,
} from './CrvCheckbox.types';

function InteractiveCheckbox(props: CrvCheckboxProps) {
  const [checked, setChecked] = useState(props.checked ?? props.defaultChecked ?? false);

  useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  return (
    <CrvCheckbox
      {...props}
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked);
        props.onChange?.(event);
      }}
    />
  );
}

const TYPES: CrvCheckboxType[] = ['default', 'groupItem'];
const COLORS: CrvCheckboxColor[] = ['primary', 'error'];

const meta: Meta<typeof CrvCheckbox> = {
  title: 'Form/CrvCheckbox',
  component: CrvCheckbox,
  parameters: {
    docs: {
      description: {
        component:
          'Labeled checkbox with optional description — default or group item. Click to toggle in stories.',
      },
    },
    controls: {
      include: [
        'type',
        'color',
        'labelPlacement',
        'label',
        'labelVisible',
        'description',
        'descriptionVisible',
        'checked',
        'disabled',
      ],
    },
  },
  argTypes: {
    type: { control: 'select', options: TYPES },
    color: { control: 'select', options: COLORS },
    labelPlacement: { control: 'select', options: ['end', 'start'] },
    label: { control: 'text' },
    labelVisible: { control: 'boolean' },
    description: { control: 'text' },
    descriptionVisible: { control: 'boolean' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    onChange: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    type: 'default',
    color: 'primary',
    labelPlacement: 'end',
    label: 'Accept terms and conditions',
    labelVisible: true,
    description: 'You agree to our Terms of Service and Privacy Policy.',
    descriptionVisible: true,
    checked: true,
    disabled: false,
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};

export default meta;
type Story = StoryObj<typeof CrvCheckbox>;

export const Default: Story = {};

export const Unchecked: Story = {
  args: { checked: false },
};

export const GroupItem: Story = {
  args: {
    type: 'groupItem',
    label: 'Label',
    descriptionVisible: false,
  },
};

export const ErrorColor: Story = {
  args: {
    color: 'error',
    checked: true,
  },
};

export const LabelStart: Story = {
  args: {
    labelPlacement: 'start',
    checked: true,
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllTypes: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase grid — default / groupItem × primary / error / disabled',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 32, maxWidth: 420 }}>
      {(['default', 'groupItem'] as const).map((type) => (
        <div key={type} style={{ display: 'grid', gap: 16 }}>
          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{type}</p>
          <CrvCheckbox
            type={type}
            defaultChecked
            label={type === 'groupItem' ? 'Label' : undefined}
            descriptionVisible={type !== 'groupItem'}
          />
          <CrvCheckbox
            type={type}
            color="error"
            defaultChecked
            label={type === 'groupItem' ? 'Label' : undefined}
            descriptionVisible={type !== 'groupItem'}
          />
          <CrvCheckbox
            type={type}
            disabled
            label={type === 'groupItem' ? 'Label' : undefined}
            descriptionVisible={type !== 'groupItem'}
          />
          <CrvCheckbox
            type={type}
            defaultChecked
            disabled
            label={type === 'groupItem' ? 'Label' : undefined}
            descriptionVisible={type !== 'groupItem'}
          />
        </div>
      ))}
    </div>
  ),
};
