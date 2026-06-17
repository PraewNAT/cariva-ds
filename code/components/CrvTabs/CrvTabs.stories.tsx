'use client';

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import { colors } from '../../tokens';
import { CrvTag } from '../CrvTag';
import { CrvTabsStandard } from './CrvTabsStandard';
import { CrvTabsPills } from './CrvTabsPills';
import { CrvTabsFolder } from './CrvTabsFolder';
import { getFolderContentSx } from './crvTabsStyles';
import type { CrvTabItem, CrvTabValue } from './CrvTabs.types';

const meta: Meta = {
  title: 'Navigation/CrvTabs',
  parameters: {
    layout: 'padded',
    docs: {
      description: {
        component:
          'Tab family from Figma Tabs section (3875:4441). Three assembled variants: ' +
          '`CrvTabsStandard` (underline), `CrvTabsPills` (segmented), `CrvTabsFolder` (back-office outer layer).',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const baseItems: CrvTabItem[] = [
  { value: 'home', label: 'Home', icon: <HomeOutlinedIcon /> },
  { value: 'favorites', label: 'Favorites', icon: <FavoriteBorderIcon /> },
  { value: 'profile', label: 'Profile', icon: <PersonOutlineIcon /> },
];

function Panel({ value }: { value: CrvTabValue }) {
  return (
    <Box sx={{ mt: 2, p: 2, backgroundColor: colors.bg.subtle, borderRadius: 1 }}>
      <Typography variant="body2" sx={{ color: colors.content.secondary }}>
        Panel: {value}
      </Typography>
    </Box>
  );
}

export const Standard: Story = {
  render: () => {
    const [value, setValue] = useState<CrvTabValue>('home');
    return (
      <Box sx={{ maxWidth: 480 }}>
        <CrvTabsStandard
          items={[
            ...baseItems,
            { value: 'alerts', label: 'Alerts', icon: <FavoriteBorderIcon />, showBadge: true },
          ]}
          value={value}
          onChange={setValue}
        />
        <Panel value={value} />
      </Box>
    );
  },
};

export const Pills: Story = {
  render: () => {
    const [a, setA] = useState<CrvTabValue>('home');
    const [b, setB] = useState<CrvTabValue>('home');
    const [c, setC] = useState<CrvTabValue>('home');
    const [d, setD] = useState<CrvTabValue>('home');
    return (
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 3, maxWidth: 560 }}>
        <Box>
          <Typography variant="caption">standard · default</Typography>
          <Box sx={{ mt: 1 }}>
            <CrvTabsPills items={baseItems} value={a} onChange={setA} />
          </Box>
        </Box>
        <Box>
          <Typography variant="caption">standard · line</Typography>
          <Box sx={{ mt: 1 }}>
            <CrvTabsPills items={baseItems} value={b} onChange={setB} tabVariant="line" />
          </Box>
        </Box>
        <Box>
          <Typography variant="caption">fullWidth · default</Typography>
          <Box sx={{ mt: 1 }}>
            <CrvTabsPills items={baseItems} value={c} onChange={setC} variant="fullWidth" />
          </Box>
        </Box>
        <Box>
          <Typography variant="caption">fullWidth · line</Typography>
          <Box sx={{ mt: 1 }}>
            <CrvTabsPills
              items={baseItems}
              value={d}
              onChange={setD}
              variant="fullWidth"
              tabVariant="line"
            />
          </Box>
        </Box>
      </Box>
    );
  },
};

export const Folder: Story = {
  render: () => {
    const [value, setValue] = useState<CrvTabValue>('overview');
    const items: CrvTabItem[] = [
      {
        value: 'overview',
        label: 'Overview',
        icon: <FolderOutlinedIcon />,
        tag: (
          <CrvTag
            content="number"
            color={value === 'overview' ? 'default' : 'secondary'}
            badgeContent="125"
          />
        ),
      },
      { value: 'details', label: 'Details', icon: <FolderOutlinedIcon /> },
      { value: 'history', label: 'History', icon: <FolderOutlinedIcon /> },
    ];
    return (
      <Box sx={{ backgroundColor: colors.bg.subtle, p: 3, borderRadius: 1 }}>
        <CrvTabsFolder items={items} value={value} onChange={setValue} />
        <Box
          sx={[
            getFolderContentSx(),
            { p: 3, minHeight: 160 },
          ]}
        >
          <Typography variant="body2" sx={{ color: colors.content.secondary }}>
            Content for: {value}
          </Typography>
        </Box>
      </Box>
    );
  },
};

/** Folder over standard — recommended nesting (folder outer, standard inner). */
export const NestedLayers: Story = {
  render: () => {
    const [outer, setOuter] = useState<CrvTabValue>('patients');
    const [inner, setInner] = useState<CrvTabValue>('home');
    return (
      <Box sx={{ backgroundColor: colors.bg.subtle, p: 3, borderRadius: 1 }}>
        <CrvTabsFolder
          items={[
            { value: 'patients', label: 'Patients', icon: <PersonOutlineIcon /> },
            { value: 'reports', label: 'Reports', icon: <FolderOutlinedIcon /> },
          ]}
          value={outer}
          onChange={setOuter}
        />
        <Box sx={[getFolderContentSx(), { p: 2 }]}>
          <CrvTabsStandard items={baseItems} value={inner} onChange={setInner} />
          <Panel value={`${outer} / ${inner}`} />
        </Box>
      </Box>
    );
  },
};
