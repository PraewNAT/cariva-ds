'use client';

import { useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Typography from '@mui/material/Typography';
import ApartmentRoundedIcon from '@mui/icons-material/ApartmentRounded';
import AppsOutlinedIcon from '@mui/icons-material/AppsOutlined';
import ArrowBackRoundedIcon from '@mui/icons-material/ArrowBackRounded';
import BlockRoundedIcon from '@mui/icons-material/BlockRounded';
import DashboardRoundedIcon from '@mui/icons-material/DashboardRounded';
import EditRoundedIcon from '@mui/icons-material/EditRounded';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import LibraryAddCheckOutlinedIcon from '@mui/icons-material/LibraryAddCheckOutlined';
import LockRoundedIcon from '@mui/icons-material/LockRounded';
import RemoveRedEyeRoundedIcon from '@mui/icons-material/RemoveRedEyeRounded';
import SingleBedOutlinedIcon from '@mui/icons-material/SingleBedOutlined';
import SupervisedUserCircleOutlinedIcon from '@mui/icons-material/SupervisedUserCircleOutlined';
import ToggleOnRoundedIcon from '@mui/icons-material/ToggleOnRounded';
import VpnKeyRoundedIcon from '@mui/icons-material/VpnKeyRounded';
import { colors, radius, spacing, typography } from '../../tokens';
import { CrvAvatar } from '../CrvAvatar';
import { CrvBreadcrumb } from '../CrvBreadcrumb';
import { CrvBreadcrumbBase } from '../CrvBreadcrumbBase';
import { CrvButton } from '../CrvButton';
import { CrvButtonIcon } from '../CrvButtonIcon';
import { CrvCheckboxBase } from '../CrvCheckboxBase';
import { CrvPagination } from '../CrvPagination';
import { CrvSidebar } from './CrvSidebar';
import { CrvSidebarMenu } from './CrvSidebarMenu';
import { getNavGroupSx } from './crvSidebarStyles';
import { CrvTableCell, CrvTableHead, CrvTableTextCell, getTableContainerSx, getTableRowSx } from '../CrvTable';
import { CrvTabsFolder, CrvTabsPills } from '../CrvTabs';
import { CrvTag } from '../CrvTag';
import type { CrvTabItem, CrvTabValue } from '../CrvTabs';

const meta: Meta = {
  title: 'Templates/OrganizationOverview',
  parameters: {
    layout: 'fullscreen',
    docs: {
      description: {
        component:
          'Organization overview — Figma 4744:209560. Sidebar matches crv-sidebar instance 4745:210487.',
      },
    },
  },
};

export default meta;
type Story = StoryObj;

const ICON_SECONDARY = { fontSize: 20, color: colors.content.secondary } as const;

interface DeviceRow {
  id: number;
  status: 'active' | 'inactive' | 'suspended';
  deviceName: string;
  platform: string;
  organizationName: string;
  department: string;
  lastActive: string;
}

const DEVICE_ROWS: DeviceRow[] = [
  { id: 1, status: 'active', deviceName: 'BHQ0BDSF11...', platform: 'MacOS', organizationName: 'Bangkok Hospital Headquarter', department: 'Emergency Room', lastActive: '18/10/2025' },
  { id: 2, status: 'inactive', deviceName: 'BHQ0BDSF11...', platform: 'iOS', organizationName: 'Bangkok Hospital Headquarter', department: 'Neurology', lastActive: '18/10/2025' },
  { id: 3, status: 'active', deviceName: 'BHQ0BDSF11...', platform: 'Android', organizationName: 'Bangkok Hospital Headquarter', department: 'Oncology', lastActive: '18/10/2025' },
  { id: 4, status: 'active', deviceName: 'BHQ0BDSF11...', platform: 'Android', organizationName: 'Bangkok Hospital Headquarter', department: 'Pediatrics', lastActive: '18/10/2025' },
  { id: 5, status: 'suspended', deviceName: 'BHQ0BDSF11...', platform: 'Window', organizationName: 'Bangkok Hospital Headquarter', department: 'Geriatrics', lastActive: '18/10/2025' },
];

const STATUS_TO_TAG = {
  active: { color: 'success', label: 'Active' },
  inactive: { color: 'error', label: 'Inactive' },
  suspended: { color: 'warning', label: 'Suspended' },
} as const;

/** Figma Frame 44 (4744:209954) — card bg = accent A01; icon well = accent A04/A05 */
const STAT_CARDS = [
  {
    value: '45/50',
    label: 'Active Devices',
    bg: colors.accent.indigo.A01,
    iconBg: colors.accent.indigo.A05,
    icon: <ToggleOnRoundedIcon sx={{ fontSize: 24, color: colors.content.inverse }} />,
  },
  {
    value: '8',
    label: 'Departments',
    bg: colors.accent.emerald.A01,
    iconBg: colors.accent.emerald.A04,
    icon: <ApartmentRoundedIcon sx={{ fontSize: 24, color: colors.content.inverse }} />,
  },
  {
    value: '12',
    label: 'Active keys',
    bg: colors.accent.blue.A01,
    iconBg: colors.accent.blue.A04,
    icon: <VpnKeyRoundedIcon sx={{ fontSize: 24, color: colors.content.inverse }} />,
  },
  {
    value: '2',
    label: 'Suspended keys',
    bg: colors.accent.orange.A01,
    iconBg: colors.accent.orange.A04,
    icon: <BlockRoundedIcon sx={{ fontSize: 24, color: colors.content.inverse }} />,
  },
  {
    value: '3',
    label: 'Expired keys',
    bg: colors.accent.red.A01,
    iconBg: colors.accent.red.A04,
    icon: <LockRoundedIcon sx={{ fontSize: 24, color: colors.content.inverse }} />,
  },
] as const;

function SummaryCard({
  icon,
  value,
  label,
  bg,
  iconBg,
}: {
  icon: ReactNode;
  value: string;
  label: string;
  bg: string;
  iconBg: string;
}) {
  return (
    <Box
      sx={{
        flex: '1 1 0',
        minWidth: 0,
        height: 88,
        display: 'flex',
        alignItems: 'center',
        gap: `${spacing.lg}px`,
        px: `${spacing.lg}px`,
        py: `${spacing.lg}px`,
        borderRadius: `${radius['12']}px`,
        backgroundColor: bg,
      }}
    >
      <Box
        sx={{
          width: 40,
          height: 40,
          flexShrink: 0,
          borderRadius: `${radius['8']}px`,
          display: 'grid',
          placeItems: 'center',
          backgroundColor: iconBg,
        }}
      >
        {icon}
      </Box>
      <Box sx={{ minWidth: 0 }}>
        <Typography
          sx={{
            fontSize: typography.fontSize.heading.large,
            lineHeight: `${typography.lineHeight.heading.large}px`,
            fontWeight: typography.fontWeight.bold,
            color: colors.content.primary,
          }}
        >
          {value}
        </Typography>
        <Typography
          sx={{
            fontSize: typography.fontSize.body.large,
            lineHeight: `${typography.lineHeight.body.large}px`,
            color: colors.content.secondary,
          }}
        >
          {label}
        </Typography>
      </Box>
    </Box>
  );
}

/** Figma 4745:210487 — single nav-group, no section headers. */
function OverviewSidebar({
  activeMenu,
  onMenuChange,
}: {
  activeMenu: string;
  onMenuChange: (id: string) => void;
}) {
  return (
    <CrvSidebar
      sx={{ borderRight: `1px solid ${colors.border.disabled}`, flexShrink: 0 }}
      logo={
        <Typography
          sx={{
            fontSize: typography.fontSize.heading.medium,
            fontWeight: typography.fontWeight.bold,
            letterSpacing: 1,
            color: colors.brand.primary.onSurface.default,
          }}
        >
          CARIVA
        </Typography>
      }
    >
      <Box sx={getNavGroupSx()}>
        <CrvSidebarMenu
          type="expand"
          label="Organization"
          icon={<DashboardRoundedIcon sx={ICON_SECONDARY} />}
          defaultActive
          items={[
            {
              label: 'Overview',
              selected: activeMenu === 'organization-overview',
              onClick: () => onMenuChange('organization-overview'),
            },
            {
              label: 'Departments',
              selected: activeMenu === 'organization-departments',
              onClick: () => onMenuChange('organization-departments'),
            },
            {
              label: 'License keys',
              selected: activeMenu === 'organization-license',
              onClick: () => onMenuChange('organization-license'),
            },
          ]}
        />
        <CrvSidebarMenu
          type="expand"
          label="Appointment"
          icon={<LibraryAddCheckOutlinedIcon sx={ICON_SECONDARY} />}
          items={[]}
        />
        <CrvSidebarMenu
          type="expand"
          label="Patients"
          icon={<SingleBedOutlinedIcon sx={ICON_SECONDARY} />}
          items={[]}
        />
        <Box sx={getNavGroupSx()}>
          <CrvSidebarMenu
            type="default"
            label="User Management"
            icon={<SupervisedUserCircleOutlinedIcon sx={ICON_SECONDARY} />}
            active={activeMenu === 'user-management'}
            onClick={() => onMenuChange('user-management')}
          />
          <CrvSidebarMenu
            type="default"
            label="App Distribution"
            icon={<AppsOutlinedIcon sx={ICON_SECONDARY} />}
            active={activeMenu === 'app-distribution'}
            onClick={() => onMenuChange('app-distribution')}
          />
        </Box>
      </Box>
    </CrvSidebar>
  );
}

export const ComposedFromDesignSystem: Story = {
  render: () => {
    const [activeMenu, setActiveMenu] = useState('organization-overview');
    const [folderTab, setFolderTab] = useState<CrvTabValue>('overview');
    const [rangeTab, setRangeTab] = useState<CrvTabValue>('day');
    const [page, setPage] = useState(1);
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const allRowsSelected =
      selectedIds.length === DEVICE_ROWS.length && DEVICE_ROWS.length > 0;

    const toggleRow = (id: number) =>
      setSelectedIds((prev) =>
        prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
      );

    const folderItems = useMemo<CrvTabItem[]>(
      () => [
        { value: 'overview', label: 'Overview' },
        { value: 'departments', label: 'Departments' },
        { value: 'license-keys', label: 'License keys' },
      ],
      [],
    );

    const rangeItems = useMemo<CrvTabItem[]>(
      () => [
        { value: 'day', label: 'Day' },
        { value: 'month', label: 'Month' },
        { value: 'year', label: 'Year' },
      ],
      [],
    );

    return (
      <Box sx={{ display: 'flex', minHeight: '100vh', backgroundColor: colors.bg.subtle }}>
        <OverviewSidebar activeMenu={activeMenu} onMenuChange={setActiveMenu} />

        <Box
          sx={{
            flex: 1,
            minWidth: 0,
            display: 'flex',
            flexDirection: 'column',
            gap: `${spacing.lg}px`,
            p: `${spacing.lg}px`,
          }}
        >
          <Box
            sx={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              minHeight: 64,
              px: `${spacing.xl}px`,
              py: `${spacing.md}px`,
              borderRadius: `${radius['16']}px`,
              backgroundColor: colors.onSurface.default,
            }}
          >
            <Typography
              sx={{
                fontSize: typography.fontSize.heading.medium,
                lineHeight: `${typography.lineHeight.heading.medium}px`,
                fontWeight: typography.fontWeight.bold,
                color: colors.content.primary,
              }}
            >
              Organization
            </Typography>
            <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: `${spacing.sm}px` }}>
              <CrvAvatar content="text" size="medium" initials="OP" badge />
              <Typography
                sx={{
                  fontSize: typography.fontSize.label.medium,
                  lineHeight: `${typography.lineHeight.label.medium}px`,
                  fontWeight: typography.fontWeight.medium,
                  color: colors.content.primary,
                }}
              >
                Nattanun A.
              </Typography>
              <KeyboardArrowDownRoundedIcon sx={{ fontSize: 24, color: colors.content.secondary }} />
            </Box>
          </Box>

          <Box sx={{ display: 'inline-flex', alignItems: 'center', gap: `${spacing.lg}px` }}>
            <CrvButton
              size="small"
              variant="outlined"
              color="primary"
              startIcon={<ArrowBackRoundedIcon />}
              sx={{ borderRadius: `${radius.full}px` }}
            >
              Back
            </CrvButton>
            <CrvBreadcrumb>
              <CrvBreadcrumbBase text="Organization" href="#" />
              <CrvBreadcrumbBase text="Overview" type="active" />
            </CrvBreadcrumb>
          </Box>

          <Box
            sx={{
              borderRadius: `${radius['16']}px`,
              overflow: 'hidden',
              backgroundColor: colors.onSurface.default,
            }}
          >
            <Box
              sx={{
                backgroundColor: colors.onSurface.subtle,
                borderRadius: `${radius['12']}px ${radius['12']}px 0 0`,
                overflow: 'hidden',
              }}
            >
              <CrvTabsFolder items={folderItems} value={folderTab} onChange={setFolderTab} />
            </Box>

            <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                gap: `${spacing.lg}px`,
                p: `${spacing.xl}px`,
                backgroundColor: colors.onSurface.default,
              }}
            >
              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: `${spacing.lg}px`,
                }}
              >
                <Typography
                  sx={{
                    fontSize: typography.fontSize.heading.large,
                    lineHeight: `${typography.lineHeight.heading.large}px`,
                    fontWeight: typography.fontWeight.bold,
                    color: colors.content.primary,
                  }}
                >
                  Overview
                </Typography>
                <CrvTabsPills items={rangeItems} value={rangeTab} onChange={setRangeTab} tabVariant="default" />
              </Box>

              <Box sx={{ display: 'flex', gap: `${spacing.lg}px` }}>
                {STAT_CARDS.map((card) => (
                  <SummaryCard key={card.label} {...card} />
                ))}
              </Box>

              <Box
                sx={{
                  border: `1px solid ${colors.border.disabled}`,
                  borderRadius: `${radius['16']}px`,
                  p: `${spacing.lg}px`,
                  display: 'flex',
                  flexDirection: 'column',
                  gap: `${spacing.lg}px`,
                }}
              >
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Typography
                    sx={{
                      fontSize: typography.fontSize.heading.medium,
                      lineHeight: `${typography.lineHeight.heading.medium}px`,
                      fontWeight: typography.fontWeight.bold,
                    }}
                  >
                    Organization Details
                  </Typography>
                  <CrvButton
                    variant="outlined"
                    size="small"
                    startIcon={<EditRoundedIcon />}
                    sx={{ borderRadius: `${radius.full}px` }}
                  >
                    Edit
                  </CrvButton>
                </Box>
                <Box
                  sx={{
                    display: 'grid',
                    gridTemplateColumns: 'auto 1fr',
                    rowGap: `${spacing.sm}px`,
                    columnGap: `${spacing.sm}px`,
                    maxWidth: 540,
                  }}
                >
                  <Typography sx={{ fontSize: typography.fontSize.body.large, color: colors.content.primary }}>
                    Organization name:
                  </Typography>
                  <Typography sx={{ fontSize: typography.fontSize.body.large }}>Cariva Hospital</Typography>
                  <Typography sx={{ fontSize: typography.fontSize.body.large, color: colors.content.primary }}>
                    Organization code:
                  </Typography>
                  <Typography sx={{ fontSize: typography.fontSize.body.large }}>CRV</Typography>
                  <Typography sx={{ fontSize: typography.fontSize.body.large, color: colors.content.primary }}>
                    Package type:
                  </Typography>
                  <Typography sx={{ fontSize: typography.fontSize.body.large }}>Premium</Typography>
                  <Typography sx={{ fontSize: typography.fontSize.body.large, color: colors.content.primary }}>
                    Status:
                  </Typography>
                  <Box>
                    <CrvTag color="success" label="Active" />
                  </Box>
                </Box>
              </Box>

              <Box sx={{ display: 'flex', flexDirection: 'column', gap: `${spacing.lg}px` }}>
                <Typography
                  sx={{
                    fontSize: typography.fontSize.heading.medium,
                    lineHeight: `${typography.lineHeight.heading.medium}px`,
                    fontWeight: typography.fontWeight.bold,
                  }}
                >
                  Devices
                </Typography>
                <Box sx={[getTableContainerSx(), { borderRadius: `${radius['16']}px`, overflow: 'hidden' }]}>
                  <Table>
                    <TableHead>
                      <TableRow sx={getTableRowSx()}>
                        <CrvTableHead
                          size="default"
                          compact
                          checkbox={
                            <CrvCheckboxBase
                              checked={allRowsSelected}
                              indeterminate={selectedIds.length > 0 && !allRowsSelected}
                              onChange={() =>
                                setSelectedIds(
                                  allRowsSelected ? [] : DEVICE_ROWS.map((r) => r.id),
                                )
                              }
                            />
                          }
                        />
                        <CrvTableHead size="default" label="Status" />
                        <CrvTableHead size="default" label="Device name" />
                        <CrvTableHead size="default" label="Platform" />
                        <CrvTableHead size="default" label="Organization Name" />
                        <CrvTableHead size="default" label="Department" />
                        <CrvTableHead size="default" label="Last Active" />
                        <CrvTableHead size="default" compact label="Action" />
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {DEVICE_ROWS.map((row, index) => {
                        const tag = STATUS_TO_TAG[row.status];
                        return (
                          <TableRow key={row.id} sx={getTableRowSx()}>
                            <CrvTableCell size="default" compact alternate={index % 2 === 1}>
                              <CrvCheckboxBase
                                checked={selectedIds.includes(row.id)}
                                onChange={() => toggleRow(row.id)}
                              />
                            </CrvTableCell>
                            <CrvTableCell size="default" alternate={index % 2 === 1}>
                              <CrvTag color={tag.color} label={tag.label} />
                            </CrvTableCell>
                            <CrvTableCell size="default" alternate={index % 2 === 1}>
                              <CrvTableTextCell main={row.deviceName} />
                            </CrvTableCell>
                            <CrvTableCell size="default" alternate={index % 2 === 1}>
                              {row.platform}
                            </CrvTableCell>
                            <CrvTableCell size="default" alternate={index % 2 === 1}>
                              {row.organizationName}
                            </CrvTableCell>
                            <CrvTableCell size="default" alternate={index % 2 === 1}>
                              {row.department}
                            </CrvTableCell>
                            <CrvTableCell size="default" alternate={index % 2 === 1}>
                              {row.lastActive}
                            </CrvTableCell>
                            <CrvTableCell size="default" compact alternate={index % 2 === 1}>
                              <CrvButtonIcon
                                variant="ghost"
                                color="primary"
                                size="small"
                                aria-label="view row"
                              >
                                <RemoveRedEyeRoundedIcon sx={{ fontSize: 18 }} />
                              </CrvButtonIcon>
                            </CrvTableCell>
                          </TableRow>
                        );
                      })}
                    </TableBody>
                  </Table>
                </Box>
              </Box>

              <Box
                sx={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between',
                  gap: `${spacing.lg}px`,
                  flexWrap: 'wrap',
                }}
              >
                <Typography
                  sx={{
                    fontSize: typography.fontSize.body.small,
                    lineHeight: `${typography.lineHeight.body.small}px`,
                    color: colors.content.secondary,
                  }}
                >
                  Showing 1–5 of 24 results
                </Typography>
                <CrvPagination page={page} count={12} size="medium" onChange={(_, next) => setPage(next)} />
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    );
  },
};
