'use client';

import { useId } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import Typography from '@mui/material/Typography';
import { colors, spacing, typography } from '../../tokens';
import { CrvInputOtpBase } from '../CrvInputOtpBase';
import type { CrvInputOtpProps } from './CrvInputOtp.types';
import { useOtpInput } from './useOtpInput';

// Ground truth from Figma (crv-input-otp-standard, node 4315:1164)
export function CrvInputOtp({
  length = 6,
  label = 'Label',
  labelVisible = true,
  helperText = 'Please enter the one-time password sent to your phone.',
  helperTextVisible = true,
  error = false,
  errorMessage = 'Your one-time password must be 6 characters.',
  disabled = false,
  value,
  defaultValue = '',
  onChange,
  onComplete,
  name,
  id: idProp,
  className,
  sx,
}: CrvInputOtpProps) {
  const generatedId = useId();
  const fieldId = idProp ?? generatedId;
  const labelId = `${fieldId}-label`;
  const helperId = `${fieldId}-helper`;

  const {
    slotCount,
    digits,
    inputRefs,
    handleSlotChange,
    handleSlotKeyDown,
    handlePaste,
  } = useOtpInput({
    length,
    value,
    defaultValue,
    disabled,
    onChange,
    onComplete,
  });

  const showHelper = error
    ? Boolean(errorMessage)
    : helperTextVisible && Boolean(helperText);
  const helperContent = error ? errorMessage : helperText;

  return (
    <FormControl
      fullWidth
      disabled={disabled}
      error={error}
      className={className}
      sx={{
        gap: `${spacing.md}px`,
        ...sx,
      }}
    >
      {labelVisible && label && (
        <Typography
          id={labelId}
          component="label"
          htmlFor={`${fieldId}-slot-0`}
          sx={{
            fontFamily: typography.fontFamily.sans,
            fontSize:   `${typography.fontSize.label.medium}px`,
            lineHeight: `${typography.lineHeight.label.medium}px`,
            fontWeight: typography.fontWeight.medium,
            color:      disabled
              ? colors.content.disabled
              : colors.content.primary,
          }}
        >
          {label}
        </Typography>
      )}

      <Box
        role="group"
        aria-labelledby={labelVisible ? labelId : undefined}
        aria-describedby={showHelper ? helperId : undefined}
        sx={{
          display: 'flex',
          gap:     `${spacing.md}px`,
        }}
      >
        {digits.map((digit, index) => (
          <CrvInputOtpBase
            key={index}
            ref={(node) => {
              inputRefs.current[index] = node;
            }}
            id={`${fieldId}-slot-${index}`}
            name={name}
            value={digit}
            disabled={disabled}
            aria-label={`Digit ${index + 1} of ${slotCount}`}
            onChange={(event) => handleSlotChange(index, event.target.value)}
            onKeyDown={(event) => handleSlotKeyDown(index, event)}
            onPaste={(event) => handlePaste(index, event)}
            onFocus={(event) => event.currentTarget.select()}
          />
        ))}
      </Box>

      {showHelper && helperContent && (
        <FormHelperText
          id={helperId}
          sx={{
            margin:     0,
            fontFamily: typography.fontFamily.sans,
            fontSize:   `${typography.fontSize.body.medium}px`,
            lineHeight: `${typography.lineHeight.body.medium}px`,
            fontWeight: typography.fontWeight.regular,
            color:      error
              ? colors.status.error.content.default
              : disabled
                ? colors.content.disabled
                : colors.content.secondary,
          }}
        >
          {helperContent}
        </FormHelperText>
      )}
    </FormControl>
  );
}
