import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    proxy: {
      "/v1": {
        target: "http://localhost:5000", // local dev
        changeOrigin: true,
        secure: false,
        rewrite: (path) => path.replace(/^\/v1/, "/v1"),
      },
      "/api": {
        target: "https://chat-application-3dv5.onrender.com", // production
        changeOrigin: true,
        secure: true,
        rewrite: (path) => path.replace(/^\/api/, "/v1"),
      },
    },
  },
  build: {
    target: "esnext",
    chunkSizeWarningLimit: 500,
  },
});

// /v1 proxies to your local dev server (localhost:5000).
// /api proxies to your Render server (chat-application-3dv5.onrender.com) and rewrites /api to /v1, since your backend still expects /v1.
