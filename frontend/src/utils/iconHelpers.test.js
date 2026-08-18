import { getName } from "./iconHelpers";

describe("getName", () => {
  it('should never display exceptions in outline style', () => {
    expect(getName("spotify", true)).toBe("spotify-fill")
    expect(getName("google", true)).toBe("google-fill")
    expect(getName("apple", true)).toBe("apple-fill")
    expect(getName("facebook", true)).toBe("facebook-fill")
    expect(getName("x", true)).toBe("x-fill")
  })

  it('should return -line if outline is true', () => {
    expect(getName("ball", true)).toBe("ball-line")
    expect(getName("home", true)).toBe("home-line")
  })

  it('should return -fill if outline is false', () => {
    expect(getName("ball", false)).toBe("ball-fill")
    expect(getName("home", false)).toBe("home-fill")
  })
})