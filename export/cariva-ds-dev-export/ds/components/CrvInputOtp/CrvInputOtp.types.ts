import type { SxProps, Theme } from '@mui/material/styles';

export interface CrvInputOtpProps {
  /** Number of OTP slots — Figma default is 6 (min 4, max 8) */
  length?: number;
  /** Figma `label` */
  label?: string;
  labelVisible?: boolean;
  /** Figma `helperText` */
  helperText?: string;
  helperTextVisible?: boolean;
  /** Figma `state=error` */
  error?: boolean;
  /** Figma `errorMessage` */
  errorMessage?: string;
  disabled?: boolean;
  value?: string;
  defaultValue?: string;
  onChange?: (value: string) => void;
  onComplete?: (value: string) => void;
  name?: string;
  id?: string;
  className?: string;
  sx?: SxProps<Theme>;
}
