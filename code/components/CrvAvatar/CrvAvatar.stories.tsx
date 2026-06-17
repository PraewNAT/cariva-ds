'use client';

import type { Meta, StoryObj } from '@storybook/react';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import { CrvAvatar } from './CrvAvatar';

const meta: Meta<typeof CrvAvatar> = {
  title: 'Data Display/CrvAvatar',
  component: CrvAvatar,
  parameters: {
    docs: {
      description: {
        component:
          'Profile avatar — image, initials, or icon. Supports online badge.',
      },
    },
    controls: {
      include: ['content', 'size', 'badge', 'initials', 'variant'],
    },
  },
  argTypes: {
    content: {
      control: 'select',
      options: ['text', 'image', 'icon'],
    },
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'xSmall'],
    },
    badge: { control: 'boolean' },
    initials: { control: 'text' },
    variant: { table: { disable: true } },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
    src: { table: { disable: true } },
    icon: { table: { disable: true } },
  },
  args: {
    content: 'text',
    size: 'large',
    badge: false,
    initials: 'OP',
  },
};

export default meta;
type Story = StoryObj<typeof CrvAvatar>;

export const Text: Story = {
  args: {
    content: 'text',
    initials: 'OP',
    size: 'large',
  },
};

export const Image: Story = {
  args: {
    content: 'image',
    size: 'large',
    src: 'https://i.pravatar.cc/80?img=12',
    alt: 'Profile photo',
  },
};

export const Icon: Story = {
  args: {
    content: 'icon',
    size: 'large',
  },
};

export const WithBadge: Story = {
  args: {
    content: 'text',
    initials: 'OP',
    size: 'medium',
    badge: true,
  },
};

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <CrvAvatar content="text" initials="OP" size="large" />
      <CrvAvatar content="text" initials="OP" size="medium" />
      <CrvAvatar content="text" initials="OP" size="small" />
      <CrvAvatar content="text" initials="OP" size="xSmall" />
    </div>
  ),
};

export const ContentVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <CrvAvatar content="text" initials="OP" size="large" />
      <CrvAvatar
        content="image"
        size="large"
        src="https://i.pravatar.cc/80?img=12"
        alt="Profile"
      />
      <CrvAvatar
        content="icon"
        size="large"
        icon={<PersonOutlineIcon sx={{ fontSize: 16 }} />}
      />
    </div>
  ),
};

export const BadgeSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <CrvAvatar content="text" initials="OP" size="large" badge />
      <CrvAvatar content="text" initials="OP" size="medium" badge />
      <CrvAvatar content="text" initials="OP" size="small" badge />
      <CrvAvatar content="text" initials="OP" size="xSmall" badge />
    </div>
  ),
};
