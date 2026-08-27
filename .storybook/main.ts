import type { StorybookConfig } from '@storybook/react-vite';
import { mergeConfig } from 'vite';

const config: StorybookConfig = {
  stories: [
    '../code/core/components/**/*.stories.@(ts|tsx)',
    '../code/products/**/components/**/*.stories.@(ts|tsx)',
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
      // Force the automatic JSX runtime here — the root tsconfig.json belongs
      // to an unrelated Node tool (no "jsx" option), so without this Vite/esbuild
      // falls back to the classic runtime and throws "React is not defined".
      esbuild: {
        jsx: 'automatic',
      },
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
