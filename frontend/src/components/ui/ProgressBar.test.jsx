import React from "react";

import { render } from "@testing-library/react-native";

import ProgressBar from "./ProgressBar";

describe("ProgressBar", () => {
  it("should expose the rounded progress as accessibility value", async () => {
    const { getByRole } = await render(<ProgressBar progress={42.6} accessibilityLabel="Fortschritt" />);

    const bar = getByRole("progressbar");

    expect(bar.props.accessibilityValue).toEqual({ min: 0, max: 100, now: 43 });
    expect(bar.props.accessibilityLabel).toBe("Fortschritt");
  });

  it("should clamp values outside of 0-100", async () => {
    const { getByRole, rerender } = await render(<ProgressBar progress={150} />);
    expect(getByRole("progressbar").props.accessibilityValue.now).toBe(100);

    await rerender(<ProgressBar progress={-20} />);
    expect(getByRole("progressbar").props.accessibilityValue.now).toBe(0);
  });

  it("should use a 4px track for the strip variant", async () => {
    const { getByRole } = await render(<ProgressBar progress={50} variant="strip" />);

    const style = [getByRole("progressbar").props.style].flat(Infinity).reduce((acc, s) => ({ ...acc, ...s }), {});
    expect(style.height).toBe(4);
  });
});
