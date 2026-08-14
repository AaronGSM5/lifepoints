import { capitalize } from "./textHelpers";

describe("capitalize", () => {
  it('should capitalize the first letter of a string', () => {
    expect(capitalize("teststring")).toBe("Teststring")
  })

  it("should return an empty string and not crash if falsy values are provided", () => {
    expect(capitalize(null)).toBe("");
    expect(capitalize(undefined)).toBe("");
    expect(capitalize("")).toBe("");
  });
})