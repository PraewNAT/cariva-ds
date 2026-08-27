import type { ReactNode, SyntheticEvent } from 'react';
import type { SxProps, Theme } from '@mui/material/styles';

export type CrvTabValue = string | number;

export interface CrvTabItem {
  /** Unique value identifying the tab. */
  value: CrvTabValue;
  /** Tab label text. */
  label?: ReactNode;
  /** Leading icon. */
  icon?: ReactNode;
  /** Show notification dot — Figma `Show badge` (standard tabs). */
  showBadge?: boolean;
  /** Trailing tag / count node — Figma `showTag` (folder tabs). */
  tag?: ReactNode;
  disabled?: boolean;
}

interface CrvTabsBaseProps {
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
