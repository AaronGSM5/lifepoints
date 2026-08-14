import { addOpacity } from "./colorHelpers"

describe("addOpacity", () => {
  it("should return 'transparent' if no color is provided", () => {
    expect(addOpacity(undefined, 0.5)).toBe("transparent")
    expect(addOpacity(null, 0.5)).toBe("transparent")
    expect(addOpacity("", 0.5)).toBe("transparent")
  })

  it("should return color on invalid color value", () => {
    expect(addOpacity("noColor", 0.5)).toBe("noColor")
    expect(addOpacity(1, 0.5)).toBe(1)
  })

  it("should return formated color for hex values", () => {
    expect(addOpacity("#000000", 0)).toBe("#00000000")
    expect(addOpacity("#000000", 0.5)).toBe("#00000080")
    expect(addOpacity("#000000", 1)).toBe("#000000ff")

    expect(addOpacity("#000", 0)).toBe("#00000000")
    expect(addOpacity("#000", 0.5)).toBe("#00000080")
    expect(addOpacity("#000", 1)).toBe("#000000ff")
  })

  it("should overwrite current opacity with new one for hex values", () => {
    expect(addOpacity("#00000080", 0)).toBe("#00000000")
    expect(addOpacity("#00000080", 0.7)).toBe("#000000b3")
    expect(addOpacity("#00000080", 1)).toBe("#000000ff")
  })

  it("should return formated color for rgb values", () => {
    expect(addOpacity("rgb(0, 0, 0)", 0.5)).toBe("rgba(0, 0, 0, 0.5)")
  })

  it("should overwrite current opacity with new one for rgba values", () => {
    expect(addOpacity("rgba(0, 0, 0, 0.5)", 0.7)).toBe("rgba(0, 0, 0, 0.7)")
  })
})