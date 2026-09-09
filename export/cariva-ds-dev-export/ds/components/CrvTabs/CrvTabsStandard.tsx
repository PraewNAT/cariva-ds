'use client';

import { forwardRef } from 'react';
import type { SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Badge from '@mui/material/Badge';
import { colors } from '../../tokens';
import { getStandardTabSx, getStandardTabsSx } from './crvTabsStyles';
import type { CrvTabsStandardProps, CrvTabValue } from './CrvTabs.types';

// Ground truth: Figma crv-tabs-standard set 6086:59 — size=large 4838:9365, size=small 6086:17
// (base set 4724:141435)
export const CrvTabsStandard = forwardRef<HTMLDivElement, CrvTabsStandardProps>(
  function CrvTabsStandard({ items, value, onChange, size = 'large', sx }, ref) {
    const handleChange = (event: SyntheticEvent, next: CrvTabValue) => {
      onChange?.(next, event);
    };

    return (
      <Tabs
        ref={ref}
        value={value}
        onChange={handleChange}
        variant="scrollable"
        scrollButtons={false}
        sx={[getStandardTabsSx(size), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
      >
        {items.map((item) => (
          <Tab
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            disableRipple
            icon={item.icon ?? undefined}
            iconPosition="start"
            label={
              item.showBadge ? (
                <Badge
                  variant="dot"
                  sx={{ '& .MuiBadge-dot': { backgroundColor: colors.border.error } }}
                >
                  {item.label}
                </Badge>
              ) : (
                item.label
              )
            }
            sx={getStandardTabSx(size)}
          />
        ))}
      </Tabs>
    );
  },
);
