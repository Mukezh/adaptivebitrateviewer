import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  optimizeDeps: {
    include: ["shaka-player", "shaka-player/dist/shaka-player.ui"],
    esbuildOptions: {
      // ensure modern syntax is handled
      target: "es2018",
    },
  },
});
