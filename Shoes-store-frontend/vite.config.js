import { defineConfig } from "vite";
import { resolve } from "path";

export default defineConfig({
  plugins: [],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        slider: resolve(__dirname, "slider.html"),
        signup: resolve(__dirname, "signup.html"),
        login: resolve(__dirname, "login.html"),
        firstPage: resolve(__dirname, "firstPage.html"),
      },
    },
  },
});
