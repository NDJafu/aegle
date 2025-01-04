import { defineConfig } from '@rslib/core';

export default defineConfig({
  lib: [
    {
      dts: true,
      format: 'esm',
      output: {
        distPath: {
          root: './dist/esm',
        },
      },
    },
    {
      format: 'cjs',
      output: {
        distPath: {
          root: './dist/cjs',
        },
      },
    },
  ],
  output: {
    target: 'web',
    minify: {
      jsOptions: {
        minimizerOptions: {
          mangle: true,
          compress: true,
        },
      },
    },
  },
});
