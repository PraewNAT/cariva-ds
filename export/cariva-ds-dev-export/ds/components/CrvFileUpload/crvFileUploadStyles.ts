import { colors, radius, spacing, typography } from '../../tokens';
import type { CrvFileUploadItemState, CrvFileUploadState } from './CrvFileUpload.types';

// Ground truth from Figma file-upload section, node 4457:62799
export const FILE_UPLOAD_WIDTH = 320;
export const FILE_UPLOAD_HEIGHT = 160;
export const FILE_UPLOAD_ICON_SIZE = 24;
export const FILE_UPLOAD_ITEM_HEIGHT = 56;
export const FILE_UPLOAD_FILE_ICON_WIDTH = 32;
export const FILE_UPLOAD_FILE_ICON_HEIGHT = 32;
export const FILE_UPLOAD_FILE_GLYPH_SIZE = 20;
export const FILE_UPLOAD_ACTION_SIZE = 20;

export function fileUploadStateTokens(
  state: CrvFileUploadState,
  disabled: boolean,
) {
  if (disabled || state === 'disabled') {
    return {
      backgroundColor: colors.onSurface.action.disabled,
      borderColor:     colors.border.disabled,
      iconColor:       colors.content.disabled,
      labelColor:      colors.content.disabled,
      descriptionColor: colors.content.disabled,
      cursor:          'not-allowed',
    };
  }

  if (state === 'error') {
    return {
      backgroundColor: colors.status.error.onSurface.subtle,
      borderColor:     colors.border.error,
      iconColor:       colors.content.secondary,
      labelColor:      colors.content.primary,
      descriptionColor: colors.status.error.content.default,
      cursor:          'pointer',
    };
  }

  if (state === 'dragging') {
    return {
      backgroundColor: colors.brand.primary.onSurface.subtle,
      borderColor:     colors.border.system,
      iconColor:       colors.content.secondary,
      labelColor:      colors.content.primary,
      descriptionColor: colors.content.secondary,
      cursor:          'copy',
    };
  }

  return {
    backgroundColor: colors.onSurface.default,
    borderColor:     state === 'hover' ? colors.border.strong : colors.border.default,
    iconColor:       colors.content.secondary,
    labelColor:      colors.content.primary,
    descriptionColor: colors.content.secondary,
    cursor:          'pointer',
  };
}

export function fileUploadItemStateTokens(state: CrvFileUploadItemState) {
  if (state === 'error') {
    return {
      actionColor: colors.content.secondary,
      metaColor:   colors.status.error.content.default,
    };
  }

  if (state === 'complete') {
    return {
      actionColor: colors.status.success.content.default,
      metaColor:   colors.content.secondary,
    };
  }

  return {
    actionColor: colors.content.secondary,
    metaColor:   colors.content.secondary,
  };
}

export const fileUploadLabelSx = {
  fontFamily: typography.fontFamily.sans,
  fontSize:   `${typography.fontSize.label.medium}px`,
  lineHeight: `${typography.lineHeight.label.medium}px`,
  fontWeight: typography.fontWeight.medium,
};

export const fileUploadDescriptionSx = {
  fontFamily: typography.fontFamily.sans,
  fontSize:   `${typography.fontSize.body.small}px`,
  lineHeight: `${typography.lineHeight.body.small}px`,
  fontWeight: typography.fontWeight.regular,
};

export const fileUploadItemNameSx = {
  fontFamily: typography.fontFamily.sans,
  fontSize:   `${typography.fontSize.label.small}px`,
  lineHeight: `${typography.lineHeight.label.small}px`,
  fontWeight: typography.fontWeight.medium,
};

export const fileUploadItemMetaSx = {
  fontFamily: typography.fontFamily.sans,
  fontSize:   `${typography.fontSize.body.small}px`,
  lineHeight: `${typography.lineHeight.body.small}px`,
  fontWeight: typography.fontWeight.regular,
};

export const fileIconSx = {
  display:         'inline-flex',
  alignItems:     'center',
  justifyContent: 'center',
  width:           FILE_UPLOAD_FILE_ICON_WIDTH,
  height:          FILE_UPLOAD_FILE_ICON_HEIGHT,
  borderRadius:    `${radius.full}px`,
  backgroundColor: colors.onSurface.action.disabled,
  color:           colors.content.secondary,
  flexShrink:      0,
};

export const uploadContainerSpacing = {
  padding: `${spacing.xl}px`,
  gap:     `${spacing.sm}px`,
};

export const uploadItemSpacing = {
  padding: `${spacing.md}px ${spacing.lg}px`,
  gap:     `${spacing.md}px`,
};
