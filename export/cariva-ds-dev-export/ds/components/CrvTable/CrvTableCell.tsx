'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import TableCell from '@mui/material/TableCell';
import { getTableCellSx } from './crvTableStyles';
import type { CrvTableCellProps } from './CrvTable.types';

// Ground truth: Figma crv-table-cell 4582:11271
export const CrvTableCell = forwardRef<HTMLTableCellElement, CrvTableCellProps>(
  function CrvTableCell(
    {
      size = 'small',
      state = 'default',
      alternate = false,
      compact = false,
      children,
      sx,
      ...rest
    },
    ref,
  ) {
    return (
      <TableCell
        ref={ref}
        sx={[
          getTableCellSx(size, state, alternate, compact),
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      >
        <Box className="crv-table-cell__inner">{children}</Box>
      </TableCell>
    );
  },
);
