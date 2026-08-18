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
})