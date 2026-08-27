'use client';

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import MenuList from '@mui/material/MenuList';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { CrvButton } from '../CrvButton';
import { CrvMenuItem } from '../CrvMenuItem';
import { colors } from '../../tokens';
import { CrvDrawer } from './CrvDrawer';
import { getContentSlotSx } from './crvDrawerStyles';
import Box from '@mui/material/Box';

const NAV_ITEMS = [
  { label: 'Profile', icon: <PersonOutlineIcon fontSize="small" /> },
  { label: 'Settings', icon: <SettingsOutlinedIcon fontSize="small" /> },
  { label: 'Billing', icon: <PersonOutlineIcon fontSize="small" /> },
  { label: 'Sign out', icon: <PersonOutlineIcon fontSize="small" /> },
];

function DrawerDemo(props: Partial<React.ComponentProps<typeof CrvDrawer>>) {
  const [open, setOpen] = useState(true);

  return (
    <>
      {!open ? (
        <CrvButton variant="contained" color="primary" onClick={() => setOpen(true)}>
          Open drawer
        </CrvButton>
      ) : null}
      <CrvDrawer {...props} open={open} onClose={() => setOpen(false)}>
        <MenuList disablePadding>
          {NAV_ITEMS.map((item) => (
            <CrvMenuItem key={item.label} leftIcon={item.icon} rightIconVisible>
              {item.label}
            </CrvMenuItem>
          ))}
        </MenuList>
      </CrvDrawer>
    </>
  );
}

const meta: Meta<typeof CrvDrawer> = {
  title: 'Navigation/CrvDrawer',
  component: CrvDrawer,
  parameters: {
    docs: {
      description: {
        component:
          'Side panel that slides in from the screen edge. Maps to Figma `crv-drawer` (4497:77989) ' +
          'on the Drawer page. `children` is the `contentSlot` — typically `CrvMenuItem` rows. ' +
          'Uses MUI temporary drawer with `color/overlay/backdrop`.',
      },
    },
  },
  argTypes: {
    anchor: { control: 'inline-radio', options: ['left', 'right', 'top', 'bottom'] },
    variant: { control: 'inline-radio', options: ['temporary', 'persistent', 'permanent'] },
    open: { control: 'boolean' },
  },
  args: {
    anchor: 'left',
    variant: 'temporary',
  },
};

export default meta;
type Story = StoryObj<typeof CrvDrawer>;

/** Default — left drawer with menu items (matches Figma contentSlot demo). */
export const Default: Story = {
  render: (args) => <DrawerDemo {...args} />,
};

/** Drawer anchored to the right edge. */
export const AnchorRight: Story = {
  args: { anchor: 'right' },
  render: (args) => <DrawerDemo {...args} />,
};

/** Static preview of the contentSlot surface (320px, no overlay). */
export const ContentSlotPreview: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ width: 320, border: `1px solid ${colors.border.default}`, borderRadius: 1, overflow: 'hidden' }}>
      <Box sx={getContentSlotSx()}>
        <MenuList disablePadding>
          {NAV_ITEMS.map((item) => (
            <CrvMenuItem key={item.label} leftIcon={item.icon} rightIconVisible>
              {item.label}
            </CrvMenuItem>
          ))}
        </MenuList>
      </Box>
    </Box>
  ),
};
