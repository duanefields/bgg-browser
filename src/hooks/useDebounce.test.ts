import { act, renderHook } from "@testing-library/react"
import useDebounce from "./useDebounce"
import { expect, it } from "vitest"

it("Should return the value only after the delay", async () => {
  const { result } = renderHook(() => useDebounce("test", 10))
  expect(result.current).toBe("")
  await act(async () => {
    await new Promise((resolve) => setTimeout(resolve, 10))
  })
  expect(result.current).toBe("test")
})
