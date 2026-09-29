'use client';

import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import { CrvCheckboxBase } from './CrvCheckboxBase';
import type { CrvCheckboxBaseProps } from './CrvCheckboxBase.types';
import type { CrvCheckboxColor } from './crvCheckboxStyles';

const COLORS: CrvCheckboxColor[] = ['primary', 'error'];

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
          '16×16 checkbox control — checked, unchecked, indeterminate, disabled, in primary or error.',
      },
    },
    controls: {
      include: ['checked', 'indeterminate', 'disabled', 'color'],
    },
  },
  argTypes: {
    color: { control: 'select', options: COLORS },
    checked: { control: 'boolean' },
    indeterminate: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onChange: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    color: 'primary',
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

export const ErrorColor: Story = {
  args: { color: 'error', checked: true },
};

export const AllStates: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story:
          'Every Figma variant — primary and error × unchecked / checked / indeterminate, plus the two disabled boxes (colour is ignored when disabled).',
      },
    },
  },
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      {COLORS.map((color) => (
        <div key={color} style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
          <CrvCheckboxBase color={color} aria-label={`${color} unchecked`} />
          <CrvCheckboxBase color={color} defaultChecked aria-label={`${color} checked`} />
          <CrvCheckboxBase color={color} indeterminate aria-label={`${color} indeterminate`} />
        </div>
      ))}
      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
        <CrvCheckboxBase disabled aria-label="Disabled unchecked" />
        <CrvCheckboxBase defaultChecked disabled aria-label="Disabled checked" />
        <CrvCheckboxBase indeterminate disabled aria-label="Disabled indeterminate" />
      </div>
    </div>
  ),
};
