'use client';

import { forwardRef, useId } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import { colors, spacing, typography, radius } from '../../tokens';
import type { CrvTextAreaProps, CrvTextAreaSize } from './CrvTextArea.types';

// Ground truth from Figma (crv-text-area-standard, node 4164:1571)
const FIELD_MIN_HEIGHT: Record<CrvTextAreaSize, number> = {
  medium: 120,
  small:  104,
};

const FIELD_PADDING_V: Record<CrvTextAreaSize, number> = {
  medium: spacing.md,
  small:  spacing.sm,
};

const FIELD_PADDING_H: Record<CrvTextAreaSize, number> = {
  medium: spacing.md,
  small:  spacing.md,
};

const FIELD_RADIUS: Record<CrvTextAreaSize, number> = {
  medium: radius['12'],
  small:  radius['8'],
};

const DEFAULT_MIN_ROWS: Record<CrvTextAreaSize, number> = {
  medium: 4,
  small:  4,
};

const LABEL_FONT_SIZE: Record<CrvTextAreaSize, number> = {
  medium: typography.fontSize.label.medium,
  small:  typography.fontSize.label.small,
};

const LABEL_LINE_HEIGHT: Record<CrvTextAreaSize, number> = {
  medium: typography.lineHeight.label.medium,
  small:  typography.lineHeight.label.small,
};

const INPUT_FONT_SIZE: Record<CrvTextAreaSize, number> = {
  medium: typography.fontSize.body.large,
  small:  typography.fontSize.body.medium,
};

const INPUT_LINE_HEIGHT: Record<CrvTextAreaSize, number> = {
  medium: typography.lineHeight.body.large,
  small:  typography.lineHeight.body.medium,
};

const HELPER_FONT_SIZE: Record<CrvTextAreaSize, number> = {
  medium: typography.fontSize.body.medium,
  small:  typography.fontSize.body.small,
};

const HELPER_LINE_HEIGHT: Record<CrvTextAreaSize, number> = {
  medium: typography.lineHeight.body.medium,
  small:  typography.lineHeight.body.small,
};

export const CrvTextArea = forwardRef<HTMLTextAreaElement, CrvTextAreaProps>(
  function CrvTextArea(
    {
      size = 'medium',
      label,
      secondaryLabel,
      secondaryLabelVisible = false,
      helperText,
      helperTextVisible = false,
      error = false,
      errorMessage,
      minRows,
      maxRows,
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
    const resolvedMinRows = minRows ?? DEFAULT_MIN_ROWS[size];

    return (
      <FormControl
        fullWidth
        disabled={disabled}
        error={error}
        sx={{ gap: `${spacing.md}px` }}
      >
        {label && (
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
          multiline
          minRows={resolvedMinRows}
          maxRows={maxRows}
          disabled={disabled}
          error={error}
          placeholder={placeholder}
          sx={{
            alignItems:      'flex-start',
            minHeight:       FIELD_MIN_HEIGHT[size],
            borderRadius:    `${FIELD_RADIUS[size]}px`,
            backgroundColor: disabled
              ? colors.onSurface.action.disabled
              : colors.onSurface.default,
            paddingTop:      `${FIELD_PADDING_V[size]}px`,
            paddingBottom:   `${FIELD_PADDING_V[size]}px`,
            paddingLeft:     `${FIELD_PADDING_H[size]}px`,
            paddingRight:    `${FIELD_PADDING_H[size]}px`,
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
            '& textarea': {
              padding:  0,
              resize:   maxRows ? 'none' : 'vertical',
              overflow: maxRows ? 'auto' : undefined,
            },
            '& textarea::placeholder': {
              color:   colors.content.placeholder,
              opacity: 1,
            },
            '& textarea:disabled::placeholder': {
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
