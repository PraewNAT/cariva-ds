'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import {
  getSidebarContentSx,
  getSidebarLogoSx,
  getSidebarRootSx,
} from './crvSidebarStyles';
import type { CrvSidebarProps } from './CrvSidebar.types';

// Ground truth: Figma crv-sidebar 4724:103532 (Sidebar section 4724:99204)
export const CrvSidebar = forwardRef<HTMLDivElement, CrvSidebarProps>(function CrvSidebar(
  { logo, children, sx, ...rest },
  ref,
) {
  return (
    <Box
      ref={ref}
      component="nav"
      sx={[getSidebarRootSx(), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
      {...rest}
    >
      {logo != null ? <Box sx={getSidebarLogoSx()}>{logo}</Box> : null}
      <Box sx={getSidebarContentSx()}>{children}</Box>
    </Box>
  );
});
