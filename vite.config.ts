import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createId } from "@paralleldrive/cuid2";
import * as path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    strictPort: true,
    host: "0.0.0.0",
  },
  preview: {
    port: 3000,
    strictPort: true,
    host: "0.0.0.0",
  },
  build: {
    rollupOptions: {
      output: {
        entryFileNames: `[name].${createId()}.js`,
        chunkFileNames: `[name].${createId()}.js`,
        assetFileNames: `[name].${createId()}.[ext]`,
      },
    },
    minify: true,
  },
  resolve: {
    alias: {
      "@src": path.resolve(__dirname, "./src"),
      "@components": path.resolve(__dirname, "./src/components"),
      "@store": path.resolve(__dirname, "./src/store"),
      "@api": path.resolve(__dirname, "./src/api"),
      "@app": path.resolve(__dirname, "./src/app"),
    },
  },
  plugins: [react()],
});
