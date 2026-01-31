import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import { viteStaticCopy } from "vite-plugin-static-copy";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    react(),
    tailwindcss(),
    viteStaticCopy({
      targets: [
        {
          src: "manifest.json",
          dest: ".",
        },
        {
          src: "icons",
          dest: "icons",
        },
      ],
    }),
  ],
  build: {
    rollupOptions: {
      input: {
        main: "index.html",
        background: "src/background.ts",
      },
      output: {
        entryFileNames: (chunk) => {
          if (chunk.name === "background") {
            return "background.js";
          }
          return "assets/[name]-[hash].js";
        },
      },
    },
  },
});
