import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { CrvLinearProgress } from './CrvLinearProgress';
import type { CrvProgressColor } from '../../crvProgressStyles';

const COLORS = ['primary', 'error', 'success', 'warning'] as const satisfies CrvProgressColor[];

const meta: Meta<typeof CrvLinearProgress> = {
  title: 'Feedback/CrvLinearProgress',
  component: CrvLinearProgress,
  parameters: {
    docs: {
      description: {
        component:
          'Horizontal progress bar. Maps to Figma `crv-linear-progress` (4456:16573). ' +
          'Height 4px, pill track, semantic fill/buffer colors.',
      },
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['determinate', 'indeterminate', 'buffer'] },
    color: { control: 'inline-radio', options: [...COLORS] },
    value: { control: { type: 'range', min: 0, max: 100, step: 1 } },
    valueBuffer: { control: { type: 'range', min: 0, max: 100, step: 1 } },
  },
  args: {
    variant: 'determinate',
    color: 'primary',
    value: 60,
    valueBuffer: 80,
  },
  decorators: [
    (Story) => (
      <Box sx={{ width: 240 }}>
        <Story />
      </Box>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CrvLinearProgress>;

export const Determinate: Story = { args: { variant: 'determinate', value: 60 } };
export const Indeterminate: Story = { args: { variant: 'indeterminate' } };
export const Buffer: Story = { args: { variant: 'buffer', value: 40, valueBuffer: 70 } };

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: 'grid', gap: 3, width: 240 }}>
      {COLORS.map((color) => (
        <Box key={color}>
          <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
            {color}
          </Typography>
          <Box sx={{ display: 'grid', gap: 1.5 }}>
            <CrvLinearProgress variant="determinate" color={color} value={60} />
            <CrvLinearProgress variant="indeterminate" color={color} />
            <CrvLinearProgress variant="buffer" color={color} value={40} valueBuffer={70} />
          </Box>
        </Box>
      ))}
    </Box>
  ),
};
