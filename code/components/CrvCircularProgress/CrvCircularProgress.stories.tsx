import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CrvCircularProgress } from './CrvCircularProgress';
import type { CrvProgressColor } from '../../crvProgressStyles';

const COLORS = ['primary', 'error', 'success', 'warning'] as const satisfies CrvProgressColor[];
const SIZES = ['small', 'medium', 'large'] as const;

const meta: Meta<typeof CrvCircularProgress> = {
  title: 'Feedback/CrvCircularProgress',
  component: CrvCircularProgress,
  parameters: {
    docs: {
      description: {
        component:
          'Circular progress indicator. Maps to Figma `crv-circular-progress` (4456:16646). ' +
          'Sizes: small 24 / medium 40 / large 56 with track + fill rings.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['determinate', 'indeterminate'] },
    size: { control: 'inline-radio', options: [...SIZES] },
    color: { control: 'inline-radio', options: [...COLORS] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: {
    variant: 'indeterminate',
    size: 'medium',
    color: 'primary',
    value: 60,
  },
};

export default meta;
type Story = StoryObj<typeof CrvCircularProgress>;

export const Indeterminate: Story = { args: { variant: 'indeterminate' } };
export const Determinate: Story = { args: { variant: 'determinate', value: 60 } };

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: 'grid', gap: 3 }}>
      {COLORS.map((color) => (
        <Box key={color}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            {color}
          </Typography>
          <Box sx={{ display: 'flex', gap: 3, alignItems: 'center' }}>
            {SIZES.map((size) => (
              <Box key={size} sx={{ display: 'grid', gap: 1, justifyItems: 'center' }}>
                <CrvCircularProgress variant="indeterminate" color={color} size={size} />
                <CrvCircularProgress variant="determinate" color={color} size={size} value={60} />
                <Typography variant="caption">{size}</Typography>
              </Box>
            ))}
          </Box>
        </Box>
      ))}
    </Box>
  ),
};
