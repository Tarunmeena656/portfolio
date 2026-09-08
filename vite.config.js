import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// For GitHub Pages under a repo path, build with:  VITE_BASE=/repo-name/ npm run build
export default defineConfig({
  plugins: [react()],
  base: process.env.VITE_BASE || "/",
  // Local dev has no serverless runtime: proxy /api to the deployed site so the blog section works.
  server: { proxy: { "/api": { target: "https://tarun-meena.vercel.app", changeOrigin: true } } },
});
