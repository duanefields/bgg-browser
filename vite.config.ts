import { defineConfig } from "vitest/config"
import react from "@vitejs/plugin-react-swc"
import { loadEnv } from "vite"

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  test: {
    globals: true,
    environment: "jsdom",
    env: loadEnv("testing", process.cwd()),
    setupFiles: "src/setupTests.tsx",
  },
})
