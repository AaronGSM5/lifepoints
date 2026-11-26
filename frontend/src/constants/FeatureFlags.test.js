import { FEATURES, isFeatureEnabled, isRouteEnabled } from "./FeatureFlags";

describe("FeatureFlags", () => {
  it("should treat missing flags as enabled", () => {
    expect(isFeatureEnabled(undefined)).toBe(true);
    expect(isFeatureEnabled("unknownFlag")).toBe(true);
  });

  it("should keep the MVP core loop enabled", () => {
    expect(isRouteEnabled(["(tabs)", "home"])).toBe(true);
    expect(isRouteEnabled(["(tabs)", "tasks"])).toBe(true);
    expect(isRouteEnabled(["(tabs)", "social"])).toBe(true);
    expect(isRouteEnabled(["(tabs)", "profile"])).toBe(true);
    expect(isRouteEnabled(["task", "[id]"])).toBe(true);
    expect(isRouteEnabled(["post", "create"])).toBe(true);
    expect(isRouteEnabled(["user", "[username]"])).toBe(true);
    expect(isRouteEnabled(["auth", "login"])).toBe(true);
    expect(isRouteEnabled(["setting", "edit-profile"])).toBe(true);
    expect(isRouteEnabled([])).toBe(true);
  });

  it("should block routes of disabled features", () => {
    expect(FEATURES.shop).toBe(false);
    expect(isRouteEnabled(["(tabs)", "shop"])).toBe(false);
    expect(isRouteEnabled(["reward", "[id]"])).toBe(false);
    expect(isRouteEnabled(["chat", "[id]"])).toBe(false);
    expect(isRouteEnabled(["mycommunity", "[id]", "details"])).toBe(false);
    expect(isRouteEnabled(["routine", "public", "[id]"])).toBe(false);
    expect(isRouteEnabled(["setting", "subscription"])).toBe(false);
    expect(isRouteEnabled(["(onboarding)", "survey"])).toBe(false);
  });

  it("should match by path prefix, not by substring", () => {
    // "settings" darf nicht von "setting/…"-Regeln erfasst werden
    expect(isRouteEnabled(["settings"])).toBe(true);
    expect(isRouteEnabled(["setting", "notifications-extra"])).toBe(true);
  });
});
