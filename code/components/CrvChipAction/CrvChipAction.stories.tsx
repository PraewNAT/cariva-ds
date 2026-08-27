'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CrvChipAction } from './CrvChipAction';
import type { CrvChipActionColor, CrvChipActionSize, CrvChipActionVariant } from './CrvChipAction.types';

const SIZES: CrvChipActionSize[] = ['small', 'medium'];
const COLORS: CrvChipActionColor[] = ['default', 'primary'];
const VARIANTS: CrvChipActionVariant[] = ['filled', 'outlined'];

const meta: Meta<typeof CrvChipAction> = {
  title: 'Data Display/CrvChipAction',
  component: CrvChipAction,
  parameters: {
    docs: {
      description: {
        component:
          'Interactive chip — filters, removable tags, and selectable pills. Maps to Figma crv-chip-action.',
      },
    },
    controls: {
      include: [
        'label',
        'size',
        'color',
        'variant',
        'thumbnailVisible',
        'deleteVisible',
        'disabled',
      ],
    },
  },
  argTypes: {
    size: { control: 'select', options: SIZES },
    color: { control: 'select', options: COLORS },
    variant: { control: 'select', options: VARIANTS },
    label: { control: 'text' },
    thumbnailVisible: { control: 'boolean' },
    deleteVisible: { control: 'boolean' },
    disabled: { control: 'boolean' },
    onDelete: { table: { disable: true } },
    onClick: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    label: 'Chip',
    size: 'medium',
    color: 'default',
    variant: 'filled',
    thumbnailVisible: false,
    deleteVisible: false,
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof CrvChipAction>;

export const Default: Story = {};

export const Primary: Story = {
  args: { color: 'primary' },
};

export const Outlined: Story = {
  args: { variant: 'outlined' },
};

export const Small: Story = {
  args: { size: 'small' },
};

export const WithThumbnail: Story = {
  args: { thumbnailVisible: true },
};

export const Deletable: Story = {
  args: {
    deleteVisible: true,
    onDelete: () => undefined,
  },
};

export const WithThumbnailAndDelete: Story = {
  args: {
    thumbnailVisible: true,
    deleteVisible: true,
    onDelete: () => undefined,
  },
};

export const Clickable: Story = {
  args: {
    onClick: () => undefined,
  },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      {VARIANTS.map((variant) => (
        <div key={variant} style={{ display: 'grid', gap: 12 }}>
          <p style={{ fontSize: 12, color: '#64748b', margin: 0 }}>{variant}</p>
          {COLORS.map((color) => (
            <div key={color} style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
              <span style={{ width: 64, fontSize: 12 }}>{color}</span>
              {SIZES.map((size) => (
                <CrvChipAction
                  key={`${variant}-${color}-${size}`}
                  variant={variant}
                  color={color}
                  size={size}
                  label="Chip"
                />
              ))}
            </div>
          ))}
        </div>
      ))}
    </div>
  ),
};
