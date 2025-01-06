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
      format: 'umd',
      umdName: 'Aegle',
      output: {
        distPath: {
          root: './dist/umd',
        },
        filename: {
          js: '[name].min.js',
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
