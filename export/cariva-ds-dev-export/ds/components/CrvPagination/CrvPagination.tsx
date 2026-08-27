'use client';

import { forwardRef, useState } from 'react';
import type { MouseEvent } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import { CrvDropdown } from '../CrvDropdown';
import {
  paginationControllerSx,
  paginationDropdownSize,
  paginationItemSx,
  paginationLabelSx,
  paginationPagesSx,
  paginationRootSx,
  paginationSelectSx,
} from './crvPaginationStyles';
import { spacing } from '../../tokens';
import type {
  CrvPaginationJumpToPageProps,
  CrvPaginationProps,
  CrvPaginationRowsPerPageProps,
} from './CrvPagination.types';

/** Figma crv-pagination-standard (4230:1661) — page strip fits five page buttons. */
export const PAGINATION_MAX_VISIBLE_PAGES = 5;

function clampPage(page: number, count: number) {
  return Math.min(Math.max(page, 1), Math.max(count, 1));
}

function paginationRange(count: number, page: number): number[] {
  if (count <= PAGINATION_MAX_VISIBLE_PAGES) {
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  let start = page - Math.floor(PAGINATION_MAX_VISIBLE_PAGES / 2);
  let end = start + PAGINATION_MAX_VISIBLE_PAGES - 1;

  if (start < 1) {
    start = 1;
    end = PAGINATION_MAX_VISIBLE_PAGES;
  }

  if (end > count) {
    end = count;
    start = count - PAGINATION_MAX_VISIBLE_PAGES + 1;
  }

  return Array.from({ length: end - start + 1 }, (_, index) => start + index);
}

export const CrvPagination = forwardRef<HTMLElement, CrvPaginationProps>(
  function CrvPagination(
    {
      count,
      page: pageProp,
      defaultPage = 1,
      size = 'large',
      disabled = false,
      previousLabel = 'Previous page',
      nextLabel = 'Next page',
      getPageLabel = (page) => `Go to page ${page}`,
      onChange,
      ...rest
    },
    ref,
  ) {
    const [uncontrolledPage, setUncontrolledPage] = useState(defaultPage);
    const page = clampPage(pageProp ?? uncontrolledPage, count);
    const isControlled = pageProp !== undefined;
    const entries = paginationRange(count, page);

    const goToPage = (
      event: MouseEvent<HTMLButtonElement>,
      nextPage: number,
    ) => {
      const clampedPage = clampPage(nextPage, count);
      if (disabled || clampedPage === page) return;
      if (!isControlled) setUncontrolledPage(clampedPage);
      onChange?.(event, clampedPage);
    };

    const previousDisabled = disabled || page <= 1;
    const nextDisabled = disabled || page >= count;

    return (
      <Box
        ref={ref}
        component="nav"
        aria-label="pagination"
        sx={paginationRootSx(size)}
        {...rest}
      >
        <IconButton
          aria-label={previousLabel}
          disabled={previousDisabled}
          onClick={(event) => goToPage(event, page - 1)}
          sx={paginationControllerSx(size, previousDisabled)}
        >
          <ChevronLeftIcon />
        </IconButton>

        <Box sx={paginationPagesSx(size)}>
          {entries.map((entry) => {
            const selected = entry === page;
            return (
              <Box
                key={entry}
                component="button"
                type="button"
                aria-label={getPageLabel(entry)}
                aria-current={selected ? 'page' : undefined}
                disabled={disabled}
                onClick={(event) => goToPage(event, entry)}
                sx={paginationItemSx(size, selected, disabled)}
              >
                {entry}
              </Box>
            );
          })}
        </Box>

        <IconButton
          aria-label={nextLabel}
          disabled={nextDisabled}
          onClick={(event) => goToPage(event, page + 1)}
          sx={paginationControllerSx(size, nextDisabled)}
        >
          <ChevronRightIcon />
        </IconButton>
      </Box>
    );
  },
);

export const CrvPaginationRowsPerPage = forwardRef<
  HTMLDivElement,
  CrvPaginationRowsPerPageProps
>(
  function CrvPaginationRowsPerPage(
    {
      value,
      options = [10, 25, 50, 100],
      label = 'Show',
      suffix = 'rows',
      size = 'large',
      disabled = false,
      onChange,
      ...rest
    },
    ref,
  ) {
    return (
      <Box
        ref={ref}
        sx={{ display: 'inline-flex', alignItems: 'center', gap: `${spacing.lg}px` }}
        {...rest}
      >
        <Typography sx={paginationLabelSx}>{label}</Typography>
        <CrvDropdown
          labelVisible={false}
          size={paginationDropdownSize(size)}
          value={String(value)}
          disabled={disabled}
          options={options.map((option) => ({
            value: String(option),
            label: String(option),
          }))}
          onChange={(event) => onChange?.(event, Number(event.target.value))}
          sx={paginationSelectSx()}
        />
        <Typography sx={paginationLabelSx}>{suffix}</Typography>
      </Box>
    );
  },
);

export const CrvPaginationJumpToPage = forwardRef<
  HTMLDivElement,
  CrvPaginationJumpToPageProps
>(
  function CrvPaginationJumpToPage(
    {
      value,
      count,
      label = 'Go to',
      size = 'large',
      disabled = false,
      onChange,
      ...rest
    },
    ref,
  ) {
    return (
      <Box
        ref={ref}
        sx={{ display: 'inline-flex', alignItems: 'center', gap: `${spacing.lg}px` }}
        {...rest}
      >
        <Typography sx={paginationLabelSx}>{label}</Typography>
        <CrvDropdown
          labelVisible={false}
          size={paginationDropdownSize(size)}
          value={String(value)}
          disabled={disabled}
          options={Array.from({ length: count }, (_, index) => {
            const page = index + 1;
            return { value: String(page), label: String(page) };
          })}
          onChange={(event) => onChange?.(event, Number(event.target.value))}
          sx={paginationSelectSx()}
        />
      </Box>
    );
  },
);
