import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";

import BackButton from "./BackButton";

describe("BackButton", () => {
  const router = useRouter();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should call a custom onPress handler if provided, ignoring router", async () => {
    const customOnPress = jest.fn();
    const { getByLabelText } = await render(<BackButton onPress={customOnPress} />);

    await fireEvent.press(getByLabelText("Back"));

    expect(customOnPress).toHaveBeenCalledTimes(1);
    expect(router.back).not.toHaveBeenCalled();
    expect(router.replace).not.toHaveBeenCalled();
  });

  it("should call router.back() if canGoBack returns true and no custom onPress is given", async () => {
    router.canGoBack.mockReturnValue(true);
    const { getByLabelText } = await render(<BackButton />);

    await fireEvent.press(getByLabelText("Back"));

    expect(router.back).toHaveBeenCalledTimes(1);
    expect(router.replace).not.toHaveBeenCalled();
  });

  it("should call router.replace('/') as a fallback if canGoBack returns false", async () => {
    router.canGoBack.mockReturnValue(false);
    const { getByLabelText } = await render(<BackButton />);

    await fireEvent.press(getByLabelText("Back"));

    expect(router.replace).toHaveBeenCalledWith("/");
    expect(router.back).not.toHaveBeenCalled();
  });
});
