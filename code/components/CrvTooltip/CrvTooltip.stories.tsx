'use client';

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import { CrvButton } from '../CrvButton';
import {
  CrvTooltip,
  CrvTooltipWithAction,
  CrvTooltipWithActionPanel,
} from './CrvTooltip';
import {
  getWithActionPreviewPlacementSx,
  STANDARD_PREVIEW_PLACEMENTS,
  WITH_ACTION_PREVIEW_PLACEMENTS,
} from './crvTooltipStyles';
import type { CrvTooltipWithActionPlacement } from './CrvTooltip.types';

const meta: Meta<typeof CrvTooltip> = {
  title: 'Data Display/CrvTooltip',
  component: CrvTooltip,
  parameters: {
    docs: {
      description: {
        component:
          'Contextual labels and onboarding walkthrough tooltips. Maps to Figma Tooltips section node 4167:287.',
      },
    },
    controls: {
      include: ['placement', 'title'],
    },
  },
  argTypes: {
    placement: {
      control: 'select',
      options: STANDARD_PREVIEW_PLACEMENTS,
    },
    title: { control: 'text' },
    sx: { table: { disable: true } },
    ref: { table: { disable: true } },
    children: { table: { disable: true } },
  },
  args: {
    placement: 'bottom',
    title: 'My Tooltip',
  },
};

export default meta;
type Story = StoryObj<typeof CrvTooltip>;

export const Playground: Story = {
  render: (args) => (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 160 }}>
      <CrvTooltip {...args}>
        <CrvButton variant="outlined" color="primary" size="small">
          Hover me
        </CrvButton>
      </CrvTooltip>
    </Box>
  ),
};

export const StandardPlacements: Story = {
  render: () => (
    <Box sx={{ display: 'grid', gap: 4, py: 4, px: 6 }}>
      {STANDARD_PREVIEW_PLACEMENTS.map((placement) => (
        <Box key={placement} sx={{ display: 'grid', gap: 1, justifyItems: 'center' }}>
          <Typography variant="caption">{placement}</Typography>
          <CrvTooltip
            title="My Tooltip"
            placement={placement}
            open
            disableHoverListener
            disableFocusListener
            disableTouchListener
          >
            <Box sx={{ width: 8, height: 8, borderRadius: '50%', bgcolor: 'primary.main' }} />
          </CrvTooltip>
        </Box>
      ))}
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

export const WithIconTrigger: Story = {
  render: () => (
    <CrvTooltip title="Additional information about this field" placement="top">
      <InfoOutlinedIcon sx={{ fontSize: 20, color: 'text.secondary', cursor: 'help' }} />
    </CrvTooltip>
  ),
  parameters: { controls: { disable: true } },
};

export const WithActionPanel: StoryObj<typeof CrvTooltipWithActionPanel> = {
  render: () => (
    <CrvTooltipWithActionPanel
      step="1/7"
      content="Welcome to the app guide. You may skip for now and return here later."
    />
  ),
  parameters: { controls: { disable: true } },
};

export const WithActionPlacements: Story = {
  render: () => (
    <Box sx={{ display: 'grid', gap: 3 }}>
      {WITH_ACTION_PREVIEW_PLACEMENTS.map((placement) => (
        <Box key={placement} sx={{ display: 'grid', gap: 1 }}>
          <Typography variant="caption">{placement}</Typography>
          <Box sx={getWithActionPreviewPlacementSx(placement)}>
            <CrvTooltipWithActionPanel />
          </Box>
        </Box>
      ))}
    </Box>
  ),
  parameters: { controls: { disable: true } },
};

function InteractiveWalkthroughDemo({
  placement = 'bottom-start',
}: {
  placement?: CrvTooltipWithActionPlacement;
}) {
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);

  return (
    <Box sx={{ display: 'grid', placeItems: 'center', minHeight: 320 }}>
      <CrvTooltipWithAction
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        placement={placement}
        onClose={() => setAnchorEl(null)}
        step="1/7"
        content="Welcome to the app guide. You may skip for now and return here later."
        onBack={() => setAnchorEl(null)}
        onNext={() => setAnchorEl(null)}
      >
        <CrvButton
          variant="contained"
          color="primary"
          size="medium"
          onClick={(event) => setAnchorEl(event.currentTarget)}
        >
          Start guide
        </CrvButton>
      </CrvTooltipWithAction>
    </Box>
  );
}

export const WithActionInteractive: Story = {
  render: () => <InteractiveWalkthroughDemo placement="bottom-start" />,
  parameters: { controls: { disable: true } },
};
