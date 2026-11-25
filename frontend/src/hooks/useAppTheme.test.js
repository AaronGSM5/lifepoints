import { renderHook } from "@testing-library/react-native";

import useStore from "@/store/useStore";

import { useAppTheme } from "./useAppTheme";

jest.mock("@/store/useStore")

describe("useAppTheme", () => {

  beforeEach(() => {
    jest.clearAllMocks()
  })

  it('should return light theme and fallback accent when no theme is set', async () => {
    useStore.mockImplementation((selector) =>
      selector({
        isDarkMode: false,
        activeColorThemeId: null
      }))
    const { result } = await renderHook(() => useAppTheme())

    expect(result.current.isDark).toBe(false)
    expect(result.current.primaryAccent).toBe("#F97316")
  })

  it('should return dark theme and correct accent when dark mode and valid theme are active', async () => {
    useStore.mockImplementation((selector) =>
      selector({
        isDarkMode: true,
        activeColorThemeId: "default_green"
      }))
    const { result } = await renderHook(() => useAppTheme())

    expect(result.current.isDark).toBe(true)
    expect(result.current.primaryAccent).toBe("rgb(47, 196, 146)")
  })

  it('should fallback to default_green on invalid color theme id', async () => {
    useStore.mockImplementation((selector) =>
      selector({
        isDarkMode: false,
        activeColorThemeId: "invalid_theme_id"
      }))
    const { result } = await renderHook(() => useAppTheme())

    expect(result.current.primaryAccent).toBe("rgb(47, 196, 146)")
  })

  it("should compose the theme from the three design sections", async () => {
    useStore.mockImplementation((selector) =>
      selector({
        isDarkMode: false,
        activeColorThemeId: "default_green",
        backgroundId: "whoop-oled",
        shapeId: "duolingo-tactile",
        accentId: "linear-indigo"
      }))
    const { result } = await renderHook(() => useAppTheme())

    expect(result.current.isDesignPlayground).toBe(true)
    expect(result.current.isDark).toBe(true)
    expect(result.current.background).toBe("#050709")
    expect(result.current.radius.lg).toBe(18)
    expect(result.current.buttonDepth).toBe(4)
    expect(result.current.primaryAccent).toBe("#6366F1")
  })

  it("should use the regular theme while no design section is selected", async () => {
    useStore.mockImplementation((selector) =>
      selector({
        isDarkMode: false,
        activeColorThemeId: "default_green",
        backgroundId: null,
        shapeId: null,
        accentId: null
      }))
    const { result } = await renderHook(() => useAppTheme())

    expect(result.current.isDesignPlayground).toBe(false)
    expect(result.current.isDark).toBe(false)
  })

  it("should return a stable theme reference for the same state", async () => {
    useStore.mockImplementation((selector) =>
      selector({
        isDarkMode: true,
        activeColorThemeId: "default_green",
        backgroundId: "obsidian",
        shapeId: "current",
        accentId: "current"
      }))
    const { result, rerender } = await renderHook(() => useAppTheme())
    const first = result.current
    await rerender()

    expect(result.current).toBe(first)
  })
})
