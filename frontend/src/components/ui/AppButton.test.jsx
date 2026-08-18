import React from "react";
import { View } from "react-native";

import { fireEvent, render } from "@testing-library/react-native";

import AppButton from "./AppButton";

describe("AppButton", () => {
  it("should render title and trigger onPress when clicked", async () => {
    const handlePress = jest.fn();

    const { getByText } = await render(<AppButton onPress={handlePress} title="Click me" />);

    const buttonElement = getByText("Click me");

    expect(buttonElement).toBeTruthy();

    fireEvent.press(buttonElement);

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("should not trigger onPress when disabled is true", async () => {
    const handlePress = jest.fn();

    const { getByRole } = await render(<AppButton onPress={handlePress} title="Locked" disabled />);

    const button = getByRole("button");

    fireEvent.press(button);

    expect(handlePress).not.toHaveBeenCalled();
  });

  it("should display loading spinner and not trigger onPress when loading is true", async () => {
    const handlePress = jest.fn();

    const { queryByText, getByRole } = await render(<AppButton onPress={handlePress} title="Locked" loading />);

    const button = getByRole("button");

    fireEvent.press(button);

    expect(handlePress).not.toHaveBeenCalled();
    expect(queryByText("Locked")).toBe(null);
  });

  it("should render icon when provided", async () => {
    const handlePress = jest.fn();
    const mockIcon = <View testID="button-icon" />;

    const { getByTestId, getByText } = await render(
      <AppButton onPress={handlePress} title="With Icon" icon={mockIcon} />
    );
    expect(getByTestId("button-icon")).toBeTruthy();
    expect(getByText("With Icon")).toBeTruthy();
  });
});
