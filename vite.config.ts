import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"
import { loadEnv } from "vite"
import { TanStackRouterVite } from "@tanstack/router-plugin/vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [TanStackRouterVite(), react()],
  server: {
    host: true,
  },
  test: {
    globals: true,
    environment: "jsdom",
    env: loadEnv("testing", process.cwd()),
    setupFiles: "src/setupTests.tsx",
  },
})
