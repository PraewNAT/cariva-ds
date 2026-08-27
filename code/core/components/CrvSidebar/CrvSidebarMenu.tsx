'use client';

import { cloneElement, isValidElement, useState } from 'react';
import type { ReactNode } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import KeyboardArrowDownRoundedIcon from '@mui/icons-material/KeyboardArrowDownRounded';
import KeyboardArrowUpRoundedIcon from '@mui/icons-material/KeyboardArrowUpRounded';
import { colors } from '../../tokens';
import { CrvMenuItem } from '../CrvMenuItem';
import {
  getBarColumnSx,
  getBarSegmentSx,
  getNavGroupSx,
  getSubItemRowsSx,
  getSubItemsSx,
  getSubItemSx,
  SIDEBAR_ITEM_RADIUS,
} from './crvSidebarStyles';
import type { CrvSidebarMenuProps } from './CrvSidebar.types';

/** Tint leading icon — Figma 4735:102037. */
function tintIcon(icon: ReactNode, color: string): ReactNode {
  if (!isValidElement<{ sx?: object }>(icon)) return icon;
  const prev = icon.props.sx;
  return cloneElement(icon, {
    sx: { ...(typeof prev === 'object' && prev != null ? prev : {}), color, fontSize: 20 },
  });
}

function resolveMenuType(
  type: CrvSidebarMenuProps['type'],
  rightIconVisible: boolean,
): 'expand' | 'default' {
  if (type) return type;
  return rightIconVisible ? 'expand' : 'default';
}

function resolveControlledActive(
  isExpandable: boolean,
  active: boolean | undefined,
  open: boolean | undefined,
  selected: boolean | undefined,
): boolean | undefined {
  if (active !== undefined) return active;
  return isExpandable ? open : selected;
}

// Ground truth: Figma crv-sidebar-menu 4735:102038 — type=expand|default × active=true|false
export function CrvSidebarMenu({
  type,
  label,
  icon,
  items = [],
  active,
  defaultActive,
  open,
  defaultOpen = false,
  onToggle,
  onClick,
  selected = false,
  rightIconVisible = true,
  disabled = false,
  sx,
}: CrvSidebarMenuProps) {
  const menuType = resolveMenuType(type, rightIconVisible);
  const isExpandable = menuType === 'expand';
  const initialActive = defaultActive ?? defaultOpen;
  const [internalActive, setInternalActive] = useState(initialActive);
  const controlledActive = resolveControlledActive(isExpandable, active, open, selected);
  const isActive = controlledActive ?? internalActive;
  const isOpen = isExpandable ? isActive : false;

  // Figma 4735:102037 — expand parent: icon secondary + label primary (never brand tint).
  // default parent active=true: icon + label brand primary (4976:43171).
  const isDefaultActive = !isExpandable && isActive;
  const iconColor = isDefaultActive
    ? colors.brand.primary.onSurface.default
    : colors.content.secondary;
  const labelColor = isDefaultActive
    ? colors.brand.primary.content.default
    : colors.content.primary;

  const handleParentClick = () => {
    if (!isExpandable) {
      onClick?.();
      return;
    }
    const next = !isActive;
    if (controlledActive === undefined) setInternalActive(next);
    onToggle?.(next);
  };

  return (
    <Box sx={[getNavGroupSx(), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}>
      <CrvMenuItem
        component="div"
        leftIcon={tintIcon(icon, iconColor)}
        leftIconVisible={Boolean(icon)}
        selected={false}
        disabled={disabled}
        onClick={handleParentClick}
        rightIconVisible={isExpandable}
        rightIcon={
          isOpen ? (
            <KeyboardArrowUpRoundedIcon sx={{ fontSize: 20, color: iconColor }} />
          ) : (
            <KeyboardArrowDownRoundedIcon sx={{ fontSize: 20, color: iconColor }} />
          )
        }
        sx={{
          borderRadius: `${SIDEBAR_ITEM_RADIUS}px`,
          width: '100%',
          color: labelColor,
        }}
      >
        {label}
      </CrvMenuItem>

      {isExpandable ? (
        <Collapse in={isOpen} unmountOnExit>
          <Box sx={getSubItemsSx()}>
            <Box aria-hidden sx={getBarColumnSx()}>
              {items.map((item, index) => (
                <Box key={index} sx={getBarSegmentSx(Boolean(item.selected))} />
              ))}
            </Box>
            <Box sx={getSubItemRowsSx()}>
              {items.map((item, index) => (
                <CrvMenuItem
                  key={index}
                  component="div"
                  leftIcon={item.icon}
                  leftIconVisible={item.icon != null}
                  rightIconVisible={false}
                  selected={item.selected}
                  disabled={item.disabled}
                  onClick={item.onClick}
                  sx={getSubItemSx(Boolean(item.selected))}
                >
                  {item.label}
                </CrvMenuItem>
              ))}
            </Box>
          </Box>
        </Collapse>
      ) : null}
    </Box>
  );
}
