import { checkQuestCompletion } from "./onboardingGuideHelpers";

describe("checkQuestCompletion", () => {
  const testProfile = { description: "Description of me", avatar: "IMG", friends: ["Aaron", "Tom"] }
  const testActivities = ["first", "second"]

  it("should return false on missing data", () => {
    expect(checkQuestCompletion()).toBe(false)
    expect(checkQuestCompletion(2)).toBe(false)
  })

  it("should validate questId", () => {
    expect(checkQuestCompletion(2, testProfile, testActivities)).toBe(true)
    expect(checkQuestCompletion(5, testProfile, testActivities)).toBe(false)
    expect(checkQuestCompletion(-5, testProfile, testActivities)).toBe(false)
    expect(checkQuestCompletion(10, testProfile, testActivities)).toBe(false)
    expect(checkQuestCompletion("test", testProfile, testActivities)).toBe(false)
    expect(checkQuestCompletion("", testProfile, testActivities)).toBe(false)
    expect(checkQuestCompletion(null, testProfile, testActivities)).toBe(false)
    expect(checkQuestCompletion(undefined, testProfile, testActivities)).toBe(false)
  })

  it("should check if the user tracked his first activity", () => {
    expect(checkQuestCompletion(1, testProfile, testActivities)).toBe(true)
    expect(checkQuestCompletion(1, testProfile, [])).toBe(false)
  })

  it("should check if the user has a description", () => {
    expect(checkQuestCompletion(2, testProfile, testActivities)).toBe(true)
    expect(checkQuestCompletion(2, { description: "" }, testActivities)).toBe(false)
    expect(checkQuestCompletion(2, {}, testActivities)).toBe(false)
  })

  it("should check if the user has added an avatar", () => {
    expect(checkQuestCompletion(3, testProfile, testActivities)).toBe(true)
    expect(checkQuestCompletion(3, { avatar: "" }, testActivities)).toBe(false)
    expect(checkQuestCompletion(3, {}, testActivities)).toBe(false)
  })

  it("should check if the user has added his first friend", () => {
    expect(checkQuestCompletion(4, testProfile, testActivities)).toBe(true)
    expect(checkQuestCompletion(4, { friends: "" }, testActivities)).toBe(false)
    expect(checkQuestCompletion(4, { friends: [] }, testActivities)).toBe(false)
    expect(checkQuestCompletion(4, {}, testActivities)).toBe(false)
  })
})