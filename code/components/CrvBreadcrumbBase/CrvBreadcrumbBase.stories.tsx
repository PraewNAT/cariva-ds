'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CrvBreadcrumbBase } from './CrvBreadcrumbBase';

const meta: Meta<typeof CrvBreadcrumbBase> = {
  title: 'Navigation/CrvBreadcrumbBase',
  component: CrvBreadcrumbBase,
  parameters: {
    docs: {
      description: {
        component:
          'Single breadcrumb item — link, dropdown, ellipsis, or current page.',
      },
    },
    controls: {
      include: ['type', 'text', 'href'],
    },
  },
  argTypes: {
    type: {
      control: 'select',
      options: ['default', 'dropdown', 'ellipsis', 'active'],
    },
    text: { control: 'text' },
    href: { control: 'text' },
    onClick: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    type: 'default',
    text: 'breadcrumb',
    href: '#',
  },
};

export default meta;
type Story = StoryObj<typeof CrvBreadcrumbBase>;

export const Default: Story = {};

export const Dropdown: Story = {
  args: {
    type: 'dropdown',
    text: 'breadcrumb',
    href: '#',
  },
};

export const Active: Story = {
  args: {
    type: 'active',
    text: 'breadcrumb',
  },
};

export const Ellipsis: Story = {
  args: {
    type: 'ellipsis',
  },
};

export const AllTypes: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 16 }}>
      <CrvBreadcrumbBase text="breadcrumb" href="#" />
      <CrvBreadcrumbBase type="dropdown" text="breadcrumb" href="#" />
      <CrvBreadcrumbBase type="active" text="breadcrumb" />
      <CrvBreadcrumbBase type="ellipsis" />
    </div>
  ),
};

export const Hover: Story = {
  parameters: {
    controls: { disable: true },
    pseudo: { hover: true },
  },
  render: () => (
    <div style={{ display: 'flex', gap: 24 }}>
      <CrvBreadcrumbBase text="breadcrumb" href="#" />
      <CrvBreadcrumbBase type="dropdown" text="breadcrumb" href="#" />
    </div>
  ),
};
