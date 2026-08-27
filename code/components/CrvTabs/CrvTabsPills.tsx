'use client';

import { forwardRef } from 'react';
import type { SyntheticEvent } from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import { getPillsTabSx, getPillsTabsSx } from './crvTabsStyles';
import type { CrvTabsPillsProps, CrvTabValue } from './CrvTabs.types';

// Ground truth: Figma crv-tabs-pills 3875:4462 (base set crv-tabs-base 3875:4448)
export const CrvTabsPills = forwardRef<HTMLDivElement, CrvTabsPillsProps>(
  function CrvTabsPills(
    { items, value, onChange, variant = 'standard', tabVariant = 'default', sx },
    ref,
  ) {
    const handleChange = (event: SyntheticEvent, next: CrvTabValue) => {
      onChange?.(next, event);
    };

    return (
      <Tabs
        ref={ref}
        value={value}
        onChange={handleChange}
        variant={variant === 'fullWidth' ? 'fullWidth' : 'standard'}
        sx={[
          getPillsTabsSx(tabVariant),
          variant === 'fullWidth' ? { display: 'flex', width: '100%' } : {},
          ...(Array.isArray(sx) ? sx : sx ? [sx] : []),
        ]}
      >
        {items.map((item) => (
          <Tab
            key={item.value}
            value={item.value}
            disabled={item.disabled}
            disableRipple
            icon={item.icon ?? undefined}
            iconPosition="start"
            label={item.label}
            sx={getPillsTabSx(tabVariant)}
          />
        ))}
      </Tabs>
    );
  },
);
