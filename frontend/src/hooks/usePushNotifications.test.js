import { renderHook } from "@testing-library/react-native";
import * as Notifications from "expo-notifications";

import useStore from "@/store/useStore";

import { usePushNotifications } from "./usePushNotifications";

jest.mock("expo-notifications", () => ({
  setNotificationHandler: jest.fn(),
  getPermissionsAsync: jest.fn(),
  requestPermissionsAsync: jest.fn(),
  getExpoPushTokenAsync: jest.fn(),
}));

jest.mock("@/store/useStore");

const waitForAsync = () => new Promise((resolve) => setImmediate(resolve));

describe("usePushNotifications", () => {
  const mockSetNotificationPermissionSettings = jest.fn()
  let consoleSpy;

  beforeEach(() => {
    jest.clearAllMocks()
    consoleSpy = jest.spyOn(console, "log").mockImplementation(() => { });
  })

  afterEach(() => {
    consoleSpy.mockRestore();
  })

  it("should return early if hasSeenPrompt is true", async () => {
    useStore.mockImplementation((selector) => selector({
      profile: { hasSeenNotificationPrompt: true },
      setNotificationPermissionSettings: mockSetNotificationPermissionSettings
    }))

    renderHook(() => usePushNotifications())

    await waitForAsync()

    expect(Notifications.getPermissionsAsync).not.toHaveBeenCalled()
    expect(mockSetNotificationPermissionSettings).not.toHaveBeenCalled()
  })

  it("should skip requesting permissions if existing status is granted, fetch token and update store", async () => {
    useStore.mockImplementation((selector) => selector({
      profile: { hasSeenNotificationPrompt: false },
      setNotificationPermissionSettings: mockSetNotificationPermissionSettings
    }))
    Notifications.getPermissionsAsync.mockResolvedValueOnce({ status: "granted" })
    Notifications.getExpoPushTokenAsync.mockResolvedValueOnce({ data: "expo-token-123" })

    renderHook(() => usePushNotifications())

    await waitForAsync()

    expect(Notifications.getPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(Notifications.requestPermissionsAsync).not.toHaveBeenCalled();
    expect(Notifications.getExpoPushTokenAsync).toHaveBeenCalledTimes(1);
    expect(mockSetNotificationPermissionSettings).toHaveBeenCalledWith(true, "expo-token-123");
  })

  it("should request permissions if existing status is not granted, then fetch token when granted", async () => {
    useStore.mockImplementation((selector) =>
      selector({
        profile: { hasSeenNotificationPrompt: false },
        setNotificationPermissionSettings: mockSetNotificationPermissionSettings,
      })
    );

    Notifications.getPermissionsAsync.mockResolvedValueOnce({ status: "undetermined" });
    Notifications.requestPermissionsAsync.mockResolvedValueOnce({ status: "granted" });
    Notifications.getExpoPushTokenAsync.mockResolvedValueOnce({ data: "expo-token-456" });

    renderHook(() => usePushNotifications());

    await waitForAsync();

    expect(Notifications.getPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(Notifications.requestPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(Notifications.getExpoPushTokenAsync).toHaveBeenCalledTimes(1);
    expect(mockSetNotificationPermissionSettings).toHaveBeenCalledWith(true, "expo-token-456");
  });

  it("should handle denied permissions and update store with null token", async () => {
    useStore.mockImplementation((selector) =>
      selector({
        profile: { hasSeenNotificationPrompt: false },
        setNotificationPermissionSettings: mockSetNotificationPermissionSettings,
      })
    );

    Notifications.getPermissionsAsync.mockResolvedValueOnce({ status: "denied" });
    Notifications.requestPermissionsAsync.mockResolvedValueOnce({ status: "denied" });

    renderHook(() => usePushNotifications());

    await waitForAsync();

    expect(Notifications.getPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(Notifications.requestPermissionsAsync).toHaveBeenCalledTimes(1);
    expect(Notifications.getExpoPushTokenAsync).not.toHaveBeenCalled();
    expect(mockSetNotificationPermissionSettings).toHaveBeenCalledWith(true, null);
  });

  it("should catch errors gracefully and update store with null token", async () => {
    useStore.mockImplementation((selector) =>
      selector({
        profile: { hasSeenNotificationPrompt: false },
        setNotificationPermissionSettings: mockSetNotificationPermissionSettings,
      })
    );

    Notifications.getPermissionsAsync.mockRejectedValueOnce(new Error("Native error"));

    renderHook(() => usePushNotifications());

    await waitForAsync();

    expect(mockSetNotificationPermissionSettings).toHaveBeenCalledWith(true, null);
  });
});