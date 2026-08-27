'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CrvAvatar } from '../CrvAvatar';
import { CrvAvatarGroup } from './CrvAvatarGroup';

const meta: Meta<typeof CrvAvatarGroup> = {
  title: 'Data Display/CrvAvatarGroup',
  component: CrvAvatarGroup,
  parameters: {
    docs: {
      description: {
        component:
          'Overlapping avatar stack with +N overflow — composes CrvAvatar children.',
      },
    },
    controls: {
      include: ['size', 'max'],
    },
  },
  argTypes: {
    size: {
      control: 'select',
      options: ['large', 'medium', 'small', 'xSmall'],
    },
    max: {
      control: 'select',
      options: [2, 3, 4, 5],
    },
  },
  args: {
    size: 'large',
    max: 3,
  },
  render: (args) => (
    <CrvAvatarGroup {...args}>
      <CrvAvatar content="text" initials="AB" />
      <CrvAvatar content="text" initials="CD" />
      <CrvAvatar content="text" initials="EF" />
      <CrvAvatar content="text" initials="GH" />
      <CrvAvatar content="text" initials="IJ" />
    </CrvAvatarGroup>
  ),
};

export default meta;
type Story = StoryObj<typeof CrvAvatarGroup>;

export const Default: Story = {
  args: {
    size: 'large',
    max: 3,
  },
};

export const MaxTwo: Story = {
  args: {
    size: 'large',
    max: 2,
  },
};

export const MaxFive: Story = {
  args: {
    size: 'large',
    max: 5,
  },
};

export const AllSizes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 24 }}>
      <CrvAvatarGroup size="large" max={3}>
        <CrvAvatar content="text" initials="AB" />
        <CrvAvatar content="text" initials="CD" />
        <CrvAvatar content="text" initials="EF" />
        <CrvAvatar content="text" initials="GH" />
      </CrvAvatarGroup>
      <CrvAvatarGroup size="medium" max={4}>
        <CrvAvatar content="text" initials="AB" />
        <CrvAvatar content="text" initials="CD" />
        <CrvAvatar content="text" initials="EF" />
        <CrvAvatar content="text" initials="GH" />
        <CrvAvatar content="text" initials="IJ" />
      </CrvAvatarGroup>
      <CrvAvatarGroup size="small" max={2}>
        <CrvAvatar content="text" initials="AB" />
        <CrvAvatar content="text" initials="CD" />
        <CrvAvatar content="text" initials="EF" />
      </CrvAvatarGroup>
      <CrvAvatarGroup size="xSmall" max={5}>
        <CrvAvatar content="text" initials="AB" />
        <CrvAvatar content="text" initials="CD" />
        <CrvAvatar content="text" initials="EF" />
        <CrvAvatar content="text" initials="GH" />
        <CrvAvatar content="text" initials="IJ" />
        <CrvAvatar content="text" initials="KL" />
      </CrvAvatarGroup>
    </div>
  ),
};
