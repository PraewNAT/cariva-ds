import type { SxProps, Theme } from '@mui/material/styles';
import { getCarivaColors, getCarivaRadius, getCarivaSpacing } from '../carivaTokens';

export const SIDEBAR_WIDTH = 240;

const BAR_WIDTH = 2;
const BAR_HEIGHT = 40;

export function getSidebarItemRadius(theme?: Theme) {
  return getCarivaRadius(theme)['12'];
}

export function getSidebarSubitemRadius(theme?: Theme) {
  return getCarivaRadius(theme)['8'];
}

/** @deprecated Use getSidebarItemRadius(theme) — kept for backward compatibility */
export const SIDEBAR_ITEM_RADIUS = 12;
/** @deprecated Use getSidebarSubitemRadius(theme) */
export const SIDEBAR_SUBITEM_RADIUS = 8;

export function getSidebarRootSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    return {
      boxSizing: 'border-box',
      width: SIDEBAR_WIDTH,
      display: 'flex',
      flexDirection: 'column',
      gap: `${s.lg}px`,
      paddingTop: `${s.xl}px`,
      paddingBottom: `${s.xl}px`,
      backgroundColor: c.onSurface.default,
    };
  };
}

export function getSidebarLogoSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    return {
      boxSizing: 'border-box',
      width: '100%',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: `${s.sm}px ${s.lg}px`,
      backgroundColor: c.onSurface.default,
    };
  };
}

export function getSidebarContentSx(): SxProps<Theme> {
  return (theme) => {
    const s = getCarivaSpacing(theme);
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: `${s.xl}px`,
      paddingTop: `${s.lg}px`,
      paddingBottom: `${s.lg}px`,
      paddingLeft: `${s.sm}px`,
      paddingRight: `${s.sm}px`,
      flex: 1,
      minHeight: 0,
      overflowY: 'auto',
    };
  };
}

export function getSidebarSectionSx(): SxProps<Theme> {
  return (theme) => {
    const s = getCarivaSpacing(theme);
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: `${s.sm}px`,
    };
  };
}

export function getSidebarHeaderSx(): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const s = getCarivaSpacing(theme);
    return {
      padding: `0 ${s.lg}px`,
      color: c.content.secondary,
      fontWeight: 600,
    };
  };
}

export function getNavGroupSx(): SxProps<Theme> {
  return (theme) => {
    const s = getCarivaSpacing(theme);
    return {
      display: 'flex',
      flexDirection: 'column',
      gap: `${s.sm}px`,
      width: '100%',
    };
  };
}

export function getSubItemsSx(): SxProps<Theme> {
  return (theme) => {
    const s = getCarivaSpacing(theme);
    return {
      display: 'flex',
      flexDirection: 'row',
      gap: `${s.sm}px`,
      paddingTop: `${s.sm}px`,
      paddingBottom: `${s.sm}px`,
      paddingLeft: `${s.xl}px`,
    };
  };
}

export function getBarColumnSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    width: BAR_WIDTH,
    flexShrink: 0,
    alignSelf: 'stretch',
  };
}

export function getBarSegmentSx(selected: boolean): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    return {
      width: BAR_WIDTH,
      height: BAR_HEIGHT,
      backgroundColor: selected
        ? c.brand.primary.onSurface.default
        : c.border.default,
    };
  };
}

export function getSubItemRowsSx(): SxProps<Theme> {
  return {
    display: 'flex',
    flexDirection: 'column',
    flex: 1,
    minWidth: 0,
  };
}

export function getSubItemSx(selected: boolean): SxProps<Theme> {
  return (theme) => {
    const c = getCarivaColors(theme);
    const r = getCarivaRadius(theme);
    return {
      borderRadius: `${r['8']}px`,
      width: '100%',
      ...(selected
        ? {
            color: c.brand.primary.content.default,
            backgroundColor: c.onSurface.action.selected,
            '&:hover': { backgroundColor: c.onSurface.action.selected },
            '&.Mui-selected': {
              color: c.brand.primary.content.default,
              backgroundColor: c.onSurface.action.selected,
            },
          }
        : {}),
    };
  };
}
