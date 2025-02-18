import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";
import compress from "vite-plugin-compress";
import imagemin from "vite-plugin-imagemin";

export default defineConfig({
  plugins: [react(), svgr(), imagemin(), compress()],
  optimizeDeps: {
    exclude: ["react", "react-dom", "@tarojs/taro"],
  },
  build: {
    modulePreload: false,
    assetsDir: "assets", // Customize the assets directory
    rollupOptions: {
      output: {
        chunkFileNames: "chunks/[name]-[hash].js",
        assetFileNames: "assets/[name]-[hash].[ext]",
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
