'use client';

import { useState } from 'react';
import Box from '@mui/material/Box';
import Collapse from '@mui/material/Collapse';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import { colors } from '../../tokens';
import { CrvMenuItem } from '../CrvMenuItem';
import {
  getBarColumnSx,
  getBarSegmentSx,
  getNavGroupSx,
  getSubItemRowsSx,
  getSubItemsSx,
  SIDEBAR_ITEM_RADIUS,
  SIDEBAR_SUBITEM_RADIUS,
} from './crvSidebarStyles';
import type { CrvSidebarMenuProps } from './CrvSidebar.types';

// Ground truth: Figma crv-sidebar-menu 4735:102038 (open=true | open=false)
export function CrvSidebarMenu({
  label,
  icon,
  items = [],
  open,
  defaultOpen = false,
  onToggle,
  selected = false,
  disabled = false,
  sx,
}: CrvSidebarMenuProps) {
  const [internalOpen, setInternalOpen] = useState(defaultOpen);
  const isOpen = open ?? internalOpen;

  const toggle = () => {
    const next = !isOpen;
    if (open === undefined) setInternalOpen(next);
    onToggle?.(next);
  };

  return (
    <Box sx={[getNavGroupSx(), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}>
      <CrvMenuItem
        component="div"
        leftIcon={icon}
        leftIconVisible={Boolean(icon)}
        selected={selected}
        disabled={disabled}
        onClick={toggle}
        rightIcon={
          isOpen ? (
            <ExpandLessIcon sx={{ fontSize: 20, color: colors.content.secondary }} />
          ) : (
            <ExpandMoreIcon sx={{ fontSize: 20, color: colors.content.secondary }} />
          )
        }
        sx={{ borderRadius: `${SIDEBAR_ITEM_RADIUS}px` }}
      >
        {label}
      </CrvMenuItem>

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
                leftIconVisible={Boolean(item.icon)}
                rightIconVisible={false}
                selected={item.selected}
                disabled={item.disabled}
                onClick={item.onClick}
                sx={{ borderRadius: `${SIDEBAR_SUBITEM_RADIUS}px` }}
              >
                {item.label}
              </CrvMenuItem>
            ))}
          </Box>
        </Box>
      </Collapse>
    </Box>
  );
}
