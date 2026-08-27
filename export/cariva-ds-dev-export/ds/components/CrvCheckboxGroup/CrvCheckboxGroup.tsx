'use client';

import { useId, useState } from 'react';
import Box from '@mui/material/Box';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import { colors, spacing, typography } from '../../tokens';
import { CrvCheckbox } from '../CrvCheckbox';
import { getLabelColor } from '../CrvCheckboxBase/crvCheckboxStyles';
import { DEFAULT_CHECKBOX_GROUP_OPTIONS } from './crvCheckboxGroupDefaults';
import type { CrvCheckboxGroupProps } from './CrvCheckboxGroup.types';

function toggleValue(current: string[], optionValue: string, checked: boolean) {
  if (checked) return [...current, optionValue];
  return current.filter((item) => item !== optionValue);
}

// Ground truth from Figma (crv-checkbox-group, node 3815:5374)
export function CrvCheckboxGroup({
  color = 'primary',
  disabled = false,
  label = 'Sidebar',
  labelVisible = true,
  description = 'Select the items you want to display in the sidebar.',
  descriptionVisible = true,
  errorMessage = 'Your one-time password must be 6 characters.',
  errorMessageVisible = true,
  options = DEFAULT_CHECKBOX_GROUP_OPTIONS,
  value: valueProp,
  defaultValue = [],
  onChange,
  name,
  className,
  sx,
}: CrvCheckboxGroupProps) {
  const labelId = useId();
  const [uncontrolledValue, setUncontrolledValue] = useState(defaultValue);
  const value = valueProp ?? uncontrolledValue;
  const isDisabled = Boolean(disabled);
  const headerColor = getLabelColor(color, isDisabled);
  const descriptionColor = isDisabled
    ? colors.content.disabled
    : colors.content.secondary;
  const visibleOptions = options.filter((option) => option.visible !== false);
  const showErrorMessage =
    color === 'error' && errorMessageVisible && Boolean(errorMessage);

  const handleChange = (optionValue: string, checked: boolean) => {
    const nextValue = toggleValue(value, optionValue, checked);
    if (valueProp === undefined) setUncontrolledValue(nextValue);
    onChange?.(nextValue);
  };

  return (
    <Box
      role="group"
      aria-labelledby={labelVisible ? labelId : undefined}
      className={className}
      sx={{
        display:       'flex',
        flexDirection: 'column',
        gap:           `${spacing.md}px`,
        ...sx,
      }}
    >
      {(labelVisible || descriptionVisible) && (
        <Box
          sx={{
            display:       'flex',
            flexDirection: 'column',
            gap:           `${spacing.sm}px`,
          }}
        >
          {labelVisible && (
            <Typography
              id={labelId}
              component="span"
              sx={{
                fontFamily: typography.fontFamily.sans,
                fontSize:   `${typography.fontSize.label.medium}px`,
                lineHeight: `${typography.lineHeight.label.medium}px`,
                fontWeight: typography.fontWeight.medium,
                color:      headerColor,
              }}
            >
              {label}
            </Typography>
          )}

          {descriptionVisible && (
            <Typography
              component="span"
              sx={{
                fontFamily: typography.fontFamily.sans,
                fontSize:   `${typography.fontSize.body.medium}px`,
                lineHeight: `${typography.lineHeight.body.medium}px`,
                fontWeight: typography.fontWeight.regular,
                color:      descriptionColor,
              }}
            >
              {description}
            </Typography>
          )}
        </Box>
      )}

      <Box
        sx={{
          display:       'flex',
          flexDirection: 'column',
          gap:           `${spacing.md}px`,
          pt:            `${spacing.md}px`,
        }}
      >
        {visibleOptions.map((option) => (
          <CrvCheckbox
            key={option.value}
            type="groupItem"
            color={color}
            label={option.label}
            labelVisible
            descriptionVisible={false}
            checked={value.includes(option.value)}
            disabled={isDisabled || Boolean(option.disabled)}
            name={name}
            value={option.value}
            onChange={(event, checked) =>
              handleChange(option.value, checked)
            }
          />
        ))}
      </Box>

      {showErrorMessage && (
        <FormHelperText
          sx={{
            margin:     0,
            fontFamily: typography.fontFamily.sans,
            fontSize:   `${typography.fontSize.body.medium}px`,
            lineHeight: `${typography.lineHeight.body.medium}px`,
            fontWeight: typography.fontWeight.regular,
            color:      colors.status.error.content.default,
          }}
        >
          {errorMessage}
        </FormHelperText>
      )}
    </Box>
  );
}
