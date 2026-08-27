'use client';

import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CrvRadio } from './CrvRadio';
import type { CrvRadioColor } from '../CrvRadioBase/crvRadioStyles';
import type { CrvRadioLabelPlacement, CrvRadioProps, CrvRadioType } from './CrvRadio.types';

const TYPES: CrvRadioType[] = ['default', 'groupItem'];
const COLORS: CrvRadioColor[] = ['primary', 'error'];

function InteractiveRadio(props: CrvRadioProps) {
  const [checked, setChecked] = useState(props.checked ?? props.defaultChecked ?? false);

  useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  return (
    <CrvRadio
      {...props}
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked);
        props.onChange?.(event);
      }}
    />
  );
}

const meta: Meta<typeof CrvRadio> = {
  title: 'Form/CrvRadio',
  component: CrvRadio,
  parameters: {
    docs: {
      description: {
        component:
          'Labeled radio — default or group item. Click to select in stories.',
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
    checked: false,
    disabled: false,
  },
  render: (args) => <InteractiveRadio {...args} />,
};

export default meta;
type Story = StoryObj<typeof CrvRadio>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const GroupItem: Story = {
  args: {
    type: 'groupItem',
    label: 'Label',
    descriptionVisible: false,
  },
};

export const ErrorColor: Story = {
  args: { color: 'error' },
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
          <CrvRadio
            type={type}
            defaultChecked
            label={type === 'groupItem' ? 'Label' : undefined}
            descriptionVisible={type !== 'groupItem'}
          />
          <CrvRadio
            type={type}
            color="error"
            label={type === 'groupItem' ? 'Label' : undefined}
            descriptionVisible={type !== 'groupItem'}
          />
          <CrvRadio
            type={type}
            disabled
            label={type === 'groupItem' ? 'Label' : undefined}
            descriptionVisible={type !== 'groupItem'}
          />
          <CrvRadio
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
