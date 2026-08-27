'use client';

import { forwardRef, useId } from 'react';
import Box from '@mui/material/Box';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import InputAdornment from '@mui/material/InputAdornment';
import OutlinedInput from '@mui/material/OutlinedInput';
import Typography from '@mui/material/Typography';
import {
  getCrvInputFormControlSx,
  getCrvInputHelperSx,
  getCrvInputLabelRowSx,
  getCrvInputLabelSx,
  getCrvInputOutlinedSx,
  getCrvInputSecondaryLabelSx,
} from '../../theme/components/crvInput';
import type { CrvInputProps } from './CrvInput.types';

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
        sx={getCrvInputFormControlSx()}
      >
        {labelVisible && label && (
          <Box
            component="label"
            htmlFor={inputId}
            sx={getCrvInputLabelRowSx(disabled)}
          >
            <Typography component="span" sx={getCrvInputLabelSx(size)}>
              {label}
            </Typography>
            {showSecondaryLabel && (
              <Typography component="span" sx={getCrvInputSecondaryLabelSx(size)}>
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
          sx={[getCrvInputOutlinedSx(size, disabled), ...(Array.isArray(sx) ? sx : sx ? [sx] : [])]}
          {...rest}
        />

        {showHelper && helperContent && (
          <FormHelperText sx={getCrvInputHelperSx(size, error)}>
            {helperContent}
          </FormHelperText>
        )}
      </FormControl>
    );
  },
);
