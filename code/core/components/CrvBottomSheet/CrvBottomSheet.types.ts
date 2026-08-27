import type { DrawerProps } from '@mui/material/Drawer';
import type { ReactNode } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export type CrvBottomSheetVariant = 'default' | 'search';

export interface CrvBottomSheetProps
  extends Omit<DrawerProps, 'anchor' | 'title' | 'variant'> {
  /** Header layout — `default` = title only, `search` = title + search input. Maps to Figma `crv-bottom-sheet-header type`. */
  variant?: CrvBottomSheetVariant;
  /** Title text shown in the header row. */
  title?: ReactNode;
  /** Decorative cyan/teal gradient glow at the top — Figma `showTopColor`. */
  showHeaderGradient?: boolean;
  /** Right-aligned header actions (use `CrvButtonIcon`). */
  headerActions?: ReactNode;
  /** Search field value — used when `variant="search"`. */
  searchValue?: string;
  /** Search field change handler. */
  onSearchChange?: (value: string) => void;
  /** Search field placeholder. */
  searchPlaceholder?: string;
  /** Sticky footer action area (use `CrvButton`). */
  actions?: ReactNode;
  /** Body content — Figma `contentSlot`. */
  children?: ReactNode;
  /** Override styles on the drawer paper (the sheet surface). */
  paperSx?: SxProps<Theme>;
}
