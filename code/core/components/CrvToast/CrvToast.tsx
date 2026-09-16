'use client';

import { forwardRef } from 'react';
import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CheckCircleRoundedIcon from '@mui/icons-material/CheckCircleRounded';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import ErrorRoundedIcon from '@mui/icons-material/ErrorRounded';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import InfoRoundedIcon from '@mui/icons-material/InfoRounded';
import ReportProblemOutlinedIcon from '@mui/icons-material/ReportProblemOutlined';
import WarningRoundedIcon from '@mui/icons-material/WarningRounded';
import { CrvButtonIcon } from '../CrvButtonIcon';
import {
  getToastCloseSx,
  getToastDescriptionSx,
  getToastSx,
  getToastTitleSx,
  resolveVariant,
  toMuiSeverity,
} from './crvToastStyles';
import type {
  CrvToastProps,
  CrvToastSeverity,
  CrvToastVariant,
} from './CrvToast.types';

/**
 * Same glyphs as Figma: Filled/Outlined use the outline icons, Standard uses
 * the solid rounded ones.
 */
const severityIcons: Record<
  'outline' | 'solid',
  Record<CrvToastSeverity, typeof ErrorOutlineIcon>
> = {
  outline: {
    error: ErrorOutlineIcon,
    warning: ReportProblemOutlinedIcon,
    info: InfoOutlinedIcon,
    success: CheckCircleOutlineIcon,
    notification: InfoOutlinedIcon,
  },
  solid: {
    error: ErrorRoundedIcon,
    warning: WarningRoundedIcon,
    info: InfoRoundedIcon,
    success: CheckCircleRoundedIcon,
    notification: InfoRoundedIcon,
  },
};

function getSeverityIcon(variant: CrvToastVariant, severity: CrvToastSeverity) {
  return severityIcons[variant === 'standard' ? 'solid' : 'outline'][severity];
}

export const CrvToast = forwardRef<HTMLDivElement, CrvToastProps>(
  function CrvToast(
    {
      variant = 'standard',
      severity = 'error',
      title,
      description,
      action,
      onClose,
      closeLabel = 'Dismiss',
      icon,
      children,
      showAction,
      actionIcon,
      sx,
      ...rest
    },
    ref,
  ) {
    const resolvedVariant = resolveVariant(variant);
    const heading = title ?? children;
    // `showAction` is the old prop name for "render the close button".
    const showClose = showAction ?? Boolean(onClose);
    const SeverityIcon = getSeverityIcon(resolvedVariant, severity);

    const actions =
      action || showClose ? (
        <>
          {action}
          {showClose ? (
            <CrvButtonIcon
              variant="ghost"
              size="small"
              aria-label={closeLabel}
              onClick={onClose}
              sx={getToastCloseSx(resolvedVariant, severity)}
            >
              <CloseRoundedIcon />
            </CrvButtonIcon>
          ) : null}
        </>
      ) : undefined;

    return (
      <Alert
        ref={ref}
        severity={toMuiSeverity(severity)}
        variant="standard"
        icon={icon ?? (actionIcon as typeof icon) ?? <SeverityIcon />}
        action={actions}
        sx={[
          getToastSx(resolvedVariant, severity),
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      >
        {heading ? (
          <Box component="span" sx={getToastTitleSx(resolvedVariant, severity)}>
            {heading}
          </Box>
        ) : null}
        {description ? (
          <Box
            component="span"
            sx={getToastDescriptionSx(resolvedVariant, severity)}
          >
            {description}
          </Box>
        ) : null}
      </Alert>
    );
  },
);
