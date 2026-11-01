import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: {
        additionalData: `@use "/src/styles/variables.scss" as *;\n`,
      },
    },
  },
  resolve: {
    alias: {
      '@atoms': path.resolve(__dirname, 'src/_atoms'),
      '@molecules': path.resolve(__dirname, 'src/_molecules'),
      '@components': path.resolve(__dirname, 'src/_components'),
      '@layout': path.resolve(__dirname, 'src/layout'),
      '@pages': path.resolve(__dirname, 'src/pages'),
    },
  },
  plugins: [react()],
  /*  commonjsOptions: {
    esmExternals: true,
  },*/
});
