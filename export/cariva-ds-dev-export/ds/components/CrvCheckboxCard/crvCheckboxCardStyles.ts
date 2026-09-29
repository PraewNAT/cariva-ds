import { colors, radius, spacing } from '../../tokens';
import { glow, shadows } from '../../theme/shadows';
import type { CrvCheckboxCardColor } from './CrvCheckboxCard.types';

// Ground truth from Figma (crv-checkbox-card, node 6697:362)
export const CARD_RADIUS = radius['16'];
export const CARD_PADDING = spacing.lg;
export const CARD_GAP = spacing.md;

function surface(checked: boolean, color: CrvCheckboxCardColor) {
  if (!checked) return colors.onSurface.default;
  return color === 'error'
    ? colors.status.error.onSurface.subtle
    : colors.brand.primary.onSurface.subtle;
}

function border(checked: boolean, color: CrvCheckboxCardColor) {
  if (color === 'error') return colors.status.error.border.strong;
  if (checked) return colors.brand.primary.border.default;
  return colors.border.default;
}

/**
 * Hover is an effect, not a colour: Figma keeps the same fill and border and
 * swaps the elevation. An unselected card lifts with `shadow/sm`; a selected one
 * gets `glow/primary` / `glow/error`, the halo in its own colour, so the card
 * that is already chosen glows instead of lifting.
 */
function hoverShadow(checked: boolean, color: CrvCheckboxCardColor) {
  if (!checked) return shadows.sm;
  return glow(
    color === 'error'
      ? colors.status.error.onSurface.default
      : colors.brand.primary.onSurface.default,
  );
}

/**
 * The whole card is the hit target, so the checkbox inside never takes a click of
 * its own — the label element wraps everything and MUI's own control handles the
 * toggle.
 */
export function getCardSx(
  checked: boolean,
  color: CrvCheckboxCardColor,
  disabled: boolean,
) {
  return {
    display:         'flex',
    flexDirection:   'row' as const,
    alignItems:      'flex-start',
    gap:             `${CARD_GAP}px`,
    padding:         `${CARD_PADDING}px`,
    borderRadius:    `${CARD_RADIUS}px`,
    boxSizing:       'border-box' as const,
    border:          '1px solid',
    borderColor:     disabled ? colors.border.disabled : border(checked, color),
    backgroundColor: disabled ? colors.onSurface.default : surface(checked, color),
    cursor:          disabled ? 'not-allowed' : 'pointer',
    width:           '100%',
    transition:      'box-shadow 200ms ease',
    ...(!disabled && { '&:hover': { boxShadow: hoverShadow(checked, color) } }),
  };
}

export function getCardLabelColor(color: CrvCheckboxCardColor, disabled: boolean) {
  if (disabled) return colors.content.disabled;
  return color === 'error'
    ? colors.status.error.content.default
    : colors.content.primary;
}

export function getCardDescriptionColor(disabled: boolean) {
  return disabled ? colors.content.disabled : colors.content.secondary;
}
