import React from "react";

import { fireEvent, render } from "@testing-library/react-native";

import AppChip from "./AppChip";

describe("AppChip", () => {
  it("should report its selected state and call onPress", async () => {
    const handlePress = jest.fn();
    const { getByRole } = await render(<AppChip label="Food" isActive onPress={handlePress} />);

    const chip = getByRole("button");
    expect(chip.props.accessibilityState).toEqual({ selected: true });

    fireEvent.press(chip);
    expect(handlePress).toHaveBeenCalledTimes(1);
  });
});
