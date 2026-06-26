import type { HTMLAttributes, ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export type CrvSidebarMenuType = 'expand' | 'default';

export interface CrvSidebarSubItem {
  label: ReactNode;
  icon?: ReactNode;
  selected?: boolean;
  disabled?: boolean;
  onClick?: () => void;
}

export interface CrvSidebarMenuProps {
  /** Figma `type` — `expand` (chevron + sub-items) or `default` (direct link). */
  type?: CrvSidebarMenuType;
  /** Parent item label. */
  label: ReactNode;
  /** Parent item leading icon. */
  icon?: ReactNode;
  /** Sub navigation items — shown when `type="expand"` and `active=true`. */
  items?: CrvSidebarSubItem[];
  /**
   * Figma `active` — `true` | `false` for both types.
   * expand: open vs collapsed. default: current route vs inactive.
   */
  active?: boolean;
  /** Uncontrolled initial `active` (expand: starts open when true). */
  defaultActive?: boolean;
  /** @deprecated Use `active` — expand type only. */
  open?: boolean;
  /** @deprecated Use `defaultActive`. */
  defaultOpen?: boolean;
  /** Expand type: called when `active` toggles. */
  onToggle?: (active: boolean) => void;
  /** Default type: navigate on parent row click. */
  onClick?: () => void;
  /** @deprecated Use `active` — default type only. */
  selected?: boolean;
  /**
   * @deprecated Use `type="default"` instead.
   * When false, behaves as `type="default"`.
   */
  rightIconVisible?: boolean;
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
