import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import visualizer from "rollup-plugin-visualizer";
import compress from "vite-plugin-compress";
import imagemin from "vite-plugin-imagemin";
import purge from "vite-plugin-purge";

export default defineConfig({
  plugins: [
    react(),
    svgr(),
    imagemin(),
    compress(),
    purge(),
    visualizer({
      filename: "stats.html", // Output file
      open: true, // Automatically open in browser
      gzipSize: true, // Show Gzip sizes
      brotliSize: true, // Show Brotli sizes
    }),
  ],
  optimizeDeps: {
    exclude: ["react", "react-dom"],
  },
  build: {
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("node_modules")) {
            return "vendor";
          }
        },
      },
    },
    minify: "terser",
    lib: {
      entry: "./src/index.tsx",
      name: "ramadanTaro",
      fileName: (format) => `ramadanTaro.${format}.js`,
    },
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
  resolve: {
    alias: {
      "@store": path.resolve(__dirname, "../src/store"),
    },
  },
});
