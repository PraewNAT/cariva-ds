'use client';

import { forwardRef } from 'react';
import Dialog from '@mui/material/Dialog';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import PanoramaFishEyeOutlinedIcon from '@mui/icons-material/PanoramaFishEyeOutlined';
import { getOverlayBackdropSx } from '../../crvOverlayStyles';
import {
  getModalContainerSx,
  getModalContentSlotSx,
  getModalCtaSlotSx,
  getModalDescriptionSx,
  getModalFooterSx,
  getModalHeaderSectionSx,
  getModalHeaderSx,
  getModalIconContainerSx,
  getModalPaperSx,
  getModalTextContainerSx,
  getModalTitleSx,
} from './crvModalStyles';
import type { CrvModalProps } from './CrvModal.types';

export const CrvModal = forwardRef<HTMLDivElement, CrvModalProps>(
  function CrvModal(
    {
      type = 'default',
      breakpoint = 'sm',
      title = 'Header',
      description = 'Description',
      showContent = true,
      showDescription = true,
      showIcon = true,
      showCTA = true,
      icon = <PanoramaFishEyeOutlinedIcon />,
      iconContainerSx,
      actions,
      children,
      open,
      onClose,
      slotProps,
      sx,
      ...rest
    },
    ref,
  ) {
    const showHeader = showIcon || title || (showDescription && description);

    return (
      <Dialog
        ref={ref}
        open={open}
        onClose={onClose}
        maxWidth={false}
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
              getModalPaperSx(breakpoint),
              ...(Array.isArray(slotProps?.paper?.sx)
                ? slotProps.paper.sx
                : slotProps?.paper?.sx
                  ? [slotProps.paper.sx]
                  : []),
              ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
            ],
          },
        }}
        {...rest}
      >
        <Box sx={getModalContainerSx()}>
          {showHeader ? (
            <Box sx={getModalHeaderSectionSx(type, breakpoint)}>
              <Box sx={getModalHeaderSx(type)}>
                {showIcon ? (
                  <Box sx={getModalIconContainerSx(iconContainerSx)}>
                    {icon}
                  </Box>
                ) : null}
                {(title || (showDescription && description)) ? (
                  <Box sx={getModalTextContainerSx(type)}>
                    {title ? (
                      <Typography component="h2" sx={getModalTitleSx(type)}>
                        {title}
                      </Typography>
                    ) : null}
                    {showDescription && description ? (
                      <Typography component="p" sx={getModalDescriptionSx(type)}>
                        {description}
                      </Typography>
                    ) : null}
                  </Box>
                ) : null}
              </Box>
            </Box>
          ) : null}

          {showContent && children ? (
            <Box sx={getModalContentSlotSx()}>{children}</Box>
          ) : null}

          {showCTA && actions ? (
            <Box sx={getModalFooterSx()}>
              <Box sx={getModalCtaSlotSx(breakpoint)}>{actions}</Box>
            </Box>
          ) : null}
        </Box>
      </Dialog>
    );
  },
);
