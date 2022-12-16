import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import UnoCss from "unocss/vite";
// import eslint from "vite-plugin-eslint";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    UnoCss({
      // presets: [],
    }),
    // eslint({ cache: true }),
    // {
    //   // do not fail on serve (i.e. local development)
    //   ...eslint({
    //     failOnWarning: false,
    //     failOnError: false,
    //   }),
    //   apply: "serve",
    //   enforce: "post",
    // },
  ],
});
