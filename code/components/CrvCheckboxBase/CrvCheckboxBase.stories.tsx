'use client';

import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CrvCheckboxBase } from './CrvCheckboxBase';
import type { CrvCheckboxBaseProps } from './CrvCheckboxBase.types';

function InteractiveCheckbox(props: CrvCheckboxBaseProps) {
  const [checked, setChecked] = useState(props.checked ?? props.defaultChecked ?? false);

  useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  return (
    <CrvCheckboxBase
      {...props}
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked);
        props.onChange?.(event);
      }}
    />
  );
}

const meta: Meta<typeof CrvCheckboxBase> = {
  title: 'Form/CrvCheckboxBase',
  component: CrvCheckboxBase,
  parameters: {
    docs: {
      description: {
        component:
          '16×16 checkbox control — checked, unchecked, indeterminate, disabled.',
      },
    },
    controls: {
      include: ['checked', 'indeterminate', 'disabled'],
    },
  },
  argTypes: {
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    checked: false,
    indeterminate: false,
    disabled: false,
  },
  render: (args) => <InteractiveCheckbox {...args} />,
};

export default meta;
type Story = StoryObj<typeof CrvCheckboxBase>;

export const Unchecked: Story = {};

export const Checked: Story = {
  args: { checked: true },
};

export const Indeterminate: Story = {
  args: { indeterminate: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const DisabledChecked: Story = {
  args: { checked: true, disabled: true },
};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
      <CrvCheckboxBase aria-label="Unchecked" />
      <CrvCheckboxBase defaultChecked aria-label="Checked" />
      <CrvCheckboxBase indeterminate aria-label="Indeterminate" />
      <CrvCheckboxBase disabled aria-label="Disabled unchecked" />
      <CrvCheckboxBase defaultChecked disabled aria-label="Disabled checked" />
    </div>
  ),
};
