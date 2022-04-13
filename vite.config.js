import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import { ErrorOverlay } from "vite-plugin-error-overlay";

// https://vitejs.dev/config/
export default defineConfig({
  css: {
    preprocessorOptions: {
      scss: { additionalData: `@import "./src/style/variables/index.scss";\n` },
    },
  },
  plugins: [react(), eslintPlugin(), ErrorOverlay()],
});
