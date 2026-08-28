import type { ReactElement, ReactNode, SyntheticEvent } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export type CrvTabValue = string | number;

export interface CrvTabItem {
  /** Unique value identifying the tab. */
  value: CrvTabValue;
  /** Tab label text — string or element only (matches MUI Tab's `label` prop). */
  label?: string | ReactElement;
  /** Leading icon — element only (matches MUI Tab's `icon` prop). */
  icon?: ReactElement;
  /** Show notification dot — Figma `Show badge` (standard tabs). */
  showBadge?: boolean;
  /** Trailing tag / count node — Figma `showTag` (folder tabs). */
  tag?: ReactNode;
  disabled?: boolean;
}

export interface CrvTabsBaseProps {
  /** Tab definitions. */
  items: CrvTabItem[];
  /** Selected tab value (controlled). */
  value: CrvTabValue;
  /** Called with the new value when a tab is selected. */
  onChange?: (value: CrvTabValue, event: SyntheticEvent) => void;
  sx?: SxProps<Theme>;
}

export type CrvTabsStandardProps = CrvTabsBaseProps;

export interface CrvTabsPillsProps extends CrvTabsBaseProps {
  /** Figma `variant` — `standard` hugs, `fullWidth` stretches tabs equally. */
  variant?: 'standard' | 'fullWidth';
  /** Figma `tabVariant` — controls tab height / padding. */
  tabVariant?: 'default' | 'line';
}

export type CrvTabsFolderProps = CrvTabsBaseProps;
