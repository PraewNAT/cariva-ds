import { colors, radius, spacing, typography } from '../../tokens';

// Ground truth from Figma (crv-breadcrumb-base, node 3875:5059)
export const BREADCRUMB_ITEM_HEIGHT = 22;
export const BREADCRUMB_SEPARATOR_SIZE = 16;
export const BREADCRUMB_DROPDOWN_ICON_SIZE = 16;
export const BREADCRUMB_ELLIPSIS_FRAME = 32;

export const breadcrumbLabelSx = {
  fontFamily: typography.fontFamily.sans,
  fontSize:   `${typography.fontSize.label.medium}px`,
  lineHeight: `${typography.lineHeight.label.medium}px`,
  fontWeight: typography.fontWeight.medium,
};

export const linkColorSx = {
  color: colors.brand.primary.onSurface.default,
  textDecoration: 'none',
  cursor: 'pointer',
  '&:hover': {
    color: colors.brand.primary.content.strong,
  },
};

export const activeColorSx = {
  color: colors.content.primary,
};

export const ellipsisButtonSx = {
  display:        'inline-flex',
  alignItems:     'center',
  justifyContent: 'center',
  width:          BREADCRUMB_ELLIPSIS_FRAME,
  height:         BREADCRUMB_ELLIPSIS_FRAME,
  p:              `${spacing.sm}px`,
  borderRadius:   `${radius.none}px`,
  border:         'none',
  background:     'transparent',
  cursor:         'pointer',
  color:          colors.content.secondary,
  '&:hover': {
    color: colors.content.primary,
  },
};
