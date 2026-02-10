import { act, renderHook } from "@testing-library/react"
import useDebounce from "./useDebounce"
import { describe, expect, it, vi } from "vitest"

describe("useDebounce", () => {
  it("Should return empty string initially", () => {
    const { result } = renderHook(() => useDebounce("hello"))
    expect(result.current).toBe("")
  })

  it("Should return the value after the delay", () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useDebounce("test", 100))

    expect(result.current).toBe("")

    act(() => {
      vi.advanceTimersByTime(100)
    })

    expect(result.current).toBe("test")
    vi.useRealTimers()
  })

  it("Should use default delay of 250ms", () => {
    vi.useFakeTimers()
    const { result } = renderHook(() => useDebounce("test"))

    act(() => {
      vi.advanceTimersByTime(249)
    })
    expect(result.current).toBe("")

    act(() => {
      vi.advanceTimersByTime(1)
    })
    expect(result.current).toBe("test")

    vi.useRealTimers()
  })

  it("Should only emit the last value when value changes rapidly", () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
      initialProps: { value: "a" },
    })

    // change value before delay elapses
    act(() => {
      vi.advanceTimersByTime(50)
    })
    rerender({ value: "ab" })

    act(() => {
      vi.advanceTimersByTime(50)
    })
    rerender({ value: "abc" })

    // still empty — no delay has fully elapsed since the last change
    expect(result.current).toBe("")

    // now let the final delay complete
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe("abc")

    vi.useRealTimers()
  })

  it("Should cancel the timeout on unmount", () => {
    vi.useFakeTimers()
    const clearTimeoutSpy = vi.spyOn(global, "clearTimeout")

    const { unmount } = renderHook(() => useDebounce("test", 100))

    unmount()

    expect(clearTimeoutSpy).toHaveBeenCalled()

    vi.useRealTimers()
  })

  it("Should update when the value changes after initial debounce", () => {
    vi.useFakeTimers()
    const { result, rerender } = renderHook(({ value }) => useDebounce(value, 100), {
      initialProps: { value: "first" },
    })

    // let first value settle
    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe("first")

    // change to new value
    rerender({ value: "second" })
    expect(result.current).toBe("first")

    act(() => {
      vi.advanceTimersByTime(100)
    })
    expect(result.current).toBe("second")

    vi.useRealTimers()
  })
})
