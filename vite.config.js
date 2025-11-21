import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],

  server: {
    port: 3000,
    // proxy: {
    //   "/api": {
    //     target: "https://tm-server-0feo.onrender.com",
    //     changeOrigin: true,
    //   },
    // },
  },
});
