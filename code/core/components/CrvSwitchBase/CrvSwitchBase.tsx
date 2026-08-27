'use client';

import {
  forwardRef,
  useCallback,
  useState,
  type ChangeEvent,
  type MouseEvent,
} from 'react';
import Box from '@mui/material/Box';
import type { SxProps, Theme } from '@mui/material/styles';
import { colors } from '../../tokens';
import { getSwitchBaseSx, SWITCH_THUMB_SHADOW } from './crvSwitchStyles';
import type { CrvSwitchBaseProps } from './CrvSwitchBase.types';
import type { CrvSwitchBaseSize } from './crvSwitchStyles';

const METRICS: Record<
  CrvSwitchBaseSize,
  { thumb: number; padding: number; translate: number }
> = {
  medium: { thumb: 20, padding: 2, translate: 20 },
  small:  { thumb: 16, padding: 2, translate: 16 },
};

function getThumbSx(size: CrvSwitchBaseSize, checked: boolean) {
  const { thumb, padding, translate } = METRICS[size];

  return {
    position:        'absolute' as const,
    top:             padding,
    left:            checked ? padding + translate : padding,
    width:           thumb,
    height:          thumb,
    borderRadius:    '50%',
    backgroundColor: colors.content.onBrand,
    boxShadow:       SWITCH_THUMB_SHADOW,
    transition:      'left 120ms ease',
    pointerEvents:   'none' as const,
  };
}

// Ground truth from Figma (crv-switch-base, node 3875:1752)
export const CrvSwitchBase = forwardRef<HTMLButtonElement, CrvSwitchBaseProps>(
  function CrvSwitchBase(
    {
      size = 'medium',
      checked: checkedProp,
      defaultChecked = false,
      disabled = false,
      onChange,
      inputProps,
      sx,
      onClick,
      ...rest
    },
    ref,
  ) {
    const [uncontrolledChecked, setUncontrolledChecked] = useState(defaultChecked);
    const isControlled = checkedProp !== undefined;
    const checked = isControlled ? checkedProp : uncontrolledChecked;
    const ariaLabel = inputProps?.['aria-label'];

    const handleClick = useCallback(
      (event: MouseEvent<HTMLButtonElement>) => {
        onClick?.(event);
        if (disabled) return;

        const nextChecked = !checked;
        if (!isControlled) {
          setUncontrolledChecked(nextChecked);
        }

        onChange?.(
          event as unknown as ChangeEvent<HTMLInputElement>,
          nextChecked,
        );
      },
      [checked, disabled, isControlled, onChange, onClick],
    );

    return (
      <Box
        component="button"
        ref={ref}
        type="button"
        role="switch"
        aria-checked={checked}
        aria-label={ariaLabel}
        disabled={disabled}
        onClick={handleClick}
        sx={
          [
            getSwitchBaseSx(size, checked, disabled),
            sx,
          ] as SxProps<Theme>
        }
        {...rest}
      >
        <Box component="span" aria-hidden sx={getThumbSx(size, checked)} />
      </Box>
    );
  },
);
