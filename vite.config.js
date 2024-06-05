import { devPath } from "./src/components/helpers/functions-general";
import react from "@vitejs/plugin-react";
import path from "path";
import { defineConfig } from "vite";

export default defineConfig({
  plugins: [react()],

  base: devPath,
  build: {
    chunkSizeWarningLimit: 4000,
  },

  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
