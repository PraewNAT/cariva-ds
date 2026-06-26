import { useState } from 'react';
import type { Meta, StoryObj } from '@storybook/react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {
  CrvPagination,
  CrvPaginationJumpToPage,
  CrvPaginationRowsPerPage,
} from './CrvPagination';
import type { CrvPaginationSize } from './CrvPagination.types';

const SIZES: CrvPaginationSize[] = ['large', 'medium'];

const meta: Meta<typeof CrvPagination> = {
  title: 'Navigation/CrvPagination',
  component: CrvPagination,
  parameters: {
    docs: {
      description: {
        component:
          'Pagination component mapped from Figma `crv-pagination-standard` (4230:1661). ' +
          'Shows up to five consecutive page numbers in the strip — no ellipsis.',
      },
    },
    controls: {
      include: ['count', 'page', 'size', 'disabled'],
    },
  },
  argTypes: {
    count: { control: { type: 'number', min: 1 } },
    page: { control: { type: 'number', min: 1 } },
    size: { control: 'inline-radio', options: SIZES },
    disabled: { control: 'boolean' },
    defaultPage: { table: { disable: true } },
    onChange: { table: { disable: true } },
    ref: { table: { disable: true } },
  },
  args: {
    count: 10,
    page: 1,
    size: 'large',
    disabled: false,
  },
};

export default meta;
type Story = StoryObj<typeof CrvPagination>;

export const Large: Story = {};

export const Medium: Story = {
  args: { size: 'medium' },
};

export const SelectedMiddle: Story = {
  args: { count: 12, page: 6 },
};

export const ManyPagesNoEllipsis: Story = {
  name: 'Many pages (no ellipsis)',
  args: { count: 12, page: 2, size: 'medium' },
};

export const Disabled: Story = {
  args: { disabled: true },
};

export const Interactive: Story = {
  render: (args) => {
    const [page, setPage] = useState(args.page ?? 1);

    return (
      <CrvPagination
        {...args}
        page={page}
        onChange={(_, nextPage) => setPage(nextPage)}
      />
    );
  },
  args: { count: 12, page: 1 },
};

export const RowsPerPage: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [rows, setRows] = useState(10);
    return (
      <CrvPaginationRowsPerPage
        value={rows}
        onChange={(_, value) => setRows(value)}
      />
    );
  },
};

export const JumpToPage: Story = {
  parameters: { controls: { disable: true } },
  render: () => {
    const [page, setPage] = useState(1);
    return (
      <CrvPaginationJumpToPage
        value={page}
        count={10}
        onChange={(_, value) => setPage(value)}
      />
    );
  },
};

export const AllStates: Story = {
  parameters: { controls: { disable: true } },
  render: () => (
    <Box sx={{ display: 'grid', gap: 3 }}>
      {SIZES.map((size) => (
        <Box key={size} sx={{ display: 'grid', gap: 1 }}>
          <Typography sx={{ fontSize: 12, color: '#64748b' }}>{size}</Typography>
          <CrvPagination count={10} page={1} size={size} />
          <CrvPagination count={12} page={6} size={size} />
          <CrvPagination count={10} page={10} size={size} />
          <CrvPagination count={10} page={1} size={size} disabled />
        </Box>
      ))}
    </Box>
  ),
};
