'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { CrvInput } from '../CrvInput';
import { getOverlayBackdropSx } from '../../crvOverlayStyles';
import {
  getBottomSheetPaperSx,
  getContentSlotSx,
  getFooterSx,
  getHeaderActionsSx,
  getHeaderGradientLeftSx,
  getHeaderGradientRightSx,
  getHeaderRowSx,
  getHeaderSectionSx,
  getSearchSlotSx,
  getTitleSx,
} from './crvBottomSheetStyles';
import type { CrvBottomSheetProps } from './CrvBottomSheet.types';

// Ground truth: Figma crv-bottom-sheet-header 4485:31705 + crv-bottom-sheet-content 4485:31742
export const CrvBottomSheet = forwardRef<HTMLDivElement, CrvBottomSheetProps>(
  function CrvBottomSheet(
    {
      variant = 'default',
      title,
      showHeaderGradient = true,
      headerActions,
      searchValue,
      onSearchChange,
      searchPlaceholder = 'Search',
      actions,
      children,
      open,
      onClose,
      paperSx,
      slotProps,
      ...rest
    },
    ref,
  ) {
    const showHeader = Boolean(title || headerActions || showHeaderGradient || variant === 'search');

    return (
      <Drawer
        ref={ref}
        anchor="bottom"
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
              getBottomSheetPaperSx(),
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
        {showHeader ? (
          <Box sx={getHeaderSectionSx()}>
            {showHeaderGradient ? (
              <>
                <Box aria-hidden sx={getHeaderGradientLeftSx(variant)} />
                <Box aria-hidden sx={getHeaderGradientRightSx(variant)} />
              </>
            ) : null}
            <Box sx={getHeaderRowSx()}>
              {title ? (
                <Typography component="h2" sx={getTitleSx()}>
                  {title}
                </Typography>
              ) : (
                <span />
              )}
              {headerActions ? <Box sx={getHeaderActionsSx()}>{headerActions}</Box> : null}
            </Box>
            {variant === 'search' ? (
              <Box sx={getSearchSlotSx()}>
                <CrvInput
                  size="medium"
                  placeholder={searchPlaceholder}
                  value={searchValue}
                  onChange={(e) => onSearchChange?.(e.target.value)}
                  startAdornment={<SearchIcon fontSize="small" />}
                  fullWidth
                />
              </Box>
            ) : null}
          </Box>
        ) : null}

        {children ? <Box sx={getContentSlotSx()}>{children}</Box> : null}

        {actions ? <Box sx={getFooterSx()}>{actions}</Box> : null}
      </Drawer>
    );
  },
);
