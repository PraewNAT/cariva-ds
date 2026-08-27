'use client';

import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CrvSwitch } from './CrvSwitch';
import type { CrvSwitchProps } from './CrvSwitch.types';

function InteractiveSwitch(props: CrvSwitchProps) {
  const [checked, setChecked] = useState(props.checked ?? props.defaultChecked ?? false);

  useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  return (
    <CrvSwitch
      {...props}
      checked={checked}
      onChange={(_, value) => setChecked(value)}
    />
  );
}

const meta: Meta<typeof CrvSwitch> = {
  title: 'Form/CrvSwitch',
  component: CrvSwitch,
  parameters: {
    docs: {
      description: {
        component:
          'Labeled switch with description — Figma crv-switch (3875:1672). Click to toggle in stories.',
      },
    },
  },
  argTypes: {
    color: { control: 'inline-radio', options: ['primary', 'error'] },
    labelPlacement: { control: 'inline-radio', options: ['end', 'start'] },
    labelVisible: { control: 'boolean' },
    descriptionVisible: { control: 'boolean' },
    checked: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    checked: false,
    disabled: false,
    color: 'primary',
    labelPlacement: 'end',
  },
  render: (args) => <InteractiveSwitch {...args} />,
};

export default meta;
type Story = StoryObj<typeof CrvSwitch>;

export const Default: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const LabelStart: Story = {
  args: { labelPlacement: 'start' },
};

export const ErrorColor: Story = {
  args: { color: 'error' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true },
};

export const LabelHidden: Story = {
  args: { labelVisible: false },
};

export const DescriptionHidden: Story = {
  args: { descriptionVisible: false },
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const colors = ['primary', 'error'] as const;
    const placements = ['end', 'start'] as const;

    return (
      <div style={{ display: 'grid', gap: 16 }}>
        {colors.map((color) =>
          placements.map((labelPlacement) => (
            <CrvSwitch
              key={`${color}-${labelPlacement}`}
              color={color}
              labelPlacement={labelPlacement}
              defaultChecked
              label={`${color} / ${labelPlacement}`}
            />
          )),
        )}
      </div>
    );
  },
};
