'use client';

import { forwardRef } from 'react';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { colors, spacing } from '../../tokens';
import { CrvBreadcrumbBase } from '../CrvBreadcrumbBase';
import {
  BREADCRUMB_SEPARATOR_SIZE,
} from '../CrvBreadcrumbBase/crvBreadcrumbStyles';
import type { CrvBreadcrumbDemoProps, CrvBreadcrumbProps } from './CrvBreadcrumb.types';

const separator = (
  <ChevronRightIcon
    sx={{
      fontSize: BREADCRUMB_SEPARATOR_SIZE,
      color:    colors.content.secondary,
    }}
  />
);

// Ground truth from Figma (crv-breadcrumb-standard, node 3875:5038)
export const CrvBreadcrumb = forwardRef<HTMLElement, CrvBreadcrumbProps>(
  function CrvBreadcrumb({ children, sx, ...rest }, ref) {
    return (
      <Breadcrumbs
        ref={ref}
        separator={separator}
        sx={{
          '& .MuiBreadcrumbs-ol': {
            flexWrap: 'wrap',
            gap:      `${spacing.sm}px ${spacing.md}px`,
          },
          '& .MuiBreadcrumbs-li': {
            display:    'inline-flex',
            alignItems: 'center',
          },
          '& .MuiBreadcrumbs-separator': {
            mx: 0,
          },
          ...sx,
        }}
        {...rest}
      >
        {children}
      </Breadcrumbs>
    );
  },
);

/** Figma demo composition with breadcrumb-01…05 visibility toggles */
export function CrvBreadcrumbDemo({
  breadcrumb01 = true,
  breadcrumb02 = true,
  breadcrumb03 = true,
  breadcrumb04 = true,
  breadcrumb05 = true,
}: CrvBreadcrumbDemoProps) {
  return (
    <CrvBreadcrumb>
      <CrvBreadcrumbBase text="Home" href="#" />
      {breadcrumb01 && <CrvBreadcrumbBase type="ellipsis" />}
      {breadcrumb02 && <CrvBreadcrumbBase text="breadcrumb" href="#" />}
      {breadcrumb03 && <CrvBreadcrumbBase text="breadcrumb" href="#" />}
      {breadcrumb04 && <CrvBreadcrumbBase text="breadcrumb" href="#" />}
      {breadcrumb05 && <CrvBreadcrumbBase text="breadcrumb" href="#" />}
      <CrvBreadcrumbBase text="breadcrumb" type="active" />
    </CrvBreadcrumb>
  );
}
