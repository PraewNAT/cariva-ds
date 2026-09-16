import type { AlertProps as MuiAlertProps } from '@mui/material/Alert';
import type { ReactNode } from 'react';

/** Figma `Variant` axis on `crv-toast-standard`. */
export type CrvToastVariant = 'filled' | 'outlined' | 'standard';

/** Figma `Severity` axis on `crv-toast-standard`. */
export type CrvToastSeverity =
  | 'error'
  | 'warning'
  | 'info'
  | 'success'
  | 'notification';

/**
 * @deprecated Figma replaced `variant=primary|secondary` with
 * `Variant=Filled|Outlined|Standard` (2026-09-16). `primary` still maps to
 * `filled` and `secondary` to `standard`.
 */
export type CrvToastLegacyVariant = 'primary' | 'secondary';

export interface CrvToastProps
  extends Omit<
    MuiAlertProps,
    'color' | 'severity' | 'variant' | 'action' | 'onClose' | 'title' | 'children'
  > {
  /** Figma `Variant`. */
  variant?: CrvToastVariant | CrvToastLegacyVariant;
  /** Figma `Severity`. */
  severity?: CrvToastSeverity;
  /** Figma `{Title}` / `Title?` — the headline line. */
  title?: ReactNode;
  /** Figma `{Description}` / `Description?` — the supporting line below the title. */
  description?: ReactNode;
  /**
   * Figma `Action?` + the `↳Instance` swap slot. Pass a `CrvButton`
   * (`variant="text"`, `size="small"`); anything else is rendered as-is.
   */
  action?: ReactNode;
  /** Figma `On Close?` — renders the close button when provided. */
  onClose?: (event: React.SyntheticEvent) => void;
  /** Accessible name for the close button. */
  closeLabel?: string;
  /** Override the severity icon. */
  icon?: ReactNode;
  /** Shorthand for `title` — kept so `<CrvToast>text</CrvToast>` still works. */
  children?: ReactNode;
  /**
   * @deprecated Renders the close button without an `onClose` handler.
   * Prefer passing `onClose`.
   */
  showAction?: boolean;
  /**
   * @deprecated Use `icon` for the severity icon; the close icon is fixed so
   * every toast dismisses the same way.
   */
  actionIcon?: ReactNode;
}
