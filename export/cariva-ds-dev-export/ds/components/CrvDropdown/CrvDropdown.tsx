'use client';

import { forwardRef, useId } from 'react';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import OutlinedInput from '@mui/material/OutlinedInput';
import Select from '@mui/material/Select';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CrvMenuItem } from '../CrvMenuItem';
import { crvMenuPaperSx } from '../CrvMenuItem/crvMenuListStyles';
import { colors, spacing, typography, productStyle, defaultProductStyle } from '../../tokens';
import type { CrvDropdownProps, CrvDropdownSize } from './CrvDropdown.types';

// Ground truth from Figma (crv-dropdown, node 3875:3909)
const FIELD_MIN_HEIGHT: Record<CrvDropdownSize, number> = {
  medium: 48,
  small:  38,
};

const FIELD_PADDING_V: Record<CrvDropdownSize, number> = {
  medium: spacing.md,
  small:  spacing.sm,
};

const LABEL_FONT_SIZE: Record<CrvDropdownSize, number> = {
  medium: typography.fontSize.label.medium,
  small:  typography.fontSize.label.small,
};

const LABEL_LINE_HEIGHT: Record<CrvDropdownSize, number> = {
  medium: typography.lineHeight.label.medium,
  small:  typography.lineHeight.label.small,
};

const CONTENT_FONT_SIZE: Record<CrvDropdownSize, number> = {
  medium: typography.fontSize.body.large,
  small:  typography.fontSize.body.medium,
};

const CONTENT_LINE_HEIGHT: Record<CrvDropdownSize, number> = {
  medium: typography.lineHeight.body.large,
  small:  typography.lineHeight.body.medium,
};

const HELPER_FONT_SIZE = typography.fontSize.body.small;
const HELPER_LINE_HEIGHT = typography.lineHeight.body.small;

const FIELD_RADIUS: Record<CrvDropdownSize, number> = {
  medium: productStyle[defaultProductStyle].inputMd,
  small:  productStyle[defaultProductStyle].inputSm,
};

// Figma chevron-down instance: 24×24, color/content/secondary
const CHEVRON_SIZE = 24;
const FIELD_INNER_GAP = spacing.lg;

export const CrvDropdown = forwardRef<HTMLDivElement, CrvDropdownProps>(
  function CrvDropdown(
    {
      size = 'medium',
      label,
      labelVisible = true,
      placeholder = 'Select...',
      options,
      helperText,
      helperTextVisible = false,
      error = false,
      errorMessage,
      errorMessageVisible = true,
      disabled = false,
      value = '',
      id: idProp,
      sx,
      MenuProps,
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const selectId = idProp ?? generatedId;
    const hasValue = value !== '' && value !== undefined;

    const showHelper =
      !error && helperTextVisible && Boolean(helperText);
    const showError =
      error && errorMessageVisible && Boolean(errorMessage);
    const helperContent = showError ? errorMessage : helperText;
    const fieldRadius = FIELD_RADIUS[size];

    return (
      <FormControl
        fullWidth
        disabled={disabled}
        error={error}
        sx={{ gap: `${spacing.md}px`, ...sx }}
      >
        {labelVisible && label && (
          <Typography
            component="label"
            htmlFor={selectId}
            sx={{
              fontFamily: typography.fontFamily.sans,
              fontSize:   `${LABEL_FONT_SIZE[size]}px`,
              lineHeight: `${LABEL_LINE_HEIGHT[size]}px`,
              fontWeight: typography.fontWeight.medium,
              color:      colors.content.primary,
              cursor:     disabled ? 'default' : 'pointer',
            }}
          >
            {label}
          </Typography>
        )}

        <Select
          ref={ref}
          id={selectId}
          value={value}
          disabled={disabled}
          error={error}
          displayEmpty
          input={
            <OutlinedInput
              notched={false}
              sx={{
                overflow:        'hidden',
                minHeight:       FIELD_MIN_HEIGHT[size],
                borderRadius:    `${fieldRadius}px`,
                backgroundColor: disabled
                  ? colors.onSurface.action.disabled
                  : colors.onSurface.default,
                paddingTop:      `${FIELD_PADDING_V[size]}px`,
                paddingBottom:   `${FIELD_PADDING_V[size]}px`,
                paddingLeft:     `${spacing.lg}px`,
                paddingRight:    `${spacing.lg}px`,
                fontFamily:      typography.fontFamily.sans,
                fontSize:        `${CONTENT_FONT_SIZE[size]}px`,
                lineHeight:      `${CONTENT_LINE_HEIGHT[size]}px`,
                fontWeight:      typography.fontWeight.regular,
                color:           disabled
                  ? colors.content.disabled
                  : hasValue
                    ? colors.content.primary
                    : colors.content.placeholder,
                '& .MuiOutlinedInput-notchedOutline': {
                  borderColor:  colors.border.default,
                  borderWidth:  1,
                  borderRadius: `${fieldRadius}px`,
                },
                '&:hover .MuiOutlinedInput-notchedOutline': {
                  borderColor:  disabled ? colors.border.disabled : colors.border.strong,
                  borderRadius: `${fieldRadius}px`,
                },
                '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                  borderColor:  colors.border.system,
                  borderWidth:  2,
                  borderRadius: `${fieldRadius}px`,
                },
                '&.Mui-error .MuiOutlinedInput-notchedOutline': {
                  borderColor:  colors.border.error,
                  borderWidth:  2,
                  borderRadius: `${fieldRadius}px`,
                },
                '&.Mui-disabled .MuiOutlinedInput-notchedOutline': {
                  borderColor:  colors.border.disabled,
                  borderRadius: `${fieldRadius}px`,
                },
                '& legend': {
                  display: 'none',
                  width:   0,
                },
                '& .MuiSelect-select': {
                  padding: 0,
                  // Reserve gap + chevron so text does not overlap icon (Figma Field gap=16)
                  paddingRight: `${FIELD_INNER_GAP + CHEVRON_SIZE}px !important`,
                  display: 'flex',
                  alignItems: 'center',
                  minHeight: 'unset',
                },
              }}
            />
          }
          IconComponent={KeyboardArrowDownIcon}
          renderValue={(selected) => {
            if (!selected) {
              return placeholder;
            }
            return options.find((opt) => opt.value === selected)?.label ?? selected;
          }}
          sx={{
            borderRadius: `${fieldRadius}px`,
            overflow:     'hidden',
            '& .MuiSelect-icon': {
              color:      disabled ? colors.content.disabled : colors.content.secondary,
              fontSize:   CHEVRON_SIZE,
              width:      CHEVRON_SIZE,
              height:     CHEVRON_SIZE,
              right:      spacing.lg,
              top:        '50%',
              transform:  'translateY(-50%)',
            },
          }}
          MenuProps={{
            disableScrollLock: true,
            ...MenuProps,
            slotProps: {
              ...MenuProps?.slotProps,
              backdrop: {
                invisible: true,
                sx: { backgroundColor: 'transparent' },
                ...(typeof MenuProps?.slotProps?.backdrop === 'object'
                  ? MenuProps.slotProps.backdrop
                  : {}),
              },
              paper: {
                elevation: 0,
                ...(typeof MenuProps?.slotProps?.paper === 'object'
                  ? MenuProps.slotProps.paper
                  : {}),
                sx: {
                  ...crvMenuPaperSx,
                  ...(typeof MenuProps?.slotProps?.paper === 'object'
                    && MenuProps.slotProps.paper !== null
                    && 'sx' in MenuProps.slotProps.paper
                    ? MenuProps.slotProps.paper.sx
                    : {}),
                },
              },
            },
          }}
          {...rest}
        >
          {options.map((option) => (
            <CrvMenuItem
              key={option.value}
              value={option.value}
              leftIconVisible={false}
              rightIconVisible={false}
            >
              {option.label}
            </CrvMenuItem>
          ))}
        </Select>

        {(showHelper || showError) && helperContent && (
          <FormHelperText
            sx={{
              margin:     0,
              fontFamily: typography.fontFamily.sans,
              fontSize:   `${HELPER_FONT_SIZE}px`,
              lineHeight: `${HELPER_LINE_HEIGHT}px`,
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
