import { defineConfig } from "vite";
import react from "@vitejs/plugin-react-swc";
import path from "path";

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
      types: `${path.resolve(__dirname, "./src/types/")}`,
      reduxTools: `${path.resolve(__dirname, "./src/redux/")}`,
      styles: `${path.resolve(__dirname, "./src/styles/")}`,
      utils: `${path.resolve(__dirname, "./src/utils/")}`,
    }
  }
});
