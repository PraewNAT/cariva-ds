'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Typography from '@mui/material/Typography';
import SearchIcon from '@mui/icons-material/Search';
import { CrvInput } from '../CrvInput';
import type { SxProps, Theme } from '@mui/material/styles';
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
    const backdropSlotProps = slotProps?.backdrop as
      | ({ sx?: SxProps<Theme> } & Record<string, unknown>)
      | undefined;
    const paperSlotProps = slotProps?.paper as
      | ({ sx?: SxProps<Theme> } & Record<string, unknown>)
      | undefined;

    return (
      <Drawer
        ref={ref}
        anchor="bottom"
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
              getBottomSheetPaperSx(),
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
