'use client';

import type { Meta, StoryObj } from '@storybook/react';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { CrvAccordion } from './CrvAccordion';

const meta: Meta<typeof CrvAccordion> = {
  title: 'Disclosure/CrvAccordion',
  component: CrvAccordion,
  parameters: {
    docs: {
      description: {
        component:
          'Expand/collapse section — wraps MUI Accordion. Use for FAQ, filters, settings.',
      },
    },
    controls: {
      include: ['title', 'showIcon', 'defaultExpanded'],
    },
  },
  argTypes: {
    showIcon: { control: 'boolean' },
    defaultExpanded: { control: 'boolean' },
    title: { control: 'text' },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
    expanded: { table: { disable: true } },
    onChange: { table: { disable: true } },
  },
  args: {
    title: 'Is it accessible?',
    showIcon: true,
    defaultExpanded: false,
    children: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
  render: (args) => (
    <CrvAccordion key={String(args.defaultExpanded)} {...args} />
  ),
  decorators: [
    (Story) => (
      <div style={{ maxWidth: 450 }}>
        <Story />
      </div>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CrvAccordion>;

export const Collapsed: Story = {
  args: {
    title: 'Is it accessible?',
    defaultExpanded: false,
    children: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
};

export const Expanded: Story = {
  args: {
    title: 'Is it accessible?',
    defaultExpanded: true,
    children: 'Yes. It adheres to the WAI-ARIA design pattern.',
  },
};

export const WithoutIcon: Story = {
  args: {
    showIcon: false,
    title: 'Is it styled?',
    children: 'Yes. It comes with default styles that match the design system.',
  },
};

export const CustomIcon: Story = {
  args: {
    title: 'Need help?',
    icon: <HelpOutlineIcon sx={{ fontSize: 22, color: '#2563eb' }} />,
    children: 'Contact support for assistance.',
  },
};

export const FaqGroup: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <div style={{ display: 'grid', gap: 12, maxWidth: 450 }}>
      <CrvAccordion title="Is it accessible?">
        Yes. It adheres to the WAI-ARIA design pattern.
      </CrvAccordion>
      <CrvAccordion title="Is it styled?">
        Yes. It comes with default styles that match the design system.
      </CrvAccordion>
      <CrvAccordion title="Is it animated?">
        Yes. It&apos;s animated by default, but you can disable it if you prefer.
      </CrvAccordion>
    </div>
  ),
};
