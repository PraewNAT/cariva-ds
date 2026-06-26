import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../code/components/**/*.stories.@(ts|tsx)',
    '../code/LandingPage/**/*.stories.@(ts|tsx)',
  ],
  addons: ['@storybook/addon-essentials'],
  framework: {
    name: '@storybook/react-vite',
    options: {},
  },
  typescript: {
    reactDocgen: 'react-docgen-typescript',
  },
  async viteFinal(config) {
    return mergeConfig(config, {
      resolve: {
        dedupe: ['react', 'react-dom', '@emotion/react', '@emotion/styled'],
      },
      optimizeDeps: {
        include: [
          'react',
          'react-dom',
          '@emotion/react',
          '@emotion/styled',
          '@mui/material/styles',
          '@mui/material/CssBaseline',
        ],
      },
    });
  },
};

export default config;
