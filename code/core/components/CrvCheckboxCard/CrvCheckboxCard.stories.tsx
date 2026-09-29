'use client';

import { useEffect, useState, type ComponentProps } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import { spacing } from '../../tokens';
import { CrvCheckboxCard } from './CrvCheckboxCard';
import type { CrvCheckboxCardColor } from './CrvCheckboxCard.types';

type CardProps = ComponentProps<typeof CrvCheckboxCard>;

function InteractiveCard(props: CardProps) {
  const [checked, setChecked] = useState(props.checked ?? props.defaultChecked ?? false);

  useEffect(() => {
    if (props.checked !== undefined) {
      setChecked(props.checked);
    }
  }, [props.checked]);

  return (
    <CrvCheckboxCard
      {...props}
      checked={checked}
      onChange={(event) => {
        setChecked(event.target.checked);
        props.onChange?.(event, event.target.checked);
      }}
    />
  );
}

const COLORS: CrvCheckboxCardColor[] = ['primary', 'error'];

const meta: Meta<typeof CrvCheckboxCard> = {
  title: 'Form/CrvCheckboxCard',
  component: CrvCheckboxCard,
  parameters: {
    docs: {
      description: {
        component:
          'Checkbox in a card — the whole card is the hit target. Use when an option needs weight and a description of its own.',
      },
    },
  },
  args: {
    label: 'Accept terms and conditions',
    description: 'You agree to our Terms of Service and Privacy Policy.',
  },
};

export default meta;
type Story = StoryObj<typeof CrvCheckboxCard>;

export const Default: Story = {
  render: (args) => (
    <Box sx={{ width: 409 }}>
      <InteractiveCard {...args} />
    </Box>
  ),
};

export const Checked: Story = {
  render: (args) => (
    <Box sx={{ width: 409 }}>
      <InteractiveCard {...args} defaultChecked />
    </Box>
  ),
};

export const Error: Story = {
  render: (args) => (
    <Box sx={{ width: 409 }}>
      <InteractiveCard {...args} color="error" defaultChecked />
    </Box>
  ),
};

export const Disabled: Story = {
  render: (args) => (
    <Box sx={{ width: 409 }}>
      <CrvCheckboxCard {...args} disabled />
    </Box>
  ),
};

export const Showcase: Story = {
  parameters: {
    docs: {
      description: { story: 'Showcase grid — primary / error × unchecked / checked, plus disabled' },
    },
  },
  render: (args) => (
    <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${spacing.lg}px`, width: 842 }}>
      {COLORS.map((color) => (
        <Box key={color} sx={{ display: 'flex', gap: `${spacing.lg}px` }}>
          <Box sx={{ width: 409 }}>
            <InteractiveCard {...args} color={color} />
          </Box>
          <Box sx={{ width: 409 }}>
            <InteractiveCard {...args} color={color} defaultChecked />
          </Box>
        </Box>
      ))}
      <Box sx={{ display: 'flex', gap: `${spacing.lg}px` }}>
        <Box sx={{ width: 409 }}>
          <CrvCheckboxCard {...args} disabled />
        </Box>
        <Box sx={{ width: 409 }}>
          <CrvCheckboxCard {...args} disabled defaultChecked />
        </Box>
      </Box>
    </Box>
  ),
};
