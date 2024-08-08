import "@testing-library/jest-dom"

import server from "./mockServer"
import { afterAll, afterEach, beforeAll } from "vitest"

beforeAll(() => server.listen({ onUnhandledRequest: "error" }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
