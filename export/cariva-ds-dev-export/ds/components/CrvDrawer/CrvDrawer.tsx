'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import { getOverlayBackdropSx } from '../../crvOverlayStyles';
import {
  getContentSlotSx,
  getDrawerPaperSx,
} from './crvDrawerStyles';
import type { CrvDrawerProps } from './CrvDrawer.types';

// Ground truth: Figma crv-drawer 4497:77989 (Drawer page 4497:77575)
export const CrvDrawer = forwardRef<HTMLDivElement, CrvDrawerProps>(function CrvDrawer(
  {
    anchor = 'left',
    variant = 'temporary',
    open,
    onClose,
    children,
    paperSx,
    slotProps,
    ...rest
  },
  ref,
) {
  return (
    <Drawer
      ref={ref}
      anchor={anchor}
      variant={variant}
      open={open}
      onClose={onClose}
      slotProps={{
        ...slotProps,
        backdrop: {
          ...slotProps?.backdrop,
          sx: [
            getOverlayBackdropSx(),
            ...(Array.isArray(slotProps?.backdrop?.sx)
              ? slotProps.backdrop.sx
              : slotProps?.backdrop?.sx
                ? [slotProps.backdrop.sx]
                : []),
          ],
        },
        paper: {
          ...slotProps?.paper,
          sx: [
            getDrawerPaperSx(anchor),
            ...(Array.isArray(paperSx) ? paperSx : paperSx ? [paperSx] : []),
            ...(Array.isArray(slotProps?.paper?.sx)
              ? slotProps.paper.sx
              : slotProps?.paper?.sx
                ? [slotProps.paper.sx]
                : []),
          ],
        },
      }}
      {...rest}
    >
      {children ? <Box sx={getContentSlotSx()}>{children}</Box> : null}
    </Drawer>
  );
});
