// vite.config.js
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";
import { imagetools } from "vite-imagetools";
import compression from "vite-plugin-compression";

export default defineConfig({
  plugins: [
    react(),
    imagetools(),
    compression({ algorithm: "brotliCompress", ext: ".br" }),
    compression({ algorithm: "gzipCompress", ext: ".gz" }),
  ],
  resolve: {
    alias: { "@": path.resolve(__dirname, "src") },
  },
  server: {
    proxy: {
      "/api": {
        target: "http://metm-back.local",
        changeOrigin: true,
        secure: false,
      },
      "/uploads": {
        target: "http://metm-back.local",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/uploads/, "/uploads"),
      },
    },
  },
  build: {
    sourcemap: true,
    target: "es2020",
  },
  preview: {
    port: 5000,
    strictPort: true,
  },
});
