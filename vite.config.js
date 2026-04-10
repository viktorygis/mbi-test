import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  //убрать для разработки, оставить для деплоя на GitHub Pages
  //base: "/mbi-test-build/", //Строка для корректного отображения при деплое на GitHub Pages
  server: {
    host: "127.0.0.1",
    port: 5173,
    strictPort: true,
    proxy: {
      "/api": "http://localhost:5000",
    },
  },
});
