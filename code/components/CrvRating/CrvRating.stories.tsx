'use client';

import { useEffect, useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CrvRating } from './CrvRating';
import type { CrvRatingProps, CrvRatingSize } from './CrvRating.types';

function InteractiveRating(props: CrvRatingProps) {
  const [value, setValue] = useState<number | null>(props.value ?? props.defaultValue ?? 2.5);

  useEffect(() => {
    if (props.value !== undefined) {
      setValue(props.value);
    }
  }, [props.value]);

  return (
    <CrvRating
      {...props}
      value={value}
      onChange={(_, next) => setValue(next)}
    />
  );
}

const meta: Meta<typeof CrvRating> = {
  title: 'Data Display/CrvRating',
  component: CrvRating,
  parameters: {
    docs: {
      description: {
        component:
          'Star rating 1–5 with half-star support. Maps to Figma `<Rating>` component set (4887:7022). ' +
          'Toggle `readOnly` for display-only mode (Figma `Disabled=True`).',
      },
    },
    controls: {
      include: ['size', 'readOnly', 'value', 'precision', 'max'],
    },
  },
  argTypes: {
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] satisfies CrvRatingSize[] },
    readOnly: { control: 'boolean' },
    value: { control: { type: 'number', min: 0, max: 5, step: 0.5 } },
    precision: { control: { type: 'number', min: 0.5, max: 1, step: 0.5 } },
    max: { control: { type: 'number', min: 1, max: 10, step: 1 } },
    onChange: { table: { disable: true } },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    size: 'medium',
    readOnly: false,
    value: 2.5,
    precision: 0.5,
    max: 5,
  },
  render: (args) => {
    const { ref: _ref, ...rest } = args;
    return rest.readOnly ? (
      <CrvRating {...rest} />
    ) : (
      <InteractiveRating {...rest} />
    );
  },
};

export default meta;
type Story = StoryObj<typeof CrvRating>;

export const Playground: Story = {};

export const ReadOnly: Story = {
  args: {
    readOnly: true,
    value: 2.5,
  },
  parameters: {
    docs: {
      description: {
        story: 'Figma `Disabled=True` — all stars use `color/border/default` (same gray as empty interactive stars).',
      },
    },
  },
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const sizes: CrvRatingSize[] = ['small', 'medium', 'large'];

    return (
      <Box sx={{ display: 'grid', gap: 3 }}>
        {sizes.map((size) => (
          <Box key={size}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
              {size} — interactive
            </Typography>
            <InteractiveRating size={size} defaultValue={2.5} />
          </Box>
        ))}
        {sizes.map((size) => (
          <Box key={`${size}-readonly`}>
            <Typography variant="caption" sx={{ display: 'block', mb: 1 }}>
              {size} — readOnly (Figma Disabled=True)
            </Typography>
            <CrvRating size={size} readOnly value={2.5} />
          </Box>
        ))}
      </Box>
    );
  },
};
