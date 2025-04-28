import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import { resolve } from "path";

export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      input: {
        website: resolve(__dirname, "index.html"),
        popup: resolve(__dirname, "popup.html"),
        background: resolve(__dirname, "src/extension/background/index.ts"), // Background script
        contentScript: resolve(__dirname, "src/extension/content/index.ts"), // Content script
      },
      output: {
        entryFileNames: (assetInfo) => {
          if (assetInfo.name === "background") return "background.js";
          if (assetInfo.name === "contentScript") return "contentScript.js";
          return "[name].js";
        },
      },
    },
    outDir: "dist",
  },
  define: {
    'process.env.REACT_APP_SITE_STATS_API_HOST': JSON.stringify(process.env.VITE_SITE_STATS_API_HOST)
  },
  server: {
    host: '0.0.0.0', // This allows Vite to be accessible outside the container
    port: 5173,
  },
});
