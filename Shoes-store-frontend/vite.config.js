import { defineConfig } from "vite";
import injectHTML from "vite-plugin-html-inject";
import { resolve } from "path";

export default defineConfig({
  plugins: [injectHTML()],
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, "index.html"),
        slider: resolve(__dirname, "slider.html"),
        signup: resolve(__dirname, "signup.html"),
        login: resolve(__dirname, "login.html"),
        products: resolve(__dirname, "products.html"),
        product: resolve(__dirname, "product.html"),
        search: resolve(__dirname, "search.html"),
      },
    },
  },
});
