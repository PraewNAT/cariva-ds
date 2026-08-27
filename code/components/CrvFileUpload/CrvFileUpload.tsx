'use client';

import { forwardRef, useRef, useState } from 'react';
import Box from '@mui/material/Box';
import IconButton from '@mui/material/IconButton';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CloseIcon from '@mui/icons-material/Close';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';
import ErrorIcon from '@mui/icons-material/Error';
import InsertDriveFileRoundedIcon from '@mui/icons-material/InsertDriveFileRounded';
import RefreshIcon from '@mui/icons-material/Refresh';
import {
  FILE_UPLOAD_ACTION_SIZE,
  FILE_UPLOAD_HEIGHT,
  FILE_UPLOAD_FILE_GLYPH_SIZE,
  FILE_UPLOAD_ICON_SIZE,
  FILE_UPLOAD_ITEM_HEIGHT,
  FILE_UPLOAD_WIDTH,
  fileIconSx,
  fileUploadDescriptionSx,
  fileUploadItemMetaSx,
  fileUploadItemNameSx,
  fileUploadItemStateTokens,
  fileUploadLabelSx,
  fileUploadStateTokens,
  uploadContainerSpacing,
  uploadItemSpacing,
} from './crvFileUploadStyles';
import { colors, radius } from '../../tokens';
import type {
  CrvFileUploadItemProps,
  CrvFileUploadItemState,
  CrvFileUploadProps,
  CrvFileUploadState,
} from './CrvFileUpload.types';

function itemActionIcon(state: CrvFileUploadItemState) {
  if (state === 'complete') return <CheckCircleIcon />;
  if (state === 'error') return <ErrorIcon />;
  if (state === 'uploading') return <CloseIcon />;
  return <CloseIcon />;
}

export const CrvFileUpload = forwardRef<HTMLDivElement, CrvFileUploadProps>(
  function CrvFileUpload(
    {
      state = 'default',
      label,
      description,
      errorMessage = 'File type not supported or too large',
      disabled = false,
      accept,
      multiple = true,
      inputName,
      onFilesSelected,
      onInputChange,
      onFileDrop,
      onClick,
      onDragEnter,
      onDragLeave,
      onDragOver,
      className,
      ...rest
    },
    ref,
  ) {
    const inputRef = useRef<HTMLInputElement | null>(null);
    const [isDragging, setIsDragging] = useState(false);
    const visualState: CrvFileUploadState = disabled
      ? 'disabled'
      : isDragging
        ? 'dragging'
        : state;
    const tokens = fileUploadStateTokens(visualState, disabled);
    const labelContent =
      visualState === 'disabled'
        ? label ?? 'Upload unavailable'
        : visualState === 'dragging'
          ? 'Drop files here'
          : label ?? 'Drag & drop files here';
    const descriptionContent =
      visualState === 'error'
        ? errorMessage
        : description ?? 'or click to browse · PNG, JPG, PDF up to 10MB';

    return (
      <Box
        ref={ref}
        className={className}
        role="button"
        aria-disabled={disabled || undefined}
        tabIndex={disabled ? -1 : 0}
        onClick={(event) => {
          onClick?.(event);
          if (!disabled) inputRef.current?.click();
        }}
        onKeyDown={(event) => {
          if (disabled) return;
          if (event.key === 'Enter' || event.key === ' ') {
            event.preventDefault();
            inputRef.current?.click();
          }
        }}
        onDragEnter={(event) => {
          onDragEnter?.(event);
          if (!disabled) setIsDragging(true);
        }}
        onDragLeave={(event) => {
          onDragLeave?.(event);
          setIsDragging(false);
        }}
        onDragOver={(event) => {
          onDragOver?.(event);
          if (!disabled) event.preventDefault();
        }}
        onDrop={(event) => {
          event.preventDefault();
          setIsDragging(false);
          if (disabled) return;
          const { files } = event.dataTransfer;
          if (files.length > 0) {
            onFileDrop?.(event, files);
            onFilesSelected?.(files);
          }
        }}
        sx={{
          width:           FILE_UPLOAD_WIDTH,
          maxWidth:        '100%',
          minHeight:       FILE_UPLOAD_HEIGHT,
          display:         'flex',
          flexDirection:   'column',
          alignItems:      'center',
          justifyContent:  'center',
          boxSizing:       'border-box',
          borderRadius:    `${radius['12']}px`,
          border:          `1px solid ${tokens.borderColor}`,
          backgroundColor: tokens.backgroundColor,
          color:           tokens.labelColor,
          cursor:          tokens.cursor,
          textAlign:       'center',
          transition:      'background-color 120ms ease, border-color 120ms ease',
          ...uploadContainerSpacing,
          '&:hover': disabled
            ? undefined
            : {
              borderColor: fileUploadStateTokens('hover', false).borderColor,
            },
          '&:focus-visible': {
            outline:        `2px solid ${colors.border.system}`,
            outlineOffset:  2,
          },
        }}
        {...rest}
      >
        <input
          ref={inputRef}
          type="file"
          name={inputName}
          accept={accept}
          multiple={multiple}
          disabled={disabled}
          onChange={(event) => {
            onInputChange?.(event);
            if (event.target.files && event.target.files.length > 0) {
              onFilesSelected?.(event.target.files);
            }
          }}
          style={{ display: 'none' }}
        />

        <CloudUploadIcon
          sx={{
            width: FILE_UPLOAD_ICON_SIZE,
            height: FILE_UPLOAD_ICON_SIZE,
            color: tokens.iconColor,
          }}
        />

        <Typography sx={{ ...fileUploadLabelSx, color: tokens.labelColor }}>
          {labelContent}
        </Typography>

        {visualState !== 'disabled' && (
          <Typography
            sx={{ ...fileUploadDescriptionSx, color: tokens.descriptionColor }}
          >
            {descriptionContent}
          </Typography>
        )}
      </Box>
    );
  },
);

export const CrvFileUploadItem = forwardRef<HTMLDivElement, CrvFileUploadItemProps>(
  function CrvFileUploadItem(
    {
      state = 'idle',
      fileName = 'filename.pdf',
      fileMeta = '2.4 MB',
      progress = 60,
      onRemove,
      onRetry,
      className,
      ...rest
    },
    ref,
  ) {
    const tokens = fileUploadItemStateTokens(state);
    const actionLabel = state === 'error' ? 'Retry upload' : 'Remove file';
    const actionHandler = state === 'error' ? onRetry : onRemove;
    const metaContent =
      state === 'error'
        ? 'Upload failed'
        : state === 'complete'
          ? 'Upload complete'
          : fileMeta;

    return (
      <Box
        ref={ref}
        className={className}
        sx={{
          width:           FILE_UPLOAD_WIDTH,
          maxWidth:        '100%',
          minHeight:       FILE_UPLOAD_ITEM_HEIGHT,
          borderRadius:    `${radius['4']}px`,
          backgroundColor: colors.onSurface.default,
          overflow:        'hidden',
          boxSizing:       'border-box',
        }}
        {...rest}
      >
        <Box
          sx={{
            minHeight:      FILE_UPLOAD_ITEM_HEIGHT,
            display:        'flex',
            alignItems:     'center',
            boxSizing:      'border-box',
            ...uploadItemSpacing,
          }}
        >
          <Box sx={fileIconSx} aria-hidden>
            <InsertDriveFileRoundedIcon
              sx={{
                width:  FILE_UPLOAD_FILE_GLYPH_SIZE,
                height: FILE_UPLOAD_FILE_GLYPH_SIZE,
              }}
            />
          </Box>

          <Box sx={{ minWidth: 0, flex: 1 }}>
            <Typography
              noWrap
              sx={{ ...fileUploadItemNameSx, color: colors.content.primary }}
            >
              {fileName}
            </Typography>
            <Typography
              noWrap
              sx={{ ...fileUploadItemMetaSx, color: tokens.metaColor }}
            >
              {metaContent}
            </Typography>
          </Box>

          <IconButton
            aria-label={actionLabel}
            size="small"
            onClick={actionHandler}
            sx={{
              width:  FILE_UPLOAD_ACTION_SIZE,
              height: FILE_UPLOAD_ACTION_SIZE,
              p:      0,
              color:  tokens.actionColor,
              '& .MuiSvgIcon-root': {
                width:  FILE_UPLOAD_ACTION_SIZE,
                height: FILE_UPLOAD_ACTION_SIZE,
              },
            }}
          >
            {state === 'error' && onRetry ? <RefreshIcon /> : itemActionIcon(state)}
          </IconButton>
        </Box>

        {state === 'uploading' && (
          <LinearProgress
            variant="determinate"
            value={progress}
            sx={{
              height: 3,
              backgroundColor: colors.brand.primary.onSurface.subtle,
              '& .MuiLinearProgress-bar': {
                backgroundColor: colors.brand.primary.onSurface.default,
              },
            }}
          />
        )}
      </Box>
    );
  },
);
