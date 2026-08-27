import type { SxProps, Theme } from '@mui/material/styles';
import { getCarivaColors, getCarivaRadius, getCarivaSpacing, getCarivaTypography } from '../carivaTokens';

export const TABS_FOLDER_SHADOW = '0 25px 50px -12px rgba(30, 58, 138, 0.25)';

function labelMediumSx(theme: Theme) {
  const ty = getCarivaTypography(theme);
  return {
    fontFamily: ty.fontFamily.sans,
    fontWeight: ty.fontWeight.medium,
    fontSize: `${ty.fontSize.label.medium}px`,
    lineHeight: `${ty.lineHeight.label.medium}px`,
    textTransform: 'none' as const,
  };
}

export function getStandardTabsSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    return {
      minHeight: 48,
      backgroundColor: c.onSurface.default,
      '& .MuiTabs-indicator': {
        height: 2,
        backgroundColor: c.brand.primary.onSurface.default,
      },
    };
  };
}

export function getStandardTabSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    return {
      ...labelMediumSx(theme),
      minHeight: 48,
      padding: `${s.md}px ${s.lg}px`,
      gap: `${s.sm}px`,
      color: c.content.secondary,
      '& .MuiSvgIcon-root': { color: 'inherit', fontSize: 24 },
      '&:hover': { backgroundColor: c.onSurface.subtle },
      '&.Mui-selected': { color: c.brand.primary.content.default },
      '&.Mui-disabled': { color: c.content.disabled },
    };
  };
}

const PILLS_SIZE = {
  default: { minHeight: 36, padY: 6, padX: 12 },
  line: { minHeight: 48, padY: 12, padX: 16 },
} as const;

export type CrvTabsPillsVariant = keyof typeof PILLS_SIZE;

export function getPillsTabsSx(tabVariant: CrvTabsPillsVariant): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    const r = getCarivaRadius(theme);
    const size = PILLS_SIZE[tabVariant];
    const containerPad = tabVariant === 'default' ? s.xs : s.sm;
    return {
      display: 'inline-flex',
      minHeight: 0,
      padding: `${containerPad}px`,
      borderRadius: `${r.full}px`,
      backgroundColor: c.onSurface.action.hover,
      '& .MuiTabs-indicator': {
        height: '100%',
        top: 0,
        bottom: 0,
        borderRadius: `${r.full}px`,
        backgroundColor: c.brand.primary.onSurface.default,
        zIndex: 0,
      },
      '& .MuiTabs-flexContainer': { gap: 0 },
    };
  };
}

export function getPillsTabSx(tabVariant: CrvTabsPillsVariant): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    const r = getCarivaRadius(theme);
    const size = PILLS_SIZE[tabVariant];
    return {
      ...labelMediumSx(theme),
      zIndex: 1,
      minHeight: size.minHeight,
      padding: `${size.padY}px ${size.padX}px`,
      gap: `${s.sm}px`,
      borderRadius: `${r.full}px`,
      color: c.content.secondary,
      transition: 'color 150ms ease',
      '& .MuiSvgIcon-root': { color: 'inherit', fontSize: 24 },
      '&.Mui-selected': { color: c.content.inverse },
      '&.Mui-disabled': { color: c.content.disabled },
    };
  };
}

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

export function getFolderTabSx(
  selected: boolean,
  options?: { isFirst?: boolean },
): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    const r = getCarivaRadius(theme);
    const isFirst = options?.isFirst ?? false;
    const bg = selected ? c.onSurface.default : 'transparent';
    const folderConnector = r['16'];
    const connectorMask = `radial-gradient(circle ${folderConnector}px at top right, transparent ${folderConnector}px, #000 ${folderConnector}px)`;

    return {
      ...labelMediumSx(theme),
      display: 'inline-flex',
      alignItems: 'center',
      gap: `${s.sm}px`,
      height: 56,
      padding: `${s.lg}px ${s.xl}px`,
      border: 'none',
      cursor: 'pointer',
      borderTopLeftRadius: isFirst ? 0 : `${r['16']}px`,
      borderTopRightRadius: `${r['16']}px`,
      borderBottomLeftRadius: 0,
      borderBottomRightRadius: 0,
      backgroundColor: bg,
      boxShadow: selected ? TABS_FOLDER_SHADOW : 'none',
      clipPath: selected ? 'inset(-60px -60px 0 -60px)' : 'none',
      color: selected ? c.content.primary : c.content.secondary,
      position: 'relative',
      zIndex: selected ? FOLDER_Z.tabSelected : FOLDER_Z.tab,
      '& .MuiSvgIcon-root': {
        fontSize: 24,
        color: selected ? c.brand.primary.content.default : c.content.secondary,
      },
      '&::after': {
        content: '""',
        position: 'absolute',
        bottom: 0,
        right: `-${folderConnector}px`,
        width: `${folderConnector}px`,
        height: `${folderConnector}px`,
        backgroundColor: bg,
        maskImage: connectorMask,
        WebkitMaskImage: connectorMask,
        pointerEvents: 'none',
      },
      '&:hover': {
        backgroundColor: selected ? c.onSurface.default : c.onSurface.action.hover,
        '&::after': {
          backgroundColor: selected ? c.onSurface.default : c.onSurface.action.hover,
        },
      },
      '&:disabled': { cursor: 'default', color: c.content.disabled },
    };
  };
}

export function getFolderContentSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const r = getCarivaRadius(theme);
    return {
      position: 'relative',
      zIndex: FOLDER_Z.content,
      backgroundColor: c.onSurface.default,
      borderRadius: `0 ${r['12']}px ${r['12']}px ${r['12']}px`,
    };
  };
}
