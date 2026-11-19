import { fireEvent, render, waitFor } from "@testing-library/react-native";
import { router } from "expo-router";

import { account } from "@/api/client/appwrite";
import RegisterScreen from "@/app/auth/register";

jest.mock("@/api/client/appwrite", () => ({
  account: {
    create: jest.fn().mockResolvedValue({}),
    createEmailPasswordSession: jest.fn().mockResolvedValue({})
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

const setup = async () => {
  const utils = await render(<RegisterScreen />);

  const passwordInputs = utils.getAllByPlaceholderText(/password/i);

  return {
    ...utils,
    nameInput: utils.getByPlaceholderText(/username/i),
    mailInput: utils.getByPlaceholderText(/mail/i),
    passwordInput: passwordInputs[0],
    repeatPasswordInput: passwordInputs[1],
    registerButton: utils.getByRole("button", { name: /register/i })
  };
};

describe("RegisterScreen", () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, "log").mockImplementation(() => {});
    jest.spyOn(console, "error").mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
  });

  it("should render all elements correctly", async () => {
    const { nameInput, mailInput, passwordInput, repeatPasswordInput, registerButton } = await setup();
    expect(nameInput).toBeTruthy();
    expect(mailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(repeatPasswordInput).toBeTruthy();
    expect(registerButton).toBeDisabled();
  });

  it("should enable register button if form is filled correctly", async () => {
    const { nameInput, mailInput, passwordInput, repeatPasswordInput, registerButton } = await setup();
    await fireEvent.changeText(nameInput, "TestUser");
    await fireEvent.changeText(mailInput, "test@test.test");
    expect(registerButton).toBeDisabled();
    await fireEvent.changeText(passwordInput, "weakPW");
    expect(registerButton).toBeDisabled();
    await fireEvent.changeText(passwordInput, "Password123!");
    expect(registerButton).toBeDisabled();
    await fireEvent.changeText(repeatPasswordInput, "Password");
    expect(registerButton).toBeDisabled();
    await fireEvent.changeText(repeatPasswordInput, "Password123!");
    expect(registerButton).toBeEnabled();
  });

  it("should successfully register with valid credentials", async () => {
    const { nameInput, mailInput, passwordInput, repeatPasswordInput, registerButton } = await setup();
    await fireEvent.changeText(nameInput, "TestUser");
    await fireEvent.changeText(mailInput, "test@test.test");
    await fireEvent.changeText(passwordInput, "Password123!");
    await fireEvent.changeText(repeatPasswordInput, "Password123!");
    await fireEvent.press(registerButton);
    await waitFor(() => {
      expect(account.create).toHaveBeenCalledWith(expect.any(String), "test@test.test", "Password123!", "TestUser");
      expect(account.createEmailPasswordSession).toHaveBeenCalledWith("test@test.test", "Password123!");
      expect(router.replace).toHaveBeenCalledWith("/auth/verify-email");
    });
  });

  it("should not reroute user on error", async () => {
    account.create.mockRejectedValueOnce(new Error("Network Error"));
    const { nameInput, mailInput, passwordInput, repeatPasswordInput, registerButton } = await setup();
    await fireEvent.changeText(nameInput, "TestUser");
    await fireEvent.changeText(mailInput, "test@test.test");
    await fireEvent.changeText(passwordInput, "Password123!");
    await fireEvent.changeText(repeatPasswordInput, "Password123!");
    await fireEvent.press(registerButton);
    await waitFor(() => {
      expect(router.replace).not.toHaveBeenCalled();
    });
  });
});
