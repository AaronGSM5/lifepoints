import { Alert } from "react-native";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";

import { account } from "@/api/client/appwrite";
import LoginScreen from "@/app/auth/login";

jest.mock("@/api/client/appwrite", () => ({
  account: {
    createEmailPasswordSession: jest.fn().mockResolvedValue({}),
    createJWT: jest.fn().mockResolvedValue({ jwt: "mock-jwt-token" })
  }
}));

jest.mock("@/api/auth/useSync", () => ({
  useSyncUser: () => ({
    mutate: jest.fn((_, options) => {
      if (options && options.onSuccess) {
        options.onSuccess({ totalLifepoints: 100 });
      }
    }),
    isPending: false
  })
}));

const mockLogin = jest.fn();

jest.mock("@/store/useStore", () => {
  const store = jest.fn(() => ({
    login: mockLogin
  }));
  store.getState = () => ({
    login: mockLogin
  });
  return {
    __esModule: true,
    default: store
  };
});

const setup = async () => {
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: { retry: false },
      mutations: { retry: false }
    }
  });

  const utils = await render(
    <QueryClientProvider client={queryClient}>
      <LoginScreen />
    </QueryClientProvider>
  );

  return {
    ...utils,
    mailInput: utils.getByPlaceholderText(/mail/i),
    passwordInput: utils.getByPlaceholderText(/password/i),
    loginButton: utils.getByRole("button", { name: /log in/i })
  };
};

const fillAndSubmitForm = async (mailInput, passwordInput, loginButton) => {
  await fireEvent.changeText(mailInput, "test@test.test");
  await fireEvent.changeText(passwordInput, "Password123!");
  await fireEvent.press(loginButton);
};

describe("LoginScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, "alert").mockImplementation(() => {});

    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render the elements correctly", async () => {
    const { mailInput, passwordInput, loginButton } = await setup();

    expect(mailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(loginButton).toBeDisabled();
  });

  it("should enable login button if the inputs contain text", async () => {
    const { mailInput, passwordInput, loginButton } = await setup();

    await fireEvent.changeText(mailInput, "test@test.test");
    expect(loginButton).toBeDisabled();
    await fireEvent.changeText(passwordInput, "Password123!");
    expect(loginButton).toBeEnabled();
  });

  it("should successfully log in with valid credentials", async () => {
    const { mailInput, passwordInput, loginButton } = await setup();
    await fillAndSubmitForm(mailInput, passwordInput, loginButton);

    await waitFor(() => {
      expect(account.createEmailPasswordSession).toHaveBeenCalledWith("test@test.test", "Password123!");
      expect(mockLogin).toHaveBeenCalled();
      expect(router.replace).toHaveBeenCalledWith("/home");
    });
  });

  it("should handle already active session error and push to home", async () => {
    account.createEmailPasswordSession.mockRejectedValueOnce(
      new Error("Creation of a session is prohibited when a session is active")
    );
    const { mailInput, passwordInput, loginButton } = await setup();
    await fillAndSubmitForm(mailInput, passwordInput, loginButton);

    await waitFor(() => {
      expect(router.push).toHaveBeenCalledWith("/home");
      expect(mockLogin).toHaveBeenCalled();
    });
  });

  it("should show alert on generic login failure", async () => {
    account.createEmailPasswordSession.mockRejectedValueOnce(new Error("Invalid credentials"));
    const { mailInput, passwordInput, loginButton } = await setup();
    await fillAndSubmitForm(mailInput, passwordInput, loginButton);

    await waitFor(() => {
      expect(Alert.alert).toHaveBeenCalled();
    });
  });
});
