import type { ChangeEvent, DragEvent, HTMLAttributes, ReactNode } from 'react';

export type CrvFileUploadState = 'default' | 'hover' | 'dragging' | 'error' | 'disabled';
export type CrvFileUploadItemState = 'idle' | 'uploading' | 'complete' | 'error';

export interface CrvFileUploadProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'onChange' | 'onDrop'> {
  state?: CrvFileUploadState;
  label?: ReactNode;
  description?: ReactNode;
  errorMessage?: ReactNode;
  disabled?: boolean;
  accept?: string;
  multiple?: boolean;
  inputName?: string;
  onFilesSelected?: (files: FileList) => void;
  onInputChange?: (event: ChangeEvent<HTMLInputElement>) => void;
  onFileDrop?: (event: DragEvent<HTMLDivElement>, files: FileList) => void;
}

export interface CrvFileUploadItemProps extends HTMLAttributes<HTMLDivElement> {
  state?: CrvFileUploadItemState;
  fileName?: ReactNode;
  fileMeta?: ReactNode;
  progress?: number;
  onRemove?: () => void;
  onRetry?: () => void;
}
