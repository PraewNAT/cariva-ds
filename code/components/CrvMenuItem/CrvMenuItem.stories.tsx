'use client';

import type { Meta, StoryObj } from '@storybook/react';
import MenuList from '@mui/material/MenuList';
import Paper from '@mui/material/Paper';
import { CrvMenuItem } from './CrvMenuItem';
import { crvMenuPaperSx } from './crvMenuListStyles';

const meta: Meta<typeof CrvMenuItem> = {
  title: 'Navigation/CrvMenuItem',
  component: CrvMenuItem,
  parameters: {
    docs: {
      description: {
        component:
          'Dropdown list row — building block for CrvDropdown and CrvAutocomplete.',
      },
    },
    controls: {
      include: [
        'variant',
        'leftIconVisible',
        'rightIconVisible',
        'selected',
        'disabled',
      ],
    },
  },
  argTypes: {
    variant: { control: 'inline-radio', options: ['default', 'checkbox'] },
    leftIconVisible: { control: 'boolean' },
    rightIconVisible: { control: 'boolean' },
    selected: { control: 'boolean' },
    disabled: { control: 'boolean' },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    children: 'Menu item',
    variant: 'default',
    leftIconVisible: true,
    rightIconVisible: true,
    selected: false,
    disabled: false,
  },
  decorators: [
    (Story) => (
      <Paper sx={crvMenuPaperSx} elevation={0}>
        <MenuList>
          <Story />
        </MenuList>
      </Paper>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof CrvMenuItem>;

export const Default: Story = {};

export const Selected: Story = {
  args: { selected: true },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Checkbox: Story = {
  args: {
    variant: 'checkbox',
    leftIconVisible: false,
    children: 'Multi-select item',
  },
};

export const CheckboxSelected: Story = {
  args: {
    variant: 'checkbox',
    leftIconVisible: false,
    selected: true,
    children: 'Selected item',
  },
};

export const DropdownOption: Story = {
  args: {
    leftIconVisible: false,
    rightIconVisible: false,
    children: 'กรุงเทพมหานคร',
  },
};

export const AllVariants: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Paper sx={{ ...crvMenuPaperSx, maxWidth: 280 }} elevation={0}>
      <MenuList>
        <CrvMenuItem leftIconVisible rightIconVisible>
          Default
        </CrvMenuItem>
        <CrvMenuItem leftIconVisible rightIconVisible selected>
          Selected
        </CrvMenuItem>
        <CrvMenuItem leftIconVisible rightIconVisible disabled>
          Disabled
        </CrvMenuItem>
        <CrvMenuItem variant="checkbox" leftIconVisible={false} rightIconVisible={false}>
          Checkbox
        </CrvMenuItem>
        <CrvMenuItem
          variant="checkbox"
          leftIconVisible={false}
          rightIconVisible={false}
          selected
        >
          Checkbox selected
        </CrvMenuItem>
        <CrvMenuItem leftIconVisible={false} rightIconVisible={false}>
          Dropdown option
        </CrvMenuItem>
      </MenuList>
    </Paper>
  ),
};
