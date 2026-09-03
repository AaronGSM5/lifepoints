import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { render } from "@testing-library/react-native";

import LoginScreen from "@/app/auth/login";

const createTestQueryClient = () =>
  new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

describe("LoginScreen", () => {
  it("should work", async () => {
    const testQueryClient = createTestQueryClient();
    const { getByRole, getByPlaceholderText } = await render(
      <QueryClientProvider client={testQueryClient}>
        <LoginScreen />
      </QueryClientProvider>
    );
    expect(getByPlaceholderText(/mail/i)).toBeTruthy();
  });
});
