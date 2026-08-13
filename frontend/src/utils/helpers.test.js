import { capitalize } from "./helpers"

test('should capitalize a string', () => {

  const result = capitalize("teststring")

  expect(result).toBe("Teststring")
})
