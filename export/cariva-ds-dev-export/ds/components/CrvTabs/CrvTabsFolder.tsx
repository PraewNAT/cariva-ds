'use client';

import { forwardRef } from 'react';
import Box from '@mui/material/Box';
import { getFolderRootSx, getFolderTabSx } from './crvTabsStyles';
import type { CrvTabsFolderProps } from './CrvTabs.types';

// Ground truth: Figma crv-tabs-folder 4725:21088 (base set crv-tabs-folder-base 4725:18223)
// Web / Back Office only — outermost tab layer.
export const CrvTabsFolder = forwardRef<HTMLDivElement, CrvTabsFolderProps>(
  function CrvTabsFolder({ items, value, onChange, sx }, ref) {
    return (
      <Box
        ref={ref}
        role="tablist"
        sx={[getFolderRootSx(), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
      >
        {items.map((item, index) => {
          const selected = item.value === value;
          return (
            <Box
              key={item.value}
              component="button"
              type="button"
              role="tab"
              aria-selected={selected}
              disabled={item.disabled}
              onClick={(event) => onChange?.(item.value, event)}
              sx={getFolderTabSx(selected, { isFirst: index === 0 })}
            >
              {item.icon}
              <Box component="span">{item.label}</Box>
              {item.tag}
            </Box>
          );
        })}
      </Box>
    );
  },
);
