'use client';

import { forwardRef, useId } from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { spacing, typography } from '../../tokens';
import { CrvCheckboxBase } from '../CrvCheckboxBase';
import {
  getAnchoredControlSx,
  getControlSlotSx,
} from '../CrvCheckboxBase/crvCheckboxStyles';
import {
  getCardDescriptionColor,
  getCardLabelColor,
  getCardSx,
} from './crvCheckboxCardStyles';
import type { CrvCheckboxCardProps } from './CrvCheckboxCard.types';

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

// Ground truth from Figma (crv-checkbox-card, node 6697:362)
export const CrvCheckboxCard = forwardRef<HTMLButtonElement, CrvCheckboxCardProps>(
  function CrvCheckboxCard(
    {
      color = 'primary',
      label = 'Accept terms and conditions',
      labelVisible = true,
      description = 'You agree to our Terms of Service and Privacy Policy.',
      descriptionVisible = true,
      checked,
      defaultChecked,
      disabled = false,
      id: idProp,
      sx,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    // Uncontrolled cards still have to paint the selected surface, so fall back to
    // defaultChecked when no controlled value is given.
    const isChecked = checked ?? defaultChecked ?? false;

    return (
      <Box
        component="label"
        htmlFor={inputId}
        sx={{ ...getCardSx(Boolean(isChecked), color, Boolean(disabled)), ...sx }}
      >
        <Box sx={getControlSlotSx()}>
          <CrvCheckboxBase
            ref={ref}
            id={inputId}
            color={color}
            checked={checked}
            defaultChecked={defaultChecked}
            disabled={disabled}
            sx={getAnchoredControlSx()}
            {...rest}
          />
        </Box>

        {(labelVisible || descriptionVisible) && (
          <Box
            sx={{
              display:       'flex',
              flexDirection: 'column',
              gap:           `${spacing.sm}px`,
              flex:          1,
              minWidth:      0,
            }}
          >
            {labelVisible && (
              <Typography
                component="span"
                sx={{ ...labelSx, color: getCardLabelColor(color, Boolean(disabled)) }}
              >
                {label}
              </Typography>
            )}

            {descriptionVisible && (
              <Typography
                component="span"
                sx={{ ...descriptionSx, color: getCardDescriptionColor(Boolean(disabled)) }}
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
