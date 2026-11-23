import React from "react";
import { AccessibilityInfo, Text } from "react-native";

import { fireEvent, render, renderHook, waitFor } from "@testing-library/react-native";

import { Icon } from "@/components/icons/Icon";
import NavbarItem from "@/components/layout/NavbarItem";
import AppInput from "@/components/ui/AppInput";
import AppModal from "@/components/ui/AppModal";
import AppText from "@/components/ui/AppText";
import { useReducedMotion } from "@/hooks/useReducedMotion";

// Durchsucht den gerenderten JSON-Baum nach Knoten, deren Props das Prädikat erfüllen.
const findInTree = (node, predicate, found = []) => {
  if (!node) return found;
  if (Array.isArray(node)) {
    node.forEach((child) => findInTree(child, predicate, found));
    return found;
  }
  if (typeof node === "object") {
    if (node.props && predicate(node.props)) found.push(node);
    findInTree(node.children, predicate, found);
  }
  return found;
};

describe("Barrierefreiheit der UI-Primitive", () => {
  it("NavbarItem ist ein beschrifteter Tab mit selected-State", async () => {
    const onPress = jest.fn();
    const { getByRole } = await render(<NavbarItem route={{ name: "tasks" }} isFocused onPress={onPress} />);

    const tab = getByRole("tab", { name: "tab_tasks" });
    expect(tab.props.accessibilityState).toEqual(expect.objectContaining({ selected: true }));

    fireEvent.press(tab);
    expect(onPress).toHaveBeenCalledTimes(1);
  });

  it("AppText mit type h1/h2/title wird als Überschrift ausgegeben", async () => {
    const { getByRole, queryByRole } = await render(
      <>
        <AppText type="h1">Titel</AppText>
        <AppText>Fließtext</AppText>
      </>
    );

    expect(getByRole("header", { name: "Titel" })).toBeTruthy();
    expect(queryByRole("header", { name: "Fließtext" })).toBeNull();
  });

  it("AppInput verknüpft Label und Fehlermeldung mit dem Eingabefeld", async () => {
    const { getByLabelText } = await render(<AppInput label="E-Mail" error="Ungültige E-Mail" value="" />);

    const input = getByLabelText("E-Mail");
    expect(input.props.accessibilityHint).toBe("Ungültige E-Mail");
    expect(input.props.accessibilityRole).toBeUndefined();
  });

  it("AppInput beschriftet das rechte Icon", async () => {
    const onRightIconPress = jest.fn();
    const { getByRole } = await render(
      <AppInput
        placeholder="Passwort"
        rightIcon="eyeOpen"
        rightIconLabel="Passwort anzeigen"
        onRightIconPress={onRightIconPress}
      />
    );

    fireEvent.press(getByRole("button", { name: "Passwort anzeigen" }));
    expect(onRightIconPress).toHaveBeenCalledTimes(1);
  });

  it("AppModal markiert den Inhalt als modal und bietet ein beschriftetes Backdrop", async () => {
    const onClose = jest.fn();
    const { getByRole, toJSON } = await render(
      <AppModal visible onClose={onClose}>
        <Text>Inhalt</Text>
      </AppModal>
    );

    fireEvent.press(getByRole("button", { name: "close" }));
    expect(onClose).toHaveBeenCalledTimes(1);

    const modalContent = findInTree(toJSON(), (props) => props.accessibilityViewIsModal === true);
    expect(modalContent.length).toBeGreaterThan(0);
  });

  it("Klickbares Icon ist ein beschrifteter Button, dekoratives Icon ist versteckt", async () => {
    const onPress = jest.fn();
    const { getByRole, toJSON } = await render(
      <>
        <Icon name="settings" onPress={onPress} accessibilityLabel="Einstellungen" />
        <Icon name="settings" />
      </>
    );

    fireEvent.press(getByRole("button", { name: "Einstellungen" }));
    expect(onPress).toHaveBeenCalledTimes(1);
    const hidden = findInTree(toJSON(), (props) => props.importantForAccessibility === "no-hide-descendants");
    expect(hidden.length).toBe(1);
  });
});

describe("useReducedMotion", () => {
  afterEach(() => jest.restoreAllMocks());

  it("übernimmt die Systemeinstellung", async () => {
    jest.spyOn(AccessibilityInfo, "isReduceMotionEnabled").mockResolvedValue(true);
    const { result } = await renderHook(() => useReducedMotion());

    await waitFor(() => expect(result.current).toBe(true));
  });

  it("ist standardmäßig false", async () => {
    jest.spyOn(AccessibilityInfo, "isReduceMotionEnabled").mockResolvedValue(false);
    const { result } = await renderHook(() => useReducedMotion());

    await waitFor(() => expect(result.current).toBe(false));
  });
});
