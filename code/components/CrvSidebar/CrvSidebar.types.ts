import type { HTMLAttributes, ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export interface CrvSidebarSubItem {
  label: ReactNode;
  icon?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface CrvSidebarMenuProps {
  /** Parent item label. */
  label: ReactNode;
  /** Parent item leading icon. */
  icon?: ReactNode;
  /** Sub navigation items — shown when expanded. */
  items?: CrvSidebarSubItem[];
  /** Controlled expanded state — Figma `open`. */
  open?: boolean;
  /** Uncontrolled initial expanded state. */
  defaultOpen?: boolean;
  /** Called when the parent row is toggled. */
  onToggle?: (open: boolean) => void;
  /** Mark the parent row itself as selected. */
  selected?: boolean;
  disabled?: boolean;
  sx?: SxProps<Theme>;
}

export interface CrvSidebarSection {
  /** Optional section header label. */
  header?: ReactNode;
  /** Section content (menus / items). */
  children?: ReactNode;
}

export interface CrvSidebarProps extends Omit<HTMLAttributes<HTMLDivElement>, 'content'> {
  /** Logo area content — Figma `Logo` slot. */
  logo?: ReactNode;
  /** Main navigation content — Figma `contentSlot`. */
  children?: ReactNode;
  sx?: SxProps<Theme>;
}
