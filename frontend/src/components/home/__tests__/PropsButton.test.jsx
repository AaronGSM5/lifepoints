import React from "react";

import { fireEvent, render } from "@testing-library/react-native";
import * as Haptics from "expo-haptics";

import PropsButton from "../PropsButton";

jest.mock("expo-haptics", () => ({
  impactAsync: jest.fn(() => Promise.resolve()),
  ImpactFeedbackStyle: { Light: "light" }
}));

describe("PropsButton", () => {
  beforeEach(() => jest.clearAllMocks());

  it("zeigt 'Props' und gibt beim Aktivieren Haptik", async () => {
    const onToggle = jest.fn();
    const { getByRole, getByText } = await render(<PropsButton isActive={false} onToggle={onToggle} />);

    expect(getByText("Props")).toBeTruthy();
    const button = getByRole("button");
    expect(button.props.accessibilityLabel).toBe("Give props");
    expect(button.props.accessibilityState.selected).toBe(false);

    fireEvent.press(button);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(Haptics.impactAsync).toHaveBeenCalledWith("light");
  });

  it("gibt beim Zurücknehmen keine Haptik", async () => {
    const onToggle = jest.fn();
    const { getByRole } = await render(<PropsButton isActive onToggle={onToggle} />);

    const button = getByRole("button");
    expect(button.props.accessibilityLabel).toBe("Take back props");
    expect(button.props.accessibilityState.selected).toBe(true);

    fireEvent.press(button);
    expect(onToggle).toHaveBeenCalledTimes(1);
    expect(Haptics.impactAsync).not.toHaveBeenCalled();
  });
});
