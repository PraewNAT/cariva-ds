'use client';

import { forwardRef, useId } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, spacing, typography } from '../../tokens';
import { CrvCheckboxBase } from '../CrvCheckboxBase';
import {
  getAnchoredControlSx,
  getControlSlotSx,
  getLabelColor,
  getStandardRootSx,
} from '../CrvCheckboxBase/crvCheckboxStyles';
import type { CrvCheckboxProps } from './CrvCheckbox.types';

const labelSx = {
  fontFamily: typography.fontFamily.sans,
  fontSize:   `${typography.fontSize.label.medium}px`,
  lineHeight: `${typography.lineHeight.label.medium}px`,
  fontWeight: typography.fontWeight.medium,
  margin:     0,
  padding:    0,
  display:    'block',
};

const descriptionSx = {
  fontFamily: typography.fontFamily.sans,
  fontSize:   `${typography.fontSize.body.medium}px`,
  lineHeight: `${typography.lineHeight.body.medium}px`,
  fontWeight: typography.fontWeight.regular,
  margin:     0,
  padding:    0,
  display:    'block',
};

// Ground truth from Figma (crv-checkbox-standard, node 3815:5291)
export const CrvCheckbox = forwardRef<HTMLButtonElement, CrvCheckboxProps>(
  function CrvCheckbox(
    {
      type = 'default',
      color = 'primary',
      labelPlacement = 'end',
      label = 'Accept terms and conditions',
      labelVisible = true,
      description = 'You agree to our Terms of Service and Privacy Policy.',
      descriptionVisible = true,
      disabled = false,
      id: idProp,
      sx,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const showDescription = type !== 'groupItem' && descriptionVisible;
    const labelColor = getLabelColor(color, Boolean(disabled));
    const isGroupItem = type === 'groupItem';

    return (
      <Box
        sx={{
          ...getStandardRootSx(type),
          flexDirection: labelPlacement === 'start' ? 'row-reverse' : 'row',
          ...sx,
        }}
      >
        <Box sx={getControlSlotSx(type)}>
          <CrvCheckboxBase
            ref={ref}
            id={inputId}
            color={color}
            disabled={disabled}
            sx={getAnchoredControlSx()}
            {...rest}
          />
        </Box>

        {(labelVisible || showDescription) && (
          <Box
            component="label"
            htmlFor={inputId}
            sx={{
              display:       'flex',
              flexDirection: 'column',
              gap:           isGroupItem ? 0 : `${spacing.sm}px`,
              flex:          1,
              minWidth:      0,
              cursor:        disabled ? 'not-allowed' : 'pointer',
            }}
          >
            {labelVisible && (
              <Typography
                component="span"
                sx={{
                  ...labelSx,
                  color: labelColor,
                  ...(!isGroupItem && { pt: '1px' }),
                }}
              >
                {label}
              </Typography>
            )}

            {showDescription && (
              <Typography
                component="span"
                sx={{
                  ...descriptionSx,
                  color: disabled
                    ? colors.content.disabled
                    : colors.content.secondary,
                }}
              >
                {description}
              </Typography>
            )}
          </Box>
        )}
      </Box>
    );
  },
);
