import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      buffer: "buffer/",
      process: "process/browser",
    },
  },
  define: {
    global: "window",
  },
});
