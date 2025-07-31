import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";
import { viteStaticCopy } from "vite-plugin-static-copy";

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        content: path.resolve(__dirname, "content.js"),
        main: path.resolve(__dirname, "src/main.jsx"),
      },
      output: {
        entryFileNames: "assets/[name].js",
        assetFileNames: "assets/[name].[ext]",
      }
    },
    outDir: "dist",
    emptyOutDir: true, // keep this; the plugin will recopy manifest
    target: "esnext"
  },
  plugins: [
    react(),
    viteStaticCopy({
      targets: [
        {
          src: "manifest.json",  // 👈 This copies manifest.json
          dest: "."              // 👈 To root of dist/
        },
        {
          src: "public/icon.png",  // 👈 Optional: copy icon
          dest: "assets"           // 👈 Goes to dist/assets/icon.png
        }
      ]
    }),
  ],
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
