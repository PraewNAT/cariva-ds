import type { ReactNode } from 'react';

export type CrvBreadcrumbBaseType =
  | 'default'
  | 'dropdown'
  | 'ellipsis'
  | 'active';

export interface CrvBreadcrumbBaseProps {
  /** Figma `text` */
  text?: string;
  /** Figma `type` — hover is handled via CSS on link items */
  type?: CrvBreadcrumbBaseType;
  /** Link destination for default/dropdown items */
  href?: string;
  onClick?: React.MouseEventHandler<HTMLElement>;
  /** Custom icon for dropdown trigger */
  dropdownIcon?: ReactNode;
  /** Accessible label for ellipsis button */
  ellipsisLabel?: string;
  className?: string;
}
