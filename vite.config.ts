import { TanStackRouterVite } from "@tanstack/router-plugin/vite"
import react from "@vitejs/plugin-react-swc"
import * as child from "child_process"
import { loadEnv } from "vite"
import { defineConfig } from "vitest/config"

const commitHash = child.execSync("git rev-parse --short HEAD").toString()

// https://vitejs.dev/config/
export default defineConfig({
  define: {
    "import.meta.env.VITE_APP_VERSION": JSON.stringify(commitHash),
  },
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
