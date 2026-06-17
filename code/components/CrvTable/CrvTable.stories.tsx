'use client';

import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { CrvAvatar } from '../CrvAvatar';
import { CrvButtonIcon } from '../CrvButtonIcon';
import { CrvCheckboxBase } from '../CrvCheckboxBase';
import { CrvLinearProgress } from '../CrvLinearProgress';
import { CrvTag } from '../CrvTag';
import { CrvTableCell } from './CrvTableCell';
import { CrvTableHead } from './CrvTableHead';
import { CrvTableTextCell } from './CrvTableTextCell';
import { getTableContainerSx, getTableRowSx } from './crvTableStyles';
import type { CrvTableSize } from './CrvTable.types';

const meta: Meta<typeof CrvTableCell> = {
  title: 'Data Display/CrvTable',
  component: CrvTableCell,
  parameters: {
    docs: {
      description: {
        component:
          'Composable data table. Maps to Figma `Table` (4700:19306): `crv-table-head` (4582:11202), ' +
          '`crv-table-cell` (4582:11271), `crv-tableText-cell` (4705:20105). Compose with MUI ' +
          '`Table`/`TableHead`/`TableBody`/`TableRow`; the body cell accepts any content (text, tag, ' +
          'checkbox, avatar, progress, actions).',
      },
    },
  },
};

export default meta;
type Story = StoryObj<typeof CrvTableCell>;

interface Row {
  id: number;
  name: string;
  email: string;
  role: string;
  status: 'success' | 'warning' | 'error';
  statusLabel: string;
  progress: number;
}

const ROWS: Row[] = [
  { id: 1, name: 'Somchai Jaidee', email: 'somchai@cariva.co', role: 'Admin', status: 'success', statusLabel: 'Active', progress: 100 },
  { id: 2, name: 'Naree Suksan', email: 'naree@cariva.co', role: 'Editor', status: 'warning', statusLabel: 'Pending', progress: 60 },
  { id: 3, name: 'Anan Pongsak', email: 'anan@cariva.co', role: 'Viewer', status: 'error', statusLabel: 'Suspended', progress: 25 },
  { id: 4, name: 'Kanya Wong', email: 'kanya@cariva.co', role: 'Editor', status: 'success', statusLabel: 'Active', progress: 80 },
];

const STATUS_COLOR = {
  success: 'success',
  warning: 'warning',
  error: 'error',
} as const;

/**
 * Rich demo — every cell shows a different content type:
 * checkbox · avatar + text · tag · linear progress · action button.
 */
function RichTable({ size }: { size: CrvTableSize }) {
  const [selected, setSelected] = useState<number[]>([2]);
  const allSelected = selected.length === ROWS.length;

  const toggle = (id: number) =>
    setSelected((prev) =>
      prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id],
    );

  return (
    <Box sx={getTableContainerSx()}>
      <Table>
        <TableHead>
          <TableRow sx={getTableRowSx()}>
            <CrvTableHead
              size={size}
              compact
              checkbox={
                <CrvCheckboxBase
                  checked={allSelected}
                  indeterminate={selected.length > 0 && !allSelected}
                  onChange={() =>
                    setSelected(allSelected ? [] : ROWS.map((r) => r.id))
                  }
                />
              }
            />
            <CrvTableHead size={size} label="Name" rightSort />
            <CrvTableHead size={size} label="Role" />
            <CrvTableHead size={size} label="Status" />
            <CrvTableHead size={size} label="Progress" />
            <CrvTableHead size={size} compact label="Actions" />
          </TableRow>
        </TableHead>
        <TableBody>
          {ROWS.map((row, index) => {
            const alternate = index % 2 === 1;
            return (
              <TableRow key={row.id} sx={getTableRowSx()}>
                <CrvTableCell size={size} compact alternate={alternate}>
                  <CrvCheckboxBase
                    checked={selected.includes(row.id)}
                    onChange={() => toggle(row.id)}
                  />
                </CrvTableCell>
                <CrvTableCell size={size} alternate={alternate}>
                  <CrvAvatar size="small" content="text" initials={row.name.slice(0, 2)} />
                  <CrvTableTextCell main={row.name} description={row.email} />
                </CrvTableCell>
                <CrvTableCell size={size} alternate={alternate}>
                  {row.role}
                </CrvTableCell>
                <CrvTableCell size={size} alternate={alternate}>
                  <CrvTag color={STATUS_COLOR[row.status]} label={row.statusLabel} />
                </CrvTableCell>
                <CrvTableCell size={size} alternate={alternate}>
                  <Box sx={{ width: 120 }}>
                    <CrvLinearProgress
                      variant="determinate"
                      color={row.status === 'error' ? 'error' : 'primary'}
                      value={row.progress}
                    />
                  </Box>
                </CrvTableCell>
                <CrvTableCell size={size} compact alternate={alternate}>
                  <CrvButtonIcon variant="ghost" color="primary" size="small" aria-label="More actions">
                    <MoreHorizIcon fontSize="small" />
                  </CrvButtonIcon>
                </CrvTableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </Box>
  );
}

export const Playground: Story = {
  render: () => <RichTable size="default" />,
};

export const SmallSize: Story = {
  render: () => <RichTable size="small" />,
};

/** States — default, hover, disabled, alternate (zebra) on the body cell. */
export const CellStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={getTableContainerSx()}>
      <Table>
        <TableHead>
          <TableRow sx={getTableRowSx()}>
            <CrvTableHead size="default" label="State" />
            <CrvTableHead size="default" label="Example content" />
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow sx={getTableRowSx()}>
            <CrvTableCell size="default">default</CrvTableCell>
            <CrvTableCell size="default">
              <CrvTableTextCell main="Row text" description="Secondary description" />
            </CrvTableCell>
          </TableRow>
          <TableRow sx={getTableRowSx()}>
            <CrvTableCell size="default" state="hover">hover</CrvTableCell>
            <CrvTableCell size="default" state="hover">
              <CrvTag color="success" label="Active" />
            </CrvTableCell>
          </TableRow>
          <TableRow sx={getTableRowSx()}>
            <CrvTableCell size="default" state="disabled">disabled</CrvTableCell>
            <CrvTableCell size="default" state="disabled">Unavailable</CrvTableCell>
          </TableRow>
          <TableRow sx={getTableRowSx()}>
            <CrvTableCell size="default" alternate>alternate</CrvTableCell>
            <CrvTableCell size="default" alternate>
              <CrvTableTextCell main="Zebra row" description="alternate=true" />
            </CrvTableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  ),
};
