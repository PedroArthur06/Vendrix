import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import path from "path";

export default defineConfig({
  plugins: [react()],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@shared": path.resolve(__dirname, "../src/shared"),
    },
  },
  server: {
    host: true, // Isso expõe o IP na rede local automaticamente
    port: 5173,
  },
});
