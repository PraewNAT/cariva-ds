'use client';

import type { Meta, StoryObj } from '@storybook/react';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import { CrvAvatar } from '../CrvAvatar';
import { CrvButtonIcon } from '../CrvButtonIcon';
import { CrvBadge } from './CrvBadge';
import type { CrvBadgeColor } from './CrvBadge.types';

const COLORS: CrvBadgeColor[] = [
  'primary',
  'error',
  'success',
  'warning',
  'info',
  'default',
];

const meta: Meta<typeof CrvBadge> = {
  title: 'Data Display/CrvBadge',
  component: CrvBadge,
  parameters: {
    docs: {
      description: {
        component:
          'Overlay indicator on icons or avatars — dot or counted standard badge.',
      },
    },
    controls: {
      include: ['variant', 'color', 'badgeContent'],
    },
  },
  argTypes: {
    variant: {
      control: 'select',
      options: ['dot', 'standard'],
    },
    color: {
      control: 'select',
      options: COLORS,
    },
    badgeContent: { control: 'text' },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    variant: 'standard',
    color: 'primary',
    badgeContent: '1',
  },
};

export default meta;
type Story = StoryObj<typeof CrvBadge>;

export const Standard: Story = {
  args: {
    variant: 'standard',
    color: 'primary',
    badgeContent: '1',
  },
};

export const Dot: Story = {
  args: {
    variant: 'dot',
    color: 'error',
  },
};

export const AllColorsStandard: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {COLORS.map((color) => (
        <CrvBadge key={color} variant="standard" color={color} badgeContent="1" />
      ))}
    </div>
  ),
};

export const AllColorsDot: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
      {COLORS.map((color) => (
        <CrvBadge key={color} variant="dot" color={color} />
      ))}
    </div>
  ),
};

export const OnIcon: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <CrvBadge variant="standard" color="error" badgeContent="3" overlap="circular">
      <CrvButtonIcon aria-label="Notifications">
        <NotificationsNoneIcon />
      </CrvButtonIcon>
    </CrvBadge>
  ),
};

export const OnAvatar: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <CrvBadge
      variant="standard"
      color="primary"
      badgeContent="3"
      overlap="circular"
    >
      <CrvAvatar content="text" initials="OP" size="large" />
    </CrvBadge>
  ),
};

/** Online status dot — use CrvAvatar `badge`, not CrvBadge */
export const AvatarOnlineStatus: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <CrvAvatar content="text" initials="OP" size="large" badge />
  ),
};
