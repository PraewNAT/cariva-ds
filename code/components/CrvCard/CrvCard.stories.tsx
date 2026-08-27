'use client';

import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CrvButton } from '../CrvButton';
import { CrvCard } from './CrvCard';

const meta: Meta<typeof CrvCard> = {
  title: 'Data Display/CrvCard',
  component: CrvCard,
  parameters: {
    docs: {
      description: {
        component:
          'Content card. Maps to Figma `Card` (4536:123343): `crv-card-vertical`, ' +
          '`crv-card-horizontal` (image left/right/absolute), and `crv-card-small-horizontal`. ' +
          'Composes `CrvTag` for the badge and `CrvButton` for actions; `image` is a media slot.',
      },
    },
  },
  argTypes: {
    orientation: { control: 'inline-radio', options: ['vertical', 'horizontal', 'small'] },
    imagePosition: { control: 'inline-radio', options: ['left', 'right', 'absolute'] },
    showImage: { control: 'boolean' },
    showTag: { control: 'boolean' },
    showTopMessage: { control: 'boolean' },
    showDescription: { control: 'boolean' },
    showTrailing: { control: 'boolean' },
  },
  args: {
    orientation: 'vertical',
    imagePosition: 'right',
    showImage: true,
    showTag: true,
    showTopMessage: true,
    showDescription: true,
    tag: 'Label',
    topMessage: 'Update 12 มิ.ย.67  15:28 น.',
    header: 'Header',
    description: 'Description',
  },
};

export default meta;
type Story = StoryObj<typeof CrvCard>;

const PrimaryCta = (
  <CrvButton variant="contained" color="primary" size="small" endIcon={<ArrowForwardIcon />}>
    Label
  </CrvButton>
);

export const Vertical: Story = {
  args: { orientation: 'vertical', actions: PrimaryCta },
  render: (args) => (
    <Box sx={{ width: 280 }}>
      <CrvCard {...args} />
    </Box>
  ),
};

export const VerticalTwoButtons: Story = {
  args: {
    orientation: 'vertical',
    actions: (
      <>
        <CrvButton variant="outlined" color="primary" size="small">
          Label
        </CrvButton>
        <CrvButton variant="contained" color="primary" size="small">
          Label
        </CrvButton>
      </>
    ),
  },
  render: (args) => (
    <Box sx={{ width: 280 }}>
      <CrvCard {...args} />
    </Box>
  ),
};

export const HorizontalRight: Story = {
  args: { orientation: 'horizontal', imagePosition: 'right', actions: PrimaryCta },
  render: (args) => (
    <Box sx={{ width: 420 }}>
      <CrvCard {...args} />
    </Box>
  ),
};

export const HorizontalLeft: Story = {
  args: { orientation: 'horizontal', imagePosition: 'left', actions: PrimaryCta },
  render: (args) => (
    <Box sx={{ width: 420 }}>
      <CrvCard {...args} />
    </Box>
  ),
};

export const ImageAbsolute: Story = {
  args: {
    orientation: 'horizontal',
    imagePosition: 'absolute',
    actions: (
      <CrvButton variant="contained" color="primary" size="small" fullWidth endIcon={<ArrowForwardIcon />}>
        Label
      </CrvButton>
    ),
  },
  render: (args) => (
    <Box sx={{ width: 420 }}>
      <CrvCard {...args} />
    </Box>
  ),
};

export const Small: Story = {
  args: {
    orientation: 'small',
    showTopMessage: false,
    trailing: <ChevronRightIcon fontSize="small" />,
  },
  render: (args) => (
    <Box sx={{ width: 344 }}>
      <CrvCard {...args} />
    </Box>
  ),
};
