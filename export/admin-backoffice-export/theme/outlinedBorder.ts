import { colors } from '../tokens';

export type OutlinedBorderTokens = {
  color: string;
  hoverColor: string;
  width: string;
};

/** Not part of MUI Palette — use in muiTheme const + component overrides */
export function getOutlinedBorderTokens(): OutlinedBorderTokens {
  return {
    color: colors.border.default,
    hoverColor: colors.border.strong,
    width: '1px',
  };
}
