'use client';

import { forwardRef, useId } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { colors, spacing, typography, productStyle, defaultProductStyle } from '../../tokens';
import type { CrvInputProps, CrvInputSize } from './CrvInput.types';

// Ground truth from Figma (crv-input-standard, node 3760:6623)
const FIELD_MIN_HEIGHT: Record<CrvInputSize, number> = {
  medium: 48,
  small:  38,
};

const FIELD_PADDING_V: Record<CrvInputSize, number> = {
  medium: spacing.md,
  small:  spacing.sm,
};

const LABEL_FONT_SIZE: Record<CrvInputSize, number> = {
  medium: typography.fontSize.label.medium,
  small:  typography.fontSize.label.small,
};

const LABEL_LINE_HEIGHT: Record<CrvInputSize, number> = {
  medium: typography.lineHeight.label.medium,
  small:  typography.lineHeight.label.small,
};

const INPUT_FONT_SIZE: Record<CrvInputSize, number> = {
  medium: typography.fontSize.body.large,
  small:  typography.fontSize.body.medium,
};

const INPUT_LINE_HEIGHT: Record<CrvInputSize, number> = {
  medium: typography.lineHeight.body.large,
  small:  typography.lineHeight.body.medium,
};

const HELPER_FONT_SIZE: Record<CrvInputSize, number> = {
  medium: typography.fontSize.body.medium,
  small:  typography.fontSize.body.small,
};

const HELPER_LINE_HEIGHT: Record<CrvInputSize, number> = {
  medium: typography.lineHeight.body.medium,
  small:  typography.lineHeight.body.small,
};

const INPUT_RADIUS: Record<CrvInputSize, number> = {
  medium: productStyle[defaultProductStyle].inputMd,
  small:  productStyle[defaultProductStyle].inputSm,
};

export const CrvInput = forwardRef<HTMLInputElement, CrvInputProps>(
  function CrvInput(
    {
      size = 'medium',
      label,
      labelVisible = true,
      secondaryLabel,
      secondaryLabelVisible = false,
      helperText,
      helperTextVisible = false,
      error = false,
      errorMessage,
      startAdornment,
      startAdornmentVisible,
      disabled = false,
      placeholder,
      id: idProp,
      sx,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const showSecondaryLabel = secondaryLabelVisible && Boolean(secondaryLabel);
    const showHelper = error
      ? Boolean(errorMessage)
      : helperTextVisible && Boolean(helperText);
    const helperContent = error ? errorMessage : helperText;
    const showStartAdornment =
      startAdornmentVisible ?? Boolean(startAdornment);

    return (
      <FormControl
        fullWidth
        disabled={disabled}
        error={error}
        sx={{ gap: `${spacing.xs}px` }}
      >
        {labelVisible && label && (
          <Box
            component="label"
            htmlFor={inputId}
            sx={{
              display:    'flex',
              alignItems: 'baseline',
              gap:        `${spacing.md}px`,
              cursor:     disabled ? 'default' : 'text',
            }}
          >
            <Typography
              component="span"
              sx={{
                flex:       1,
                fontFamily: typography.fontFamily.sans,
                fontSize:   `${LABEL_FONT_SIZE[size]}px`,
                lineHeight: `${LABEL_LINE_HEIGHT[size]}px`,
                fontWeight: typography.fontWeight.medium,
                color:      colors.content.primary,
              }}
            >
              {label}
            </Typography>
            {showSecondaryLabel && (
              <Typography
                component="span"
                sx={{
                  flexShrink: 0,
                  fontFamily: typography.fontFamily.sans,
                  fontSize:   `${LABEL_FONT_SIZE[size]}px`,
                  lineHeight: `${LABEL_LINE_HEIGHT[size]}px`,
                  fontWeight: typography.fontWeight.medium,
                  color:      colors.content.secondary,
                }}
              >
                {secondaryLabel}
              </Typography>
            )}
          </Box>
        )}

        <OutlinedInput
          inputRef={ref}
          id={inputId}
          disabled={disabled}
          error={error}
          placeholder={placeholder}
          startAdornment={
            showStartAdornment && startAdornment ? (
              <InputAdornment position="start">{startAdornment}</InputAdornment>
            ) : undefined
          }
          sx={{
            minHeight:       FIELD_MIN_HEIGHT[size],
            borderRadius:    `${INPUT_RADIUS[size]}px`,
            backgroundColor: disabled
              ? colors.onSurface.action.disabled
              : colors.onSurface.default,
            gap:             `${spacing.sm}px`,
            paddingTop:      `${FIELD_PADDING_V[size]}px`,
            paddingBottom:   `${FIELD_PADDING_V[size]}px`,
            paddingLeft:     `${spacing.lg}px`,
            paddingRight:    `${spacing.lg}px`,
            fontFamily:      typography.fontFamily.sans,
            fontSize:        `${INPUT_FONT_SIZE[size]}px`,
            lineHeight:      `${INPUT_LINE_HEIGHT[size]}px`,
            fontWeight:      typography.fontWeight.regular,
            color:           disabled ? colors.content.disabled : colors.content.primary,
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.border.default,
              borderWidth: 1,
            },
            '&:hover .MuiOutlinedInput-notchedOutline': {
              borderColor: disabled ? colors.border.disabled : colors.border.strong,
            },
            '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.border.system,
              borderWidth: 2,
            },
            '&.Mui-error .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.border.error,
              borderWidth: 2,
            },
            '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
              borderColor: colors.border.disabled,
            },
            '& .MuiOutlinedInput-input': {
              padding: 0,
            },
            '& .MuiInputAdornment-root': {
              margin: 0,
              color:  disabled ? colors.content.disabled : colors.content.primary,
            },
            '& input::placeholder': {
              color:   colors.content.placeholder,
              opacity: 1,
            },
            '& input:disabled::placeholder': {
              color: colors.content.disabled,
            },
            ...sx,
          }}
          {...rest}
        />

        {showHelper && helperContent && (
          <FormHelperText
            sx={{
              margin:     0,
              fontFamily: typography.fontFamily.sans,
              fontSize:   `${HELPER_FONT_SIZE[size]}px`,
              lineHeight: `${HELPER_LINE_HEIGHT[size]}px`,
              fontWeight: typography.fontWeight.regular,
              color:      error
                ? colors.status.error.content.default
                : colors.content.secondary,
            }}
          >
            {helperContent}
          </FormHelperText>
        )}
      </FormControl>
    );
  },
);
