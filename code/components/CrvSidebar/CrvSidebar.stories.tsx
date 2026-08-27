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
          '(content slot) compose `CrvSidebarSection` and `CrvSidebarMenu` (`type=expand` or `type=default`).',
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
            <CrvSidebarMenu
              type="default"
              label="Home"
              icon={<HomeOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              active={active === 'home'}
              onClick={() => setActive('home')}
            />
          </CrvSidebarSection>

          <CrvSidebarSection header="Workspace">
            <CrvSidebarMenu
              type="expand"
              label="Dashboard"
              icon={<DashboardOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              defaultActive
              items={[
                { label: 'Overview', selected: active === 'overview', onClick: () => setActive('overview') },
                { label: 'Analytics', selected: active === 'analytics', onClick: () => setActive('analytics') },
                { label: 'Reports', selected: active === 'reports', onClick: () => setActive('reports') },
              ]}
            />
            <CrvSidebarMenu
              type="expand"
              label="People"
              icon={<PeopleOutlineIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              items={[
                { label: 'Members', selected: active === 'members', onClick: () => setActive('members') },
                { label: 'Teams', selected: active === 'teams', onClick: () => setActive('teams') },
              ]}
            />
            <CrvSidebarMenu
              type="default"
              label="Documents"
              icon={<DescriptionOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              active={active === 'docs'}
              onClick={() => setActive('docs')}
            />
          </CrvSidebarSection>

          <CrvSidebarSection header="System">
            <CrvSidebarMenu
              type="default"
              label="Settings"
              icon={<SettingsOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              active={active === 'settings'}
              onClick={() => setActive('settings')}
            />
            <CrvSidebarMenu
              type="default"
              label="Help"
              icon={<HelpOutlineIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
              active={active === 'help'}
              onClick={() => setActive('help')}
            />
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

/** Figma crv-sidebar-menu 4735:102038 — type=expand|default × active=true|false */
export const MenuStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: 'flex', gap: 4, p: 3, backgroundColor: colors.onSurface.default }}>
      <Box sx={{ width: 240 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          type=expand, active=true
        </Typography>
        <CrvSidebarMenu
          type="expand"
          label="Menu item"
          icon={<DashboardOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
          active
          items={[
            { label: 'Sub item', selected: true },
            { label: 'Sub item' },
            { label: 'Sub item' },
          ]}
        />
      </Box>
      <Box sx={{ width: 240 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          type=expand, active=false
        </Typography>
        <CrvSidebarMenu
          type="expand"
          label="Menu item"
          icon={<DashboardOutlinedIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
          active={false}
          items={[{ label: 'Sub item' }, { label: 'Sub item' }]}
        />
      </Box>
      <Box sx={{ width: 240 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          type=default, active=false
        </Typography>
        <CrvSidebarMenu
          type="default"
          label="Menu item"
          icon={<PeopleOutlineIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
          active={false}
          onClick={() => undefined}
        />
      </Box>
      <Box sx={{ width: 240 }}>
        <Typography variant="caption" sx={{ mb: 1, display: 'block' }}>
          type=default, active=true
        </Typography>
        <CrvSidebarMenu
          type="default"
          label="Menu item"
          icon={<PeopleOutlineIcon sx={{ fontSize: 20, color: colors.content.secondary }} />}
          active
          onClick={() => undefined}
        />
      </Box>
    </Box>
  ),
};
