'use client';

import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CrvCheckbox } from './CrvCheckbox';
import type { CrvCheckboxColor, CrvCheckboxProps } from './CrvCheckbox.types';

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

export const LabelOnly: Story = {
  args: {
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

export const AllColors: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase grid — primary / error / disabled, with and without a description',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 32, maxWidth: 420 }}>
      {([true, false] as const).map((withDescription) => (
        <div key={String(withDescription)} style={{ display: 'grid', gap: 16 }}>
          {COLORS.map((color) => (
            <CrvCheckbox
              key={color}
              color={color}
              defaultChecked
              label={withDescription ? undefined : 'Label'}
              descriptionVisible={withDescription}
            />
          ))}
          <CrvCheckbox
            disabled
            label={withDescription ? undefined : 'Label'}
            descriptionVisible={withDescription}
          />
          <CrvCheckbox
            defaultChecked
            disabled
            label={withDescription ? undefined : 'Label'}
            descriptionVisible={withDescription}
          />
        </div>
      ))}
    </div>
  ),
};
