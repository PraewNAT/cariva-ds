import type { SxProps, Theme } from '@mui/material/styles';
import { colors, radius, spacing, typography } from '../../tokens';

/** typography/label/medium (500 / 14 / 22px). */
const labelMediumSx = {
  fontFamily: typography.fontFamily.sans,
  fontWeight: typography.fontWeight.medium,
  fontSize: `${typography.fontSize.label.medium}px`,
  lineHeight: `${typography.lineHeight.label.medium}px`,
  textTransform: 'none' as const,
};

/** Folder selected tab — Figma shadow/2xl (brand-900 @ 25%). */
export const TABS_FOLDER_SHADOW = '0 25px 50px -12px rgba(30, 58, 138, 0.25)';

/* ------------------------------------------------------------------ */
/* Standard — underline indicator (crv-tabs-standard 4838:9365)        */
/* ------------------------------------------------------------------ */

export function getStandardTabsSx(): SxProps<Theme> {
  return {
    minHeight: 48,
    backgroundColor: colors.onSurface.default,
    '& .MuiTabs-indicator': {
      height: 2,
      backgroundColor: colors.brand.primary.onSurface.default,
    },
  };
}

export function getStandardTabSx(): SxProps<Theme> {
  return {
    ...labelMediumSx,
    minHeight: 48,
    padding: `${spacing.md}px ${spacing.lg}px`,
    gap: `${spacing.sm}px`,
    color: colors.content.secondary,
    '& .MuiSvgIcon-root': { color: 'inherit', fontSize: 24 },
    '&:hover': { backgroundColor: colors.onSurface.subtle },
    '&.Mui-selected': { color: colors.brand.primary.content.default },
    '&.Mui-disabled': { color: colors.content.disabled },
  };
}

/* ------------------------------------------------------------------ */
/* Pills — segmented control (crv-tabs-pills 3875:4462)                */
/* ------------------------------------------------------------------ */

const PILLS_SIZE = {
  default: { minHeight: 36, padY: 6, padX: 12, containerPad: spacing.xs },
  line: { minHeight: 48, padY: 12, padX: 16, containerPad: spacing.sm },
} as const;

export type CrvTabsPillsVariant = keyof typeof PILLS_SIZE;

export function getPillsTabsSx(tabVariant: CrvTabsPillsVariant): SxProps<Theme> {
  const size = PILLS_SIZE[tabVariant];
  return {
    display: 'inline-flex',
    minHeight: 0,
    padding: `${size.containerPad}px`,
    borderRadius: `${radius.full}px`,
    backgroundColor: colors.onSurface.action.hover,
    '& .MuiTabs-indicator': {
      height: '100%',
      top: 0,
      bottom: 0,
      borderRadius: `${radius.full}px`,
      backgroundColor: colors.brand.primary.onSurface.default,
      zIndex: 0,
    },
    '& .MuiTabs-flexContainer': { gap: 0 },
  };
}

export function getPillsTabSx(tabVariant: CrvTabsPillsVariant): SxProps<Theme> {
  const size = PILLS_SIZE[tabVariant];
  return {
    ...labelMediumSx,
    zIndex: 1,
    minHeight: size.minHeight,
    padding: `${size.padY}px ${size.padX}px`,
    gap: `${spacing.sm}px`,
    borderRadius: `${radius.full}px`,
    color: colors.content.secondary,
    transition: 'color 150ms ease',
    '& .MuiSvgIcon-root': { color: 'inherit', fontSize: 24 },
    '&.Mui-selected': { color: colors.content.inverse },
    '&.Mui-disabled': { color: colors.content.disabled },
  };
}

/* ------------------------------------------------------------------ */
/* Folder — outer-layer tabs (crv-tabs-folder 4725:21088)              */
/* ------------------------------------------------------------------ */

/** Stacking: inactive tabs < content panel < selected tab. */
export const FOLDER_Z = {
  tab: 1,
  content: 2,
  tabSelected: 3,
} as const;

export function getFolderRootSx(): SxProps<Theme> {
  return {
    display: 'flex',
    alignItems: 'flex-end',
    gap: 0,
    position: 'relative',
    zIndex: FOLDER_Z.tab,
  };
}

/** Concave "foot" radius that flares the folder tab into the content panel. */
const FOLDER_CONNECTOR = radius['16'];

export function getFolderTabSx(selected: boolean): SxProps<Theme> {
  const bg = selected ? colors.onSurface.default : 'transparent';
  // Figma `vector` (4725:18223): a curved connector on the bottom-right that
  // merges the tab into the content panel — the folder-tab signature.
  const connectorMask = `radial-gradient(circle ${FOLDER_CONNECTOR}px at top right, transparent ${FOLDER_CONNECTOR}px, #000 ${FOLDER_CONNECTOR}px)`;

  return {
    ...labelMediumSx,
    display: 'inline-flex',
    alignItems: 'center',
    gap: `${spacing.sm}px`,
    height: 56,
    padding: `${spacing.lg}px ${spacing.xl}px`,
    border: 'none',
    cursor: 'pointer',
    borderTopLeftRadius: `${radius['16']}px`,
    borderTopRightRadius: `${radius['16']}px`,
    borderBottomLeftRadius: 0,
    borderBottomRightRadius: 0,
    backgroundColor: bg,
    boxShadow: selected ? TABS_FOLDER_SHADOW : 'none',
    // Clip bottom shadow so it never spills onto the content panel (panel sits above inactive tabs).
    clipPath: selected ? 'inset(-60px -60px 0 -60px)' : 'none',
    color: selected ? colors.content.primary : colors.content.secondary,
    position: 'relative',
    zIndex: selected ? FOLDER_Z.tabSelected : FOLDER_Z.tab,
    '& .MuiSvgIcon-root': {
      fontSize: 24,
      color: selected ? colors.brand.primary.content.default : colors.content.secondary,
    },
    // Curved connector flaring to the right at the tab base.
    '&::after': {
      content: '""',
      position: 'absolute',
      bottom: 0,
      right: `-${FOLDER_CONNECTOR}px`,
      width: `${FOLDER_CONNECTOR}px`,
      height: `${FOLDER_CONNECTOR}px`,
      backgroundColor: bg,
      maskImage: connectorMask,
      WebkitMaskImage: connectorMask,
      pointerEvents: 'none',
    },
    '&:hover': {
      backgroundColor: selected ? colors.onSurface.default : colors.onSurface.action.hover,
      '&::after': {
        backgroundColor: selected ? colors.onSurface.default : colors.onSurface.action.hover,
      },
    },
    '&:disabled': { cursor: 'default', color: colors.content.disabled },
  };
}

/** Content panel below folder tabs — sits above inactive tabs, below the selected tab. */
export function getFolderContentSx(): SxProps<Theme> {
  return {
    position: 'relative',
    zIndex: FOLDER_Z.content,
    backgroundColor: colors.onSurface.default,
    borderRadius: `0 ${radius['12']}px ${radius['12']}px ${radius['12']}px`,
  };
}
