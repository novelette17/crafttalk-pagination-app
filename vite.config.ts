import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { createId } from "@paralleldrive/cuid2";

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
  plugins: [react()],
});
