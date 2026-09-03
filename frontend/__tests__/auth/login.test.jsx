import { render } from "@testing-library/react-native";

import LoginScreen from "@/app/auth/login";

describe("LoginScreen", () => {
  it("should work", async () => {
    const { getByRole, getByPlaceholderText } = await render(<LoginScreen />);
    expect(true).toBe(true);
  });
});
