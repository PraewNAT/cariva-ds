'use client';

import type { Meta, StoryObj } from '@storybook/react';
import { CrvBreadcrumb, CrvBreadcrumbDemo } from './CrvBreadcrumb';
import { CrvBreadcrumbBase } from '../CrvBreadcrumbBase';

const meta: Meta<typeof CrvBreadcrumb> = {
  title: 'Navigation/CrvBreadcrumb',
  component: CrvBreadcrumb,
  parameters: {
    docs: {
      description: {
        component:
          'Full breadcrumb row — composes CrvBreadcrumbBase with chevron separators.',
      },
    },
  },
  argTypes: {
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
};

export default meta;
type Story = StoryObj<typeof CrvBreadcrumb>;

export const Standard: Story = {
  render: () => <CrvBreadcrumbDemo />,
};

export const FigmaToggles: StoryObj<typeof CrvBreadcrumbDemo> = {
  render: (args) => <CrvBreadcrumbDemo {...args} />,
  argTypes: {
    breadcrumb01: { control: 'boolean' },
    breadcrumb02: { control: 'boolean' },
    breadcrumb03: { control: 'boolean' },
    breadcrumb04: { control: 'boolean' },
    breadcrumb05: { control: 'boolean' },
  },
  args: {
    breadcrumb01: true,
    breadcrumb02: true,
    breadcrumb03: true,
    breadcrumb04: true,
    breadcrumb05: true,
  },
};

export const CustomPath: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <CrvBreadcrumb>
      <CrvBreadcrumbBase text="Home" href="#" />
      <CrvBreadcrumbBase text="Products" href="#" type="dropdown" />
      <CrvBreadcrumbBase text="Category" href="#" />
      <CrvBreadcrumbBase text="Item name" type="active" />
    </CrvBreadcrumb>
  ),
};

export const WithEllipsis: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <CrvBreadcrumb>
      <CrvBreadcrumbBase text="Home" href="#" />
      <CrvBreadcrumbBase type="ellipsis" />
      <CrvBreadcrumbBase text="Settings" href="#" />
      <CrvBreadcrumbBase text="Profile" type="active" />
    </CrvBreadcrumb>
  ),
};
