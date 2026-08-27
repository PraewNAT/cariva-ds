import type { RatingProps } from '@mui/material/Rating';

export type CrvRatingSize = 'small' | 'medium' | 'large';

export interface CrvRatingProps extends Omit<RatingProps, 'size'> {
  /** Maps to Figma `Size` variant (Small / Medium* / Large). */
  size?: CrvRatingSize;
  /**
   * Read-only display — maps to Figma `Disabled=True`.
   * All stars use `color/border/default` — same gray as inactive interactive stars.
   */
  readOnly?: boolean;
}
