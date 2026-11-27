import React from "react";
import { Text } from "react-native";

import { fireEvent, render } from "@testing-library/react-native";
import { useRouter } from "expo-router";

import DetailScreen from "./DetailScreen";

jest.mock("expo-router", () => ({
  ...jest.requireActual("../../../__mocks__/expo-router"),
  Stack: { Screen: () => null }
}));

jest.mock("@/components/ui/AppSkeleton", () => {
  const { View } = require("react-native");
  return function AppSkeleton() {
    return <View testID="skeleton" />;
  };
});

describe("DetailScreen", () => {
  const router = useRouter();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders a skeleton instead of content while loading", async () => {
    const { getByTestId, queryByText } = await render(
      <DetailScreen isLoading footer={<Text>CTA</Text>}>
        <Text>Inhalt</Text>
      </DetailScreen>
    );

    expect(getByTestId("detail-screen-skeleton")).toBeTruthy();
    expect(queryByText("Inhalt")).toBeNull();
    expect(queryByText("CTA")).toBeNull();
  });

  it("renders the not-found state with a back action", async () => {
    router.canGoBack.mockReturnValue(true);
    const { getByText, queryByText } = await render(
      <DetailScreen isNotFound notFoundTitle="Task not found">
        <Text>Inhalt</Text>
      </DetailScreen>
    );

    expect(getByText("Task not found")).toBeTruthy();
    expect(queryByText("Inhalt")).toBeNull();

    await fireEvent.press(getByText("back"));
    expect(router.back).toHaveBeenCalledTimes(1);
  });

  it("renders hero, content and footer when data is available", async () => {
    const { getByText } = await render(
      <DetailScreen hero={<Text>Hero</Text>} footer={<Text>CTA</Text>}>
        <Text>Inhalt</Text>
      </DetailScreen>
    );

    expect(getByText("Hero")).toBeTruthy();
    expect(getByText("Inhalt")).toBeTruthy();
    expect(getByText("CTA")).toBeTruthy();
  });
});
