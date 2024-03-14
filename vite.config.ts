import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import tsconfigPaths from "vite-tsconfig-paths";

import path from "path";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react({ tsDecorators: true })],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@ioc": path.resolve(__dirname, "./src/inversify"),
      "@apps": path.resolve(__dirname, "./src/apps"),
      "@shared": path.resolve(__dirname, "./src/apps/Shared"),
      "@contexts": path.resolve(__dirname, "./src/Contexts"),
      "@theme": path.resolve(__dirname, "./src/apps/Shared/Theme"),
      "@assets": path.resolve(__dirname, "./src/assets"),
    },
  },
  optimizeDeps: {
    esbuildOptions: {
      tsconfigRaw: {
        compilerOptions: {
          experimentalDecorators: true,
        },
      },
    },
  },
  build: {
    sourcemap: true,
  },
});
