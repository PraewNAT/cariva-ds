import type { Preview } from '@storybook/react';
import { ThemeProvider } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import '../code/fonts';
import { carivaTheme } from '../code/theme';

const preview: Preview = {
  parameters: {
    backgrounds: {
      // Default to white (card surface) so disabled buttons (slate/100 bg)
      // are clearly visible. Switch to 'app' in toolbar to preview on page shell.
      default: 'white',
      values: [
        { name: 'white', value: '#ffffff' },
        { name: 'app', value: '#f1f5f9' },
      ],
    },
    controls: {
      matchers: { color: /(background|color)$/i, date: /Date$/i },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider theme={carivaTheme}>
        <CssBaseline />
        <div style={{ padding: 24 }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
};

export default preview;
