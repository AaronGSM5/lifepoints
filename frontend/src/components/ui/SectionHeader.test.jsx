import React from "react";

import { fireEvent, render } from "@testing-library/react-native";

import SectionHeader from "./SectionHeader";

describe("SectionHeader", () => {
  it("should render the title and counter", async () => {
    const { getByText } = await render(<SectionHeader title="Due today" counter="1/3" />);

    expect(getByText("Due today")).toBeTruthy();
    expect(getByText("1/3")).toBeTruthy();
  });

  it("should render a labelled icon button for string rightIcon", async () => {
    const handlePress = jest.fn();
    const { getByLabelText } = await render(
      <SectionHeader title="Routines" rightIcon="add" rightIconLabel="Create routine" onRightPress={handlePress} />
    );

    fireEvent.press(getByLabelText("Create routine"));

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("should render a text link when rightLabel is set", async () => {
    const handlePress = jest.fn();
    const { getByText } = await render(
      <SectionHeader title="Trophies" rightLabel="See all" onRightPress={handlePress} />
    );

    fireEvent.press(getByText("See all"));

    expect(handlePress).toHaveBeenCalledTimes(1);
  });

  it("should toggle when collapsible and expose the expanded state", async () => {
    const handleToggle = jest.fn();
    const { getByRole } = await render(
      <SectionHeader title="Done Tasks" collapsible isCollapsed onToggle={handleToggle} />
    );

    const header = getByRole("button");
    expect(header.props.accessibilityState).toEqual({ expanded: false });

    fireEvent.press(header);

    expect(handleToggle).toHaveBeenCalledTimes(1);
  });
});
