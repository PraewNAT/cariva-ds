import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing, typography } from '../../tokens';
import type { CrvCardImagePosition, CrvCardOrientation } from './CrvCard.types';

/** Figma card radius: horizontal/vertical = 16, small = 12. */
export const CARD_RADIUS: Record<CrvCardOrientation, number> = {
  vertical:   radius['16'],
  horizontal: radius['16'],
  small:      radius['12'],
};

const CARD_BORDER = `1px solid ${colors.border.default}`; // #cbd5e1 (3714:47)

/** Root surface — white, bordered, rounded, clips the image. */
export function getCardRootSx(orientation: CrvCardOrientation): SxProps<Theme> {
  const base = {
    position: 'relative' as const,
    display: 'flex',
    boxSizing: 'border-box' as const,
    backgroundColor: colors.onSurface.default,
    border: CARD_BORDER,
    borderRadius: `${CARD_RADIUS[orientation]}px`,
    overflow: 'hidden',
  };

  // Small card: image sits inside the padding (Figma pad [12,16], gap 16).
  if (orientation === 'small') {
    return {
      ...base,
      flexDirection: 'row',
      alignItems: 'center',
      gap: `${spacing.lg}px`,
      padding: `${spacing.md}px ${spacing.lg}px`,
    };
  }

  return {
    ...base,
    flexDirection: orientation === 'vertical' ? 'column' : 'row',
  };
}

/** Body column (text + actions). Padding differs by orientation. */
export function getCardBodySx(orientation: CrvCardOrientation): SxProps<Theme> {
  const pad =
    orientation === 'small'
      ? `${spacing.md}px ${spacing.lg}px`
      : `${spacing.lg}px`;
  return {
    flex: 1,
    minWidth: 0,
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.lg}px`,
    padding: pad,
  };
}

/** Text group (tag, top message, header, description). */
export function getCardContentSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.sm}px`,
  };
}

/** Tighter group for header + description. */
export function getCardHeadingGroupSx(orientation: CrvCardOrientation): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    gap: orientation === 'small' ? 0 : `${spacing['2xs']}px`,
  };
}

export function getTopMessageSx(): SxProps<Theme> {
  return {
    color: colors.content.secondary,
    fontFamily: typography.fontFamily.sans,
    fontSize: `${typography.fontSize.body.small}px`,
    lineHeight: `${typography.lineHeight.body.small}px`,
    fontWeight: typography.fontWeight.regular,
    margin: 0,
  };
}

export function getHeaderSx(): SxProps<Theme> {
  return {
    color: colors.content.primary,
    fontFamily: typography.fontFamily.sans,
    fontSize: `${typography.fontSize.heading.medium}px`,
    lineHeight: `${typography.lineHeight.heading.medium}px`,
    fontWeight: typography.fontWeight.semibold,
    margin: 0,
  };
}

export function getDescriptionSx(): SxProps<Theme> {
  return {
    color: colors.content.secondary,
    fontFamily: typography.fontFamily.sans,
    fontSize: `${typography.fontSize.body.medium}px`,
    lineHeight: `${typography.lineHeight.body.medium}px`,
    fontWeight: typography.fontWeight.regular,
    margin: 0,
  };
}

/** Trailing slot for small card — Figma rightSlot (40×40, centered). */
export function getTrailingSlotSx(): SxProps<Theme> {
  return {
    flexShrink: 0,
    width: 40,
    height: 40,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: colors.content.secondary,
  };
}

/** Action row — vertical/horizontal CTA area. */
export function getActionsSx(): SxProps<Theme> {
  return {
    display: 'flex',
    gap: `${spacing.sm}px`,
    '& > *': { flex: 1 },
  };
}

/**
 * Image area.
 * - vertical: full-width strip on top (fixed ratio)
 * - horizontal left/right: fills one side
 * - small: compact square thumbnail
 */
export function getImageSx(
  orientation: CrvCardOrientation,
  imagePosition: CrvCardImagePosition,
): SxProps<Theme> {
  const base = {
    position: 'relative' as const,
    flexShrink: 0,
    overflow: 'hidden',
    backgroundColor: colors.onSurface.sunken, // #f1f5f9 placeholder
    '& img': {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover' as const,
    },
  };

  if (orientation === 'vertical') {
    return { ...base, width: '100%', aspectRatio: '16 / 9', borderRadius: `${radius['8']}px` };
  }
  if (orientation === 'small') {
    // Figma leftSlot 80×80, radius 8 (4570:20655).
    return { ...base, width: 80, height: 80, borderRadius: `${radius['8']}px` };
  }
  // horizontal default-left / default-right
  return {
    ...base,
    width: '42%',
    alignSelf: 'stretch',
    order: imagePosition === 'left' ? -1 : 0,
  };
}

/**
 * imgAbsolute root — vertical stack (content + full-width CTA), padding 16, gap 16.
 * Figma 4570:20745 type=imgAbsolute (420×194).
 */
export function getAbsoluteRootSx(): SxProps<Theme> {
  return {
    position: 'relative',
    display: 'flex',
    flexDirection: 'column',
    gap: `${spacing.lg}px`,
    padding: `${spacing.lg}px`,
    boxSizing: 'border-box',
    backgroundColor: colors.onSurface.default,
    border: CARD_BORDER,
    borderRadius: `${CARD_RADIUS.horizontal}px`,
    overflow: 'hidden',
  };
}

/** imgAbsolute image — absolutely pinned to the right, full height (slot 183×193 @ right). */
export function getAbsoluteImageSx(): SxProps<Theme> {
  return {
    position: 'absolute',
    top: 0,
    right: 0,
    bottom: 0,
    width: '44%', // 183 / 420
    zIndex: 0,
    overflow: 'hidden',
    backgroundColor: colors.onSurface.sunken,
    '& img': {
      display: 'block',
      width: '100%',
      height: '100%',
      objectFit: 'cover',
    },
  };
}

/** imgAbsolute text column sits above the image and is constrained to the left. */
export function getAbsoluteContentSx(): SxProps<Theme> {
  return {
    position: 'relative',
    zIndex: 1,
    maxWidth: '56%', // keep text clear of the right-side image
  };
}

/** imgAbsolute CTA row spans the full card width, above the image. */
export function getAbsoluteActionsSx(): SxProps<Theme> {
  return {
    position: 'relative',
    zIndex: 1,
    display: 'flex',
    gap: `${spacing.sm}px`,
    '& > *': { flex: 1 },
  };
}
