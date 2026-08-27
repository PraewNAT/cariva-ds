'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import Popover from '@mui/material/Popover';
import { CrvButton } from '../CrvButton';
import {
  getPopoverAnchorOrigin,
  getStandardArrowSx,
  getStandardTooltipSx,
  getStepPillSx,
  getWithActionBodySx,
  getWithActionContentSx,
  getWithActionFooterSx,
  getWithActionPaperSx,
  mapStandardPlacement,
} from './crvTooltipStyles';
import type {
  CrvTooltipProps,
  CrvTooltipWithActionPanelProps,
  CrvTooltipWithActionProps,
} from './CrvTooltip.types';

export const CrvTooltip = forwardRef<HTMLDivElement, CrvTooltipProps>(
  function CrvTooltip(
    {
      placement = 'bottom',
      title,
      children,
      slotProps,
      ...rest
    },
    ref,
  ) {
    const showArrow = placement !== 'none';

    return (
      <Tooltip
        ref={ref}
        title={title}
        placement={mapStandardPlacement(placement)}
        arrow={showArrow}
        slotProps={{
          ...slotProps,
          tooltip: {
            ...slotProps?.tooltip,
            sx: [
              getStandardTooltipSx(),
              ...(Array.isArray(slotProps?.tooltip?.sx)
                ? slotProps.tooltip.sx
                : slotProps?.tooltip?.sx
                  ? [slotProps.tooltip.sx]
                  : []),
            ],
          },
          arrow: {
            ...slotProps?.arrow,
            sx: [
              getStandardArrowSx(),
              ...(Array.isArray(slotProps?.arrow?.sx)
                ? slotProps.arrow.sx
                : slotProps?.arrow?.sx
                  ? [slotProps.arrow.sx]
                  : []),
            ],
          },
        }}
        {...rest}
      >
        {children}
      </Tooltip>
    );
  },
);

export function CrvTooltipWithActionPanel({
  step = '1/7',
  content = 'Welcome to the app guide. You may skip for now and return here later.',
  backLabel = 'Back',
  nextLabel = 'Next',
  showBack = true,
  onBack,
  onNext,
}: CrvTooltipWithActionPanelProps) {
  return (
    <Box sx={getWithActionPaperSx()}>
      <Box sx={getWithActionBodySx()}>
        {step ? <Box sx={getStepPillSx()}>{step}</Box> : null}
        <Typography component="p" sx={getWithActionContentSx()}>
          {content}
        </Typography>
      </Box>
      <Box
        sx={{
          ...getWithActionFooterSx(),
          justifyContent: showBack ? 'space-between' : 'flex-end',
        }}
      >
        {showBack ? (
          <CrvButton
            variant="text"
            color="primary"
            size="small"
            startIcon={<ArrowBackIcon />}
            onClick={onBack}
          >
            {backLabel}
          </CrvButton>
        ) : null}
        <CrvButton
          variant="contained"
          color="primary"
          size="small"
          endIcon={<ArrowForwardIcon />}
          onClick={onNext}
        >
          {nextLabel}
        </CrvButton>
      </Box>
    </Box>
  );
}

export const CrvTooltipWithAction = forwardRef<HTMLDivElement, CrvTooltipWithActionProps>(
  function CrvTooltipWithAction(
    {
      placement = 'bottom-start',
      step,
      content,
      backLabel,
      nextLabel,
      showBack,
      onBack,
      onNext,
      open,
      anchorEl,
      children,
      slotProps,
      ...rest
    },
    ref,
  ) {
    const origins = getPopoverAnchorOrigin(placement);

    return (
      <>
        {children}
        <Popover
          ref={ref}
          open={open}
          anchorEl={anchorEl}
          anchorOrigin={origins.anchorOrigin}
          transformOrigin={origins.transformOrigin}
          slotProps={{
            ...slotProps,
            paper: {
              ...slotProps?.paper,
              elevation: 0,
              sx: [
                { backgroundColor: 'transparent', overflow: 'visible' },
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
          <CrvTooltipWithActionPanel
            step={step}
            content={content}
            backLabel={backLabel}
            nextLabel={nextLabel}
            showBack={showBack}
            onBack={onBack}
            onNext={onNext}
          />
        </Popover>
      </>
    );
  },
);
