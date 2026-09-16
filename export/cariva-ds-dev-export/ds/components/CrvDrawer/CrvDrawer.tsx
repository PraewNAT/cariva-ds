'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import type { SxProps, Theme } from '@mui/material/styles';
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
  const backdropSlotProps = slotProps?.backdrop as
    | ({ sx?: SxProps<Theme> } & Record<string, unknown>)
    | undefined;
  const paperSlotProps = slotProps?.paper as
    | ({ sx?: SxProps<Theme> } & Record<string, unknown>)
    | undefined;

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
          ...backdropSlotProps,
          sx: [
            getOverlayBackdropSx(),
            ...(Array.isArray(backdropSlotProps?.sx)
              ? backdropSlotProps.sx
              : backdropSlotProps?.sx
                ? [backdropSlotProps.sx]
                : []),
          ],
        },
        paper: {
          ...paperSlotProps,
          sx: [
            getDrawerPaperSx(anchor),
            ...(Array.isArray(paperSx) ? paperSx : paperSx ? [paperSx] : []),
            ...(Array.isArray(paperSlotProps?.sx)
              ? paperSlotProps.sx
              : paperSlotProps?.sx
                ? [paperSlotProps.sx]
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
