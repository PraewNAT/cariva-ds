import type { SxProps, Theme } from '@mui/material/styles';
import type { HTMLAttributes, ReactNode } from 'react';

export type CrvCardOrientation = 'vertical' | 'horizontal' | 'small';

/** Image placement for `orientation="horizontal"`. Maps to Figma `type`. */
export type CrvCardImagePosition = 'left' | 'right' | 'absolute';

export interface CrvCardProps extends Omit<HTMLAttributes<HTMLDivElement>, 'title'> {
  /**
   * Layout — maps to the three Figma card components:
   * `vertical` (crv-card-vertical), `horizontal` (crv-card-horizontal),
   * `small` (crv-card-small-horizontal).
   */
  orientation?: CrvCardOrientation;
  /** Image side for horizontal cards — Figma `type=default-left|default-right|imgAbsolute`. */
  imagePosition?: CrvCardImagePosition;
  /** Media content (e.g. `<img>`). Falls back to a neutral placeholder when omitted. */
  image?: ReactNode;
  /** Show/hide the image area — Figma `showImg` / `ShowImg`. */
  showImage?: boolean;
  /** Tag/badge content (label) — Figma `crv-tag-standard`. */
  tag?: ReactNode;
  /** Show/hide the tag — Figma `showTag`. */
  showTag?: boolean;
  /** Secondary line above the header (e.g. "Update 12 มิ.ย.67"). Horizontal only — Figma `showTopMessage`. */
  topMessage?: ReactNode;
  /** Show/hide the top message — Figma `showTopMessage`. */
  showTopMessage?: boolean;
  /** Title text. */
  header?: ReactNode;
  /** Body text — Figma `showDescription`. */
  description?: ReactNode;
  /** Show/hide the description — Figma `showDescription`. */
  showDescription?: boolean;
  /** Action area (use `CrvButton`). Vertical supports 1–2 buttons; horizontal a single CTA. Figma `showButton`. */
  actions?: ReactNode;
  /** Trailing slot for `orientation="small"` — Figma `rightSlot` (40×40), e.g. an icon/chevron. */
  trailing?: ReactNode;
  /** Show/hide the trailing slot (small only). */
  showTrailing?: boolean;
  sx?: SxProps<Theme>;
}
