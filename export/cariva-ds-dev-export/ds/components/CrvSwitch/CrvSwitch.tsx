'use client';

import { forwardRef, useId } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { colors, spacing, typography } from '../../tokens';
import { CrvSwitchBase } from '../CrvSwitchBase';
import {
  getAnchoredControlSx,
  getControlSlotSx,
  getLabelColor,
  getStandardRootSx,
} from '../CrvSwitchBase/crvSwitchStyles';
import type { CrvSwitchProps } from './CrvSwitch.types';

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

// Ground truth from Figma (crv-switch, node 3875:1672)
export const CrvSwitch = forwardRef<HTMLButtonElement, CrvSwitchProps>(
  function CrvSwitch(
    {
      color = 'primary',
      labelPlacement = 'end',
      label = 'Accept terms and conditions',
      labelVisible = true,
      description = 'You agree to our Terms of Service and Privacy Policy.',
      descriptionVisible = true,
      disabled = false,
      id: idProp,
      inputProps,
      sx,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const labelColor = getLabelColor(color, Boolean(disabled));

    return (
      <Box
        sx={{
          ...getStandardRootSx(),
          flexDirection: labelPlacement === 'start' ? 'row-reverse' : 'row',
          ...sx,
        }}
      >
        <Box sx={getControlSlotSx('medium')}>
          <CrvSwitchBase
            ref={ref}
            id={inputId}
            disabled={disabled}
            inputProps={inputProps}
            sx={getAnchoredControlSx()}
            {...rest}
          />
        </Box>

        {(labelVisible || descriptionVisible) && (
          <Box
            component="label"
            htmlFor={inputId}
            sx={{
              display:       'flex',
              flexDirection: 'column',
              gap:           `${spacing.sm}px`,
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
                  pt:    '1px',
                }}
              >
                {label}
              </Typography>
            )}

            {descriptionVisible && (
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
