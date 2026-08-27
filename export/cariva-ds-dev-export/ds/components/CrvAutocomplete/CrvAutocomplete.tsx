'use client';

import { forwardRef, useId } from 'react';
import Autocomplete from '@mui/material/Autocomplete';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { CrvMenuItem } from '../CrvMenuItem';
import { crvMenuPaperSx } from '../CrvMenuItem/crvMenuListStyles';
import { colors, spacing, typography, productStyle, defaultProductStyle } from '../../tokens';
import type {
  CrvAutocompleteOption,
  CrvAutocompleteProps,
  CrvAutocompleteSize,
} from './CrvAutocomplete.types';

// Ground truth from Figma (crv-autocomplete, node 4454:12745)
const FIELD_MIN_HEIGHT: Record<CrvAutocompleteSize, number> = {
  medium: 48,
  small:  36,
};

const FIELD_PADDING_V: Record<CrvAutocompleteSize, number> = {
  medium: spacing.md,
  small:  spacing.sm,
};

const LABEL_FONT_SIZE: Record<CrvAutocompleteSize, number> = {
  medium: typography.fontSize.label.medium,
  small:  typography.fontSize.label.small,
};

const LABEL_LINE_HEIGHT: Record<CrvAutocompleteSize, number> = {
  medium: typography.lineHeight.label.medium,
  small:  typography.lineHeight.label.small,
};

const INPUT_FONT_SIZE: Record<CrvAutocompleteSize, number> = {
  medium: typography.fontSize.body.medium,
  small:  typography.fontSize.body.small,
};

const INPUT_LINE_HEIGHT: Record<CrvAutocompleteSize, number> = {
  medium: typography.lineHeight.body.medium,
  small:  typography.lineHeight.body.small,
};

const HELPER_FONT_SIZE = typography.fontSize.body.small;
const HELPER_LINE_HEIGHT = typography.lineHeight.body.small;

const FIELD_RADIUS: Record<CrvAutocompleteSize, number> = {
  medium: productStyle[defaultProductStyle].inputMd,
  small:  productStyle[defaultProductStyle].inputSm,
};

const POPUP_ICON_SIZE = 24;
const POPUP_BUTTON_SIZE = 32;

function fieldSx(size: CrvAutocompleteSize, disabled: boolean, hasValue: boolean) {
  return {
    '& .MuiOutlinedInput-root': {
      position:        'relative',
      alignItems:      'center',
      minHeight:       FIELD_MIN_HEIGHT[size],
      paddingTop:      `${FIELD_PADDING_V[size]}px`,
      paddingBottom:   `${FIELD_PADDING_V[size]}px`,
      paddingLeft:     `${spacing.lg}px`,
      paddingRight:    `${spacing.lg}px`,
      borderRadius:    `${FIELD_RADIUS[size]}px`,
      backgroundColor: disabled
        ? colors.onSurface.action.disabled
        : colors.onSurface.default,
      fontFamily:      typography.fontFamily.sans,
      fontSize:        `${INPUT_FONT_SIZE[size]}px`,
      lineHeight:      `${INPUT_LINE_HEIGHT[size]}px`,
      fontWeight:      typography.fontWeight.regular,
      color:           disabled
        ? colors.content.disabled
        : hasValue
          ? colors.content.primary
          : colors.content.placeholder,
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
      '& .MuiAutocomplete-input': {
        padding: '0 !important',
        paddingRight: `${spacing.sm + POPUP_BUTTON_SIZE}px !important`,
      },
      '& input::placeholder': {
        color:   colors.content.placeholder,
        opacity: 1,
      },
      // Figma: crv-button-icon 32×32 + chevron-down (content/secondary)
      '& .MuiAutocomplete-endAdornment': {
        position:   'absolute',
        right:      `${spacing.lg}px`,
        top:        '50%',
        transform:  'translateY(-50%)',
        display:    'flex',
        alignItems: 'center',
        height:     POPUP_BUTTON_SIZE,
        m:          0,
      },
      '& .MuiAutocomplete-popupIndicator': {
        display:         'flex',
        alignItems:      'center',
        justifyContent:  'center',
        width:           POPUP_BUTTON_SIZE,
        height:          POPUP_BUTTON_SIZE,
        p:               0,
        mr:              0,
        transform:       'none',
        color:           `${colors.content.secondary} !important`,
        borderRadius:    `${productStyle[defaultProductStyle].interactive}px`,
        '&:hover': {
          backgroundColor: colors.onSurface.action.hover,
        },
        '& .MuiSvgIcon-root': {
          fontSize: POPUP_ICON_SIZE,
          width:    POPUP_ICON_SIZE,
          height:   POPUP_ICON_SIZE,
        },
        '&.MuiAutocomplete-popupIndicatorOpen': {
          transform: 'rotate(180deg)',
        },
      },
    },
  };
}

export const CrvAutocomplete = forwardRef<HTMLDivElement, CrvAutocompleteProps>(
  function CrvAutocomplete(
    {
      size = 'medium',
      label,
      placeholder = 'Search or select...',
      options,
      helperText,
      helperTextVisible = false,
      error = false,
      errorMessage,
      errorMessageVisible = true,
      disabled = false,
      value = null,
      id: idProp,
      sx,
      slotProps,
      noOptionsText = 'ไม่พบรายการที่ค้นหา',
      ...rest
    },
    ref,
  ) {
    const generatedId = useId();
    const inputId = idProp ?? generatedId;
    const hasValue = value !== null && value !== undefined;

    const showHelper =
      !error && helperTextVisible && Boolean(helperText);
    const showError =
      error && errorMessageVisible && Boolean(errorMessage);
    const helperContent = showError ? errorMessage : helperText;

    return (
      <FormControl
        fullWidth
        disabled={disabled}
        error={error}
        sx={{ gap: `${spacing.xs}px`, ...sx }}
      >
        {label && (
          <Typography
            component="label"
            htmlFor={inputId}
            sx={{
              fontFamily: typography.fontFamily.sans,
              fontSize:   `${LABEL_FONT_SIZE[size]}px`,
              lineHeight: `${LABEL_LINE_HEIGHT[size]}px`,
              fontWeight: typography.fontWeight.medium,
              color:      colors.content.primary,
              cursor:     disabled ? 'default' : 'text',
            }}
          >
            {label}
          </Typography>
        )}

        <Autocomplete
          ref={ref}
          id={inputId}
          disabled={disabled}
          options={options}
          value={value}
          getOptionLabel={(option) => option.label}
          isOptionEqualToValue={(option, selected) => option.value === selected.value}
          noOptionsText={noOptionsText}
          renderOption={(props, option, { selected }) => {
            const { key, ...optionProps } = props;
            return (
              <CrvMenuItem
                key={key}
                {...optionProps}
                selected={selected}
                leftIconVisible={false}
                rightIconVisible={false}
              >
                {option.label}
              </CrvMenuItem>
            );
          }}
          popupIcon={
            <KeyboardArrowDownIcon />
          }
          slotProps={{
            ...slotProps,
            popper: {
              ...slotProps?.popper,
              sx: {
                mt: `${spacing.xs}px`,
                ...(typeof slotProps?.popper === 'object'
                  && slotProps.popper !== null
                  && 'sx' in slotProps.popper
                  ? slotProps.popper.sx
                  : {}),
              },
            },
            paper: {
              elevation: 0,
              ...slotProps?.paper,
              sx: {
                ...crvMenuPaperSx,
                ...(typeof slotProps?.paper === 'object'
                  && slotProps.paper !== null
                  && 'sx' in slotProps.paper
                  ? slotProps.paper.sx
                  : {}),
              },
            },
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              id={inputId}
              placeholder={placeholder}
              error={error}
              sx={fieldSx(size, disabled, hasValue)}
            />
          )}
          {...rest}
        />

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
