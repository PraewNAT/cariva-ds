'use client';

import { forwardRef, useState } from 'react';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import {
  colors,
  spacing,
  typography,
  productStyle,
  defaultProductStyle,
} from '../../tokens';
import type { CrvAccordionProps } from './CrvAccordion.types';

// Ground truth from Figma (crv-accordion-standard, node 4167:191)
const CONTAINER_RADIUS = productStyle[defaultProductStyle].containerSm;
const ICON_WRAPPER_SIZE = 38;
const ICON_SIZE = 22;
const CHEVRON_SIZE = 24;

export const CrvAccordion = forwardRef<HTMLDivElement, CrvAccordionProps>(
  function CrvAccordion(
    {
      title,
      children,
      showIcon = true,
      icon,
      expanded: expandedProp,
      defaultExpanded = false,
      onChange,
      sx,
      ...rest
    },
    ref,
  ) {
    const [internalExpanded, setInternalExpanded] = useState(defaultExpanded);
    const expanded = expandedProp ?? internalExpanded;

    const handleChange: CrvAccordionProps['onChange'] = (event, isExpanded) => {
      if (expandedProp === undefined) {
        setInternalExpanded(isExpanded);
      }
      onChange?.(event, isExpanded);
    };

    const resolvedIcon = icon ?? (
      <ErrorOutlineIcon
        sx={{
          fontSize: ICON_SIZE,
          color:    colors.brand.primary.content.default,
        }}
      />
    );

    return (
      <Accordion
        ref={ref}
        expanded={expanded}
        onChange={handleChange}
        disableGutters
        elevation={0}
        square={false}
        sx={{
          borderRadius:    `${CONTAINER_RADIUS}px`,
          backgroundColor: expanded
            ? colors.onSurface.action.hover
            : colors.onSurface.default,
          boxShadow:       'none',
          '&:before':      { display: 'none' },
          '&.Mui-expanded': {
            px: `${spacing.md}px`,
            pb: `${spacing.md}px`,
            pt: 0,
          },
          '&:not(.Mui-expanded)': {
            px: `${spacing.md}px`,
            py: `${spacing.md}px`,
          },
          ...sx,
        }}
        {...rest}
      >
        <AccordionSummary
          expandIcon={
            expanded ? (
              <KeyboardArrowDownIcon
                sx={{ fontSize: CHEVRON_SIZE, color: colors.content.secondary }}
              />
            ) : (
              <KeyboardArrowUpIcon
                sx={{ fontSize: CHEVRON_SIZE, color: colors.content.secondary }}
              />
            )
          }
          sx={{
            px:         0,
            py:         `${spacing.md}px`,
            minHeight:  'unset',
            gap:        `${spacing.lg}px`,
            '& .MuiAccordionSummary-content': {
              display:    'flex',
              alignItems: 'center',
              gap:        `${spacing.lg}px`,
              my:         0,
              flex:       1,
            },
            '& .MuiAccordionSummary-expandIconWrapper': {
              transform: 'none !important',
            },
          }}
        >
          {showIcon && (
            <Box
              sx={{
                display:         'flex',
                alignItems:      'center',
                justifyContent:  'center',
                width:           ICON_WRAPPER_SIZE,
                height:          ICON_WRAPPER_SIZE,
                flexShrink:      0,
                borderRadius:    `${spacing.sm}px`,
                backgroundColor: colors.brand.primary.onSurface.muted,
              }}
            >
              {resolvedIcon}
            </Box>
          )}

          <Typography
            component="span"
            sx={{
              flex:       1,
              fontFamily: typography.fontFamily.sans,
              fontSize:   `${typography.fontSize.heading.small}px`,
              lineHeight: `${typography.lineHeight.heading.small}px`,
              fontWeight: typography.fontWeight.semibold,
              color:      colors.content.primary,
            }}
          >
            {title}
          </Typography>
        </AccordionSummary>

        <AccordionDetails
          sx={{
            px: 0,
            pt: `${spacing.sm}px`,
            pb: 0,
          }}
        >
          <Typography
            component="div"
            sx={{
              fontFamily: typography.fontFamily.sans,
              fontSize:   `${typography.fontSize.body.large}px`,
              lineHeight: `${typography.lineHeight.body.large}px`,
              fontWeight: typography.fontWeight.regular,
              color:      colors.content.secondary,
            }}
          >
            {children}
          </Typography>
        </AccordionDetails>
      </Accordion>
    );
  },
);
