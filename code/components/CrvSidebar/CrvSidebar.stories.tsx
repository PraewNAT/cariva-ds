'use client';

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import HomeOutlinedIcon from '@mui/icons-material/HomeOutlined';
import DashboardOutlinedIcon from '@mui/icons-material/DashboardOutlined';
import PeopleOutlineIcon from '@mui/icons-material/PeopleOutline';
import DescriptionOutlinedIcon from '@mui/icons-material/DescriptionOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import { colors } from '../../tokens';
import { CrvMenuItem } from '../CrvMenuItem';
import { CrvSidebar } from './CrvSidebar';
import { CrvSidebarMenu } from './CrvSidebarMenu';
import { CrvSidebarSection } from './CrvSidebarSection';

const meta: Meta<typeof CrvSidebar> = {
  title: 'Navigation/CrvSidebar',
  component: CrvSidebar,
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Vertical primary-navigation panel. Maps to Figma `crv-sidebar` (4724:103532) with ' +
          '`crv-sidebar-menu` (4735:102038) expandable groups. 240px wide; `logo` + `children` ' +
          '(content slot) compose `CrvSidebarSection`, `CrvSidebarMenu`, and `CrvMenuItem`.',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CrvSidebar>;

const Logo = (
  <Typography sx={{ fontWeight: 700, fontSize: 20, color: colors.brand.primary.onSurface.default }}>
    Cariva
  </Typography>
);

export const Default: Story = {
  render: () => {
    const [active, setActive] = useState('overview');

    return (
      <Box sx={{ height: '100vh', display: 'flex', backgroundColor: colors.bg.page }}>
        <CrvSidebar logo={Logo} sx={{ borderRight: `1px solid ${colors.border.default}` }}>
          <CrvSidebarSection>
            <CrvMenuItem
              component="div"
              leftIcon={<HomeOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              rightIconVisible={false}
              selected={active === 'home'}
              onClick={() => setActive('home')}
              sx={{ borderRadius: '12px' }}
            >
              Home
            </CrvMenuItem>
          </CrvSidebarSection>

          <CrvSidebarSection header="Workspace">
            <CrvSidebarMenu
              label="Dashboard"
              icon={<DashboardOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              defaultOpen
              items={[
                { label: 'Overview', selected: active === 'overview', onClick: () => setActive('overview') },
                { label: 'Analytics', selected: active === 'analytics', onClick: () => setActive('analytics') },
                { label: 'Reports', selected: active === 'reports', onClick: () => setActive('reports') },
              ]}
            />
            <CrvSidebarMenu
              label="People"
              icon={<PeopleOutlineIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              items={[
                { label: 'Members', selected: active === 'members', onClick: () => setActive('members') },
                { label: 'Teams', selected: active === 'teams', onClick: () => setActive('teams') },
              ]}
            />
            <CrvMenuItem
              component="div"
              leftIcon={<DescriptionOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              rightIconVisible={false}
              selected={active === 'docs'}
              onClick={() => setActive('docs')}
              sx={{ borderRadius: '12px' }}
            >
              Documents
            </CrvMenuItem>
          </CrvSidebarSection>

          <CrvSidebarSection header="System">
            <CrvMenuItem
              component="div"
              leftIcon={<SettingsOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              rightIconVisible={false}
              selected={active === 'settings'}
              onClick={() => setActive('settings')}
              sx={{ borderRadius: '12px' }}
            >
              Settings
            </CrvMenuItem>
            <CrvMenuItem
              component="div"
              leftIcon={<HelpOutlineIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              rightIconVisible={false}
              selected={active === 'help'}
              onClick={() => setActive('help')}
              sx={{ borderRadius: '12px' }}
            >
              Help
            </CrvMenuItem>
          </CrvSidebarSection>
        </CrvSidebar>

        <Box sx={{ flex: 1, p: 4 }}>
          <Typography variant="h6">Content area</Typography>
          <Typography variant="body2" sx={{ color: colors.content.secondary }}>
            Active: {active}
          </Typography>
        </Box>
      </Box>
    );
  },
};

/** Just the expandable menu group — open vs collapsed (Figma `open` variant). */
export const MenuStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: 'flex', gap: 4, p: 3, backgroundColor: colors.onSurface.default }}>
      <Box sx={{ width: 240 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>open=true</Typography>
        <CrvSidebarMenu
          label="Dashboard"
          icon={<DashboardOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
          open
          items={[
            { label: 'Overview', selected: true },
            { label: 'Analytics' },
            { label: 'Reports' },
          ]}
        />
      </Box>
      <Box sx={{ width: 240 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>open=false</Typography>
        <CrvSidebarMenu
          label="Dashboard"
          icon={<DashboardOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
          open={false}
          items={[{ label: 'Overview' }, { label: 'Analytics' }]}
        />
      </Box>
    </Box>
  ),
};
