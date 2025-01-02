import { defineConfig } from "@rslib/core";

export default defineConfig({
  lib: [
    {
      dts: {
        bundle: false,
        build: true,
      },
      format: "esm",
      syntax: "es2021",
    },
    {
      format: "cjs",
      syntax: "es2021",
    },
  ],
  output: {
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
