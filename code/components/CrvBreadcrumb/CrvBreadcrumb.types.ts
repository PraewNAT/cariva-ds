import type { BreadcrumbsProps } from '@mui/material/Breadcrumbs';
import type { ReactNode } from 'react';

export interface CrvBreadcrumbProps extends Omit<BreadcrumbsProps, 'children'> {
  children: ReactNode;
}

/** Figma boolean toggles on crv-breadcrumb-standard (3875:5038) */
export interface CrvBreadcrumbDemoProps {
  breadcrumb01?: boolean;
  breadcrumb02?: boolean;
  breadcrumb03?: boolean;
  breadcrumb04?: boolean;
  breadcrumb05?: boolean;
}
