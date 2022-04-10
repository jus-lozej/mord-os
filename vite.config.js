import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import eslintPlugin from "vite-plugin-eslint";
import { ErrorOverlay } from "vite-plugin-error-overlay";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react(), eslintPlugin(), ErrorOverlay()],
});
