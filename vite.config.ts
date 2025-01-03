import react from "@vitejs/plugin-react-swc";
import path from "path";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  css: {
    modules: {
      localsConvention: "camelCase",
    },
  },
  resolve: {
    alias: {
      components: `${path.resolve(__dirname, "./src/components/")}`,
      features: `${path.resolve(__dirname, "./src/features/")}`,
      types: `${path.resolve(__dirname, "./src/types/")}`,
      reduxTools: `${path.resolve(__dirname, "./src/redux/")}`,
      styles: `${path.resolve(__dirname, "./src/styles/")}`,
      utils: `${path.resolve(__dirname, "./src/utils/")}`,
      assets: `${path.resolve(__dirname, "./src/assets")}`,
      constants: `${path.resolve(__dirname, "./src/constants")}`,
    },
  },
});
