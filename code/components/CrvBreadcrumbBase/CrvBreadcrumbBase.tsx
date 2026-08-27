'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { spacing } from '../../tokens';
import {
  activeColorSx,
  breadcrumbLabelSx,
  BREADCRUMB_DROPDOWN_ICON_SIZE,
  BREADCRUMB_ITEM_HEIGHT,
  ellipsisButtonSx,
  linkColorSx,
} from './crvBreadcrumbStyles';
import type { CrvBreadcrumbBaseProps } from './CrvBreadcrumbBase.types';

export const CrvBreadcrumbBase = forwardRef<HTMLElement, CrvBreadcrumbBaseProps>(
  function CrvBreadcrumbBase(
    {
      text = 'breadcrumb',
      type = 'default',
      href,
      onClick,
      dropdownIcon,
      ellipsisLabel = 'Show more breadcrumb items',
      className,
    },
    ref,
  ) {
    if (type === 'ellipsis') {
      return (
        <Box
          component="button"
          ref={ref as React.Ref<HTMLButtonElement>}
          type="button"
          className={className}
          aria-label={ellipsisLabel}
          onClick={onClick}
          sx={ellipsisButtonSx}
        >
          <MoreHorizIcon sx={{ fontSize: BREADCRUMB_DROPDOWN_ICON_SIZE }} />
        </Box>
      );
    }

    if (type === 'active') {
      return (
        <Typography
          ref={ref as React.Ref<HTMLSpanElement>}
          component="span"
          className={className}
          aria-current="page"
          sx={{
            ...breadcrumbLabelSx,
            ...activeColorSx,
            minHeight: BREADCRUMB_ITEM_HEIGHT,
            display:   'inline-flex',
            alignItems: 'center',
          }}
        >
          {text}
        </Typography>
      );
    }

    const resolvedDropdownIcon = dropdownIcon ?? (
      <KeyboardArrowDownIcon
        sx={{
          fontSize: BREADCRUMB_DROPDOWN_ICON_SIZE,
          color:    'inherit',
        }}
      />
    );

    return (
      <Link
        ref={ref as React.Ref<HTMLAnchorElement>}
        href={href}
        underline="none"
        onClick={onClick}
        className={className}
        sx={{
          ...breadcrumbLabelSx,
          ...linkColorSx,
          display:    'inline-flex',
          alignItems: 'center',
          gap:        type === 'dropdown' ? `${spacing.xs}px` : 0,
          minHeight:  BREADCRUMB_ITEM_HEIGHT,
        }}
      >
        {text}
        {type === 'dropdown' && resolvedDropdownIcon}
      </Link>
    );
  },
);
