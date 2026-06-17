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

type PageEntry = number | 'ellipsis';

function clampPage(page: number, count: number) {
  return Math.min(Math.max(page, 1), Math.max(count, 1));
}

function paginationRange({
  count,
  page,
  siblingCount,
  boundaryCount,
  showEllipsis,
}: Required<Pick<
  CrvPaginationProps,
  'count' | 'siblingCount' | 'boundaryCount' | 'showEllipsis'
>> & { page: number }): PageEntry[] {
  if (!showEllipsis) {
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  const maxVisible = boundaryCount * 2 + siblingCount * 2 + 3;
  if (count <= maxVisible) {
    return Array.from({ length: count }, (_, index) => index + 1);
  }

  const pages = new Set<number>();
  for (let index = 1; index <= boundaryCount; index += 1) pages.add(index);
  for (let index = count - boundaryCount + 1; index <= count; index += 1) pages.add(index);
  for (
    let index = page - siblingCount;
    index <= page + siblingCount;
    index += 1
  ) {
    if (index >= 1 && index <= count) pages.add(index);
  }

  if (page <= boundaryCount + siblingCount + 2) {
    for (let index = 1; index <= page + siblingCount + 1; index += 1) pages.add(index);
  }

  if (page >= count - boundaryCount - siblingCount - 1) {
    for (let index = page - siblingCount - 1; index <= count; index += 1) pages.add(index);
  }

  const sorted = Array.from(pages).sort((a, b) => a - b);
  const entries: PageEntry[] = [];

  sorted.forEach((entry, index) => {
    const previous = sorted[index - 1];
    if (previous && entry - previous > 1) {
      if (entry - previous === 2) entries.push(previous + 1);
      else entries.push('ellipsis');
    }
    entries.push(entry);
  });

  return entries;
}

export const CrvPagination = forwardRef<HTMLElement, CrvPaginationProps>(
  function CrvPagination(
    {
      count,
      page: pageProp,
      defaultPage = 1,
      size = 'large',
      disabled = false,
      showEllipsis = true,
      siblingCount = 1,
      boundaryCount = 1,
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
    const entries = paginationRange({
      count,
      page,
      siblingCount,
      boundaryCount,
      showEllipsis,
    });

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
          {entries.map((entry, index) => {
            if (entry === 'ellipsis') {
              return (
                <Typography
                  key={`ellipsis-${index}`}
                  component="span"
                  aria-hidden
                  sx={paginationItemSx(size, false, true)}
                >
                  ...
                </Typography>
              );
            }

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
