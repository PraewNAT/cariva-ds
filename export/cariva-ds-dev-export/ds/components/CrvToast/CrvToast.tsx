'use client';

import { forwardRef } from 'react';
import Alert from '@mui/material/Alert';
import IconButton from '@mui/material/IconButton';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CloseRoundedIcon from '@mui/icons-material/CloseRounded';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import InfoOutlinedIcon from '@mui/icons-material/InfoOutlined';
import WarningAmberRoundedIcon from '@mui/icons-material/WarningAmberRounded';
import { getCloseButtonSx, getToastSx } from './crvToastStyles';
import type { CrvToastProps, CrvToastSeverity } from './CrvToast.types';

const severityIcons: Record<CrvToastSeverity, typeof ErrorOutlineIcon> = {
  error:   ErrorOutlineIcon,
  info:    InfoOutlinedIcon,
  success: CheckCircleOutlineIcon,
  warning: WarningAmberRoundedIcon,
};

export const CrvToast = forwardRef<HTMLDivElement, CrvToastProps>(
  function CrvToast(
    {
      variant = 'primary',
      severity = 'error',
      showAction = true,
      actionIcon = <CloseRoundedIcon />,
      children,
      onClose,
      sx,
      ...rest
    },
    ref,
  ) {
    const SeverityIcon = severityIcons[severity];

    const action = showAction ? (
      <IconButton
        aria-label="Dismiss toast"
        size="small"
        onClick={onClose}
        sx={getCloseButtonSx(variant, severity)}
      >
        {actionIcon}
      </IconButton>
    ) : undefined;

    return (
      <Alert
        ref={ref}
        severity={severity}
        variant="standard"
        icon={<SeverityIcon />}
        action={action}
        sx={[
          getToastSx(variant, severity),
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
        {...rest}
      >
        {children}
      </Alert>
    );
  },
);
