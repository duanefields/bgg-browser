import { expect, it } from "vitest"
import { sum } from "./sum"

it("should sum positive numbers", () => {
  expect(sum(1, 2)).toBe(3)
})
