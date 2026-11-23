import { addOpacity, ensureContrast, getContrastRatio } from "./colorHelpers"

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
describe("getContrastRatio", () => {
  it("liefert 21 für Schwarz auf Weiß und 1 für gleiche Farben", () => {
    expect(getContrastRatio("#000000", "#ffffff")).toBeCloseTo(21, 1)
    expect(getContrastRatio("rgb(10, 20, 30)", "rgb(10, 20, 30)")).toBeCloseTo(1, 5)
  })

  it("mischt transparente Vordergründe auf den Hintergrund", () => {
    expect(getContrastRatio("rgba(0, 0, 0, 0)", "#ffffff")).toBeCloseTo(1, 5)
  })

  it("gibt null für unbekannte Farben zurück", () => {
    expect(getContrastRatio("noColor", "#fff")).toBeNull()
  })
})

describe("ensureContrast", () => {
  it("lässt ausreichend kontrastreiche Farben unverändert", () => {
    expect(ensureContrast("rgb(47, 196, 146)", "rgb(15, 23, 41)")).toBe("rgb(47, 196, 146)")
  })

  it.each(["rgb(47, 196, 146)", "#F97316", "#3B82F6", "#A855F7", "rgb(255, 0, 255)"])(
    "dunkelt %s auf hellem Hintergrund bis 4.5:1 ab",
    (accent) => {
      const result = ensureContrast(accent, "rgb(248, 250, 252)")
      expect(getContrastRatio(result, "rgb(248, 250, 252)")).toBeGreaterThanOrEqual(4.5)
    }
  )
})
