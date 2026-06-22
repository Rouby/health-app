import babel from '@rolldown/plugin-babel';
import tailwindcss from '@tailwindcss/vite';
import react, { reactCompilerPreset } from '@vitejs/plugin-react';
import { defineConfig } from 'waku/config';

export default defineConfig({
  vite: {
    optimizeDeps: {
      exclude: ['@mantine/core', '@mantine/hooks'],
    },
    environments: {
      rsc: {
        optimizeDeps: {
          include: ['hono/tiny'],
          exclude: ['@mantine/core', '@mantine/hooks'],
        },
        build: {
          rolldownOptions: {
            platform: 'neutral',
          },
        },
      },
      ssr: {
        optimizeDeps: {
          include: ['waku > rsc-html-stream/server'],
          exclude: ['@mantine/core', '@mantine/hooks'],
        },
        build: {
          rolldownOptions: {
            platform: 'neutral',
          },
        },
      },
    },
    plugins: [
      tailwindcss(),
      react(),
      babel({ presets: [reactCompilerPreset()] }),
    ],
  },
});
