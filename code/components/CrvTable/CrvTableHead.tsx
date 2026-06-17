'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { getTableHeadSx } from './crvTableStyles';
import type { CrvTableHeadProps } from './CrvTable.types';

// Ground truth: Figma crv-table-head 4582:11202
export const CrvTableHead = forwardRef<HTMLTableCellElement, CrvTableHeadProps>(
  function CrvTableHead(
    {
      size = 'small',
      compact = false,
      label,
      checkbox,
      leftSort = false,
      rightSort = false,
      onSort,
      sx,
      ...rest
    },
    ref,
  ) {
    const sortIcon = (
      <ArrowDownwardIcon
        className="crv-table-head__sort"
        role={onSort ? 'button' : undefined}
        aria-hidden={onSort ? false : undefined}
        tabIndex={onSort ? 0 : undefined}
        onClick={onSort}
        sx={onSort ? { cursor: 'pointer' } : undefined}
      />
    );

    return (
      <TableCell
        ref={ref}
        component="th"
        scope="col"
        sx={[
          getTableHeadSx(size, compact),
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      >
        <Box className="crv-table-head__inner">
          {checkbox}
          {leftSort ? sortIcon : null}
          {!compact && label != null ? (
            <span className="crv-table-head__label">{label}</span>
          ) : null}
          {rightSort ? sortIcon : null}
        </Box>
      </TableCell>
    );
  },
);
