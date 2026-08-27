import type { Meta, StoryObj } from '@storybook/react';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import { CrvFab } from './CrvFab';

const meta: Meta<typeof CrvFab> = {
  title: 'Buttons/CrvFab',
  component: CrvFab,
  parameters: {
    docs: {
      description: {
        component:
          'Floating Action Button — primary page action. Sizes: small (40) / medium (56) / large (64) × primary / neutral.',
      },
    },
  },
  argTypes: {
    color: { control: 'inline-radio', options: ['primary', 'neutral'] },
    size: { control: 'inline-radio', options: ['small', 'medium', 'large'] },
    disabled: { control: 'boolean' },
    children: { table: { disable: true } },
    component: { table: { disable: true } },
    sx: { table: { disable: true } },
    classes: { table: { disable: true } },
    style: { table: { disable: true } },
    ref: { table: { disable: true } },
    tabIndex: { table: { disable: true } },
  },
  args: {
    'aria-label': 'add',
    children: <AddIcon />,
  },
};

export default meta;
type Story = StoryObj<typeof CrvFab>;

export const Default: Story = {
  args: { color: 'primary', size: 'medium' },
};

export const Primary: Story = { args: { color: 'primary' } };
export const Neutral: Story = { args: { color: 'neutral', children: <EditIcon /> } };

export const Small: Story = { args: { size: 'small' } };
export const Medium: Story = { args: { size: 'medium' } };
export const Large: Story = { args: { size: 'large' } };

export const Disabled: Story = { args: { disabled: true } };

export const AllVariants: Story = {
  parameters: {
    controls: { disable: true },
    docs: {
      description: {
        story: 'Showcase grid — size × color (interactive hover/pressed in browser)',
      },
    },
  },
  render: () => {
    const colors = ['primary', 'neutral'] as const;
    const sizes = ['small', 'medium', 'large'] as const;

    return (
      <div style={{ display: 'grid', gap: 16 }}>
        {colors.map((color) => (
          <div key={color} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
            <span style={{ width: 72, fontSize: 12 }}>{color}</span>
            {sizes.map((size) => (
              <CrvFab
                key={`${color}-${size}`}
                color={color}
                size={size}
                aria-label={`${color}-${size}`}
              >
                <AddIcon />
              </CrvFab>
            ))}
          </div>
        ))}
      </div>
    );
  },
};
