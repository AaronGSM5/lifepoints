import { formatHistoryDate, formatTimeOrDate, getDateLabel, groupDataByDate, isSameDay } from "./dateHelpers";

describe("formatTimeOrDate", () => {
  it("should return an empty string if no isoString is provided", () => {
    expect(formatTimeOrDate(null)).toBe("");
    expect(formatTimeOrDate(undefined)).toBe("");
    expect(formatTimeOrDate("")).toBe("");
  });

  it("should return a time string if the date is today", () => {
    const todayIso = new Date().toISOString();
    const result = formatTimeOrDate(todayIso);

    expect(result).toMatch(/\d{1,2}:\d{2}/);
  });

  it("should return a date string if the date is in the past", () => {
    const pastIso = "2020-05-22T10:00:00.000Z";
    const result = formatTimeOrDate(pastIso);

    expect(typeof result).toBe("string");
    expect(result.length).toBeGreaterThan(0);
    expect(result).toMatch(/\d/);
  });
})

describe("groupDataByDate", () => {
  const mockT = (key) => key;

  beforeAll(() => {
    // Freeze time
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-08-14T12:00:00.000Z"));
  });

  afterAll(() => {
    // use real time again
    jest.useRealTimers();
  });

  it('should return an empty array if data is null or emtpy', () => {
    expect(groupDataByDate(null, "createdAt", mockT)).toEqual([])
    expect(groupDataByDate([], "createdAt", mockT)).toEqual([])
  })

  it('should group data into Today, Yesterday, and older dates', () => {
    const testData = [
      { id: 1, title: "Aktion 1", createdAt: "2026-08-14T09:00:00.000Z" }, // Today
      { id: 2, title: "Aktion 2", createdAt: "2026-08-14T15:30:00.000Z" }, // Today
      { id: 3, title: "Aktion 3", createdAt: "2026-08-13T10:00:00.000Z" }, // Yesterday
      { id: 4, title: "Aktion 4", createdAt: "2026-08-01T10:00:00.000Z" }, // Older
    ];

    const result = groupDataByDate(testData, "createdAt", mockT)

    expect(result).toHaveLength(3)

    expect(result[0].title).toBe("Today")
    expect(result[0].data).toHaveLength(2)
    expect(result[0].data[0].id).toBe(1)

    expect(result[1].title).toBe("Yesterday")
    expect(result[1].data).toHaveLength(1)
    expect(result[1].data[0].id).toBe(3)

    expect(result[2].title).not.toBe("Today")
    expect(result[2].title).not.toBe("Yesterday")
    expect(result[2].data).toHaveLength(1)
    expect(result[2].data[0].id).toBe(4)
  })
})

describe("isSameDay", () => {
  it("should return false on missing or invalid dates", () => {
    expect(isSameDay()).toBe(false)
    expect(isSameDay("", "")).toBe(false)
    expect(isSameDay([], [])).toBe(false)
  })

  it("should return true if dates are on the same day", () => {
    expect(isSameDay("2026-08-14T09:00:00.000Z", "2026-08-14T15:30:00.000Z")).toBe(true)
  })

  it("should return false if dates are on different days", () => {
    expect(isSameDay("2026-08-14T09:00:00.000Z", "2026-08-12T15:30:00.000Z")).toBe(false)
  })
})

describe("getDateLabel", () => {
  const mockT = (key) => key

  beforeAll(() => {
    // Freeze time
    jest.useFakeTimers();
    jest.setSystemTime(new Date("2026-08-14T12:00:00.000Z"));
  });

  afterAll(() => {
    // use real time again
    jest.useRealTimers();
  });

  it("should return empty string on missing or invalid date", () => {
    expect(getDateLabel("Friday", mockT, "en-US")).toBe("")
    expect(getDateLabel("", mockT, "en-US")).toBe("")
    expect(getDateLabel(undefined, mockT, "en-US")).toBe("")
    expect(getDateLabel([], mockT, "en-US")).toBe("")
    expect(getDateLabel({}, mockT, "en-US")).toBe("")
  })

  it("should return 'Today' if day difference is 0", () => {
    expect(getDateLabel("2026-08-14T09:00:00.000Z", mockT, "en-US")).toBe("Today")
  })

  it("should return 'Yesterday' if day difference is 1", () => {
    expect(getDateLabel("2026-08-13T09:00:00.000Z", mockT, "en-US")).toBe("Yesterday")
  })

  it("should return Weekday if day difference is between 1 to 7", () => {
    expect(getDateLabel("2026-08-10T09:00:00.000Z", mockT, "en-US")).toBe("Monday")
  })

  it("should return long Date if day difference is more than 7", () => {
    expect(getDateLabel("2026-08-06T09:00:00.000Z", mockT, "en-US")).toBe("Thu Aug 6")
  })
})

describe("formatHistoryDate", () => {
  it('should return "" on no isoString', () => {
    expect(formatHistoryDate(undefined)).toBe("")
    expect(formatHistoryDate(null)).toBe("")
    expect(formatHistoryDate()).toBe("")
  })

  it('should return "" on invalid isoString', () => {
    expect(formatHistoryDate("thisIsNotAnIsoString")).toBe("")
    expect(formatHistoryDate(27)).toBe("")
    expect(formatHistoryDate([])).toBe("")
    expect(formatHistoryDate({})).toBe("")
  })

  it('should return date and time in correct English format', () => {
    expect(formatHistoryDate("2026-08-14T09:00:00.000Z", "en-GB")).toBe("14/08/2026 • 11:00");
  });

  it('should return date and time in correct German format', () => {
    expect(formatHistoryDate("2026-08-14T09:00:00.000Z", "de-DE")).toBe("14.8.2026 • 11:00");
  });
})