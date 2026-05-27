import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  preview: {
    host: true,
    allowedHosts: [
      "smart-brain-app-32fac457676f.herokuapp.com",
      "smartbrain.brandonmay.dev",
    ],
  },
});
