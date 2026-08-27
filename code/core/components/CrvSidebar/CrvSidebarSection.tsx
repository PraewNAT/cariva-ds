'use client';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { getSidebarHeaderSx, getSidebarSectionSx } from './crvSidebarStyles';
import type { CrvSidebarSection as CrvSidebarSectionProps } from './CrvSidebar.types';

/** Optional grouping with a header label inside the sidebar content slot. */
export function CrvSidebarSection({ header, children }: CrvSidebarSectionProps) {
  return (
    <Box sx={getSidebarSectionSx()}>
      {header != null ? (
        <Typography variant="caption" sx={getSidebarHeaderSx()}>
          {header}
        </Typography>
      ) : null}
      {children}
    </Box>
  );
}
