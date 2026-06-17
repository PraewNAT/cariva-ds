import type { SxProps, Theme } from '@mui/material/styles';
import { colors } from '../../tokens';
import type { CrvRatingSize } from './CrvRating.types';

/** Figma `<Rating>` star sizes — node 4887:7022 */
export const RATING_ICON_SIZE: Record<CrvRatingSize, number> = {
  small:  18,
  medium: 24,
  large:  30,
};

/** Figma variable bindings from `<Rating>` set (4887:7022) */
export const RATING_ACTIVE_COLOR = colors.accent.amber.A03; // VariableID:4016:80 → #f59e0b
export const RATING_INACTIVE_COLOR = colors.border.default; // VariableID:3714:47 → #cbd5e1
/** Figma `Disabled=True` — same neutral gray as inactive interactive stars (3714:47) */
export const RATING_READ_ONLY_COLOR = colors.border.default;

function iconSx(size: CrvRatingSize) {
  return {
    margin: 0,
    fontSize: RATING_ICON_SIZE[size],
  };
}

function starColorSx(color: string) {
  return {
    color,
    '& .MuiSvgIcon-root': {
      color,
    },
  };
}

export function getRatingSx(
  size: CrvRatingSize,
  readOnly: boolean,
): SxProps<Theme> {
  if (readOnly) {
    return {
      gap: 0,
      opacity: 1,
      ...starColorSx(RATING_READ_ONLY_COLOR),
      '& .MuiRating-icon': iconSx(size),
      '& .MuiRating-iconFilled, & .MuiRating-iconEmpty, & .MuiRating-iconHover': {
        ...starColorSx(RATING_READ_ONLY_COLOR),
      },
    };
  }

  return {
    gap: 0,
    opacity: 1,
    ...starColorSx(RATING_INACTIVE_COLOR),
    '& .MuiRating-icon': iconSx(size),
    '& .MuiRating-iconFilled, & .MuiRating-iconHover': {
      ...starColorSx(RATING_ACTIVE_COLOR),
    },
    '& .MuiRating-iconEmpty': {
      ...starColorSx(RATING_INACTIVE_COLOR),
    },
    '&.Mui-disabled': {
      opacity: 1,
      ...starColorSx(RATING_READ_ONLY_COLOR),
      '& .MuiRating-iconFilled, & .MuiRating-iconEmpty': {
        ...starColorSx(RATING_READ_ONLY_COLOR),
      },
    },
  };
}
