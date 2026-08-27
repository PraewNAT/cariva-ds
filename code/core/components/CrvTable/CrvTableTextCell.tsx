'use client';

import Box from '@mui/material/Box';
import { getTableTextCellSx } from './crvTableStyles';
import type { CrvTableTextCellProps } from './CrvTable.types';

// Ground truth: Figma crv-tableText-cell 4705:20105
export function CrvTableTextCell({ main, description }: CrvTableTextCellProps) {
  return (
    <Box sx={getTableTextCellSx()}>
      {main != null ? <span className="crv-table-text__main">{main}</span> : null}
      {description != null ? (
        <span className="crv-table-text__description">{description}</span>
      ) : null}
    </Box>
  );
}
