import { calculateStepPoints, calculateTaskProgress, normalizeTask } from "./taskHelpers";

describe("calculateTaskProgress", () => {
  it("should return 0 if no substeps exist", () => {
    expect(calculateTaskProgress(undefined)).toBe(0)
    expect(calculateTaskProgress([])).toBe(0)
  })

  it("should calculate the correct progress", () => {
    const mockSteps = [
      { id: '1', completed: true },
      { id: '2', completed: false }
    ]
    expect(calculateTaskProgress(mockSteps)).toBe(50)
  })

  it("should round the progress", () => {
    const mockSteps = [
      { id: '1', completed: true },
      { id: '2', completed: false },
      { id: '3', completed: false },
    ]
    expect(calculateTaskProgress(mockSteps)).toBe(33)
  })
})

describe("calculateStepPoints", () => {
  it('should return 0 on invalid substeps or missing lp', () => {
    expect(calculateStepPoints([], 100)).toBe(0)
    expect(calculateStepPoints(undefined, 100)).toBe(0)
    expect(calculateStepPoints([{ id: "1" }], null)).toBe(0)
    expect(calculateStepPoints([{ id: "1" }], "100")).toBe(0)
    expect(calculateStepPoints([{ id: "1" }], -50)).toBe(0)
  })

  it('should calculate the correct rouded points per substeps', () => {
    const mockSteps = [
      { id: "1", completed: false },
      { id: "2", completed: false },
      { id: "3", completed: false },
    ]
    expect(calculateStepPoints(mockSteps, 100)).toBe(33)
  })

  it('should split the LP if its even', () => {
    const mockSteps = [
      { id: "1", completed: false },
      { id: "2", completed: false },
    ]
    expect(calculateStepPoints(mockSteps, 100)).toBe(50)
  })
})

describe("normalizeTask", () => {
  it("should normalize an API task (lifepoints, category array, _id)", () => {
    expect(normalizeTask({ _id: "abc", title: "T", lifepoints: 15, category: ["Health", "X"], icon: "water" })).toEqual({
      id: "abc",
      title: "T",
      description: undefined,
      category: "Health",
      icon: "water",
      lp: 15,
      xp: 15
    });
  });

  it("should keep lp and xp from static catalog tasks", () => {
    expect(normalizeTask({ id: 1, title: "Bed Boost", lp: 1000, xp: 500, category: "selfcare" })).toMatchObject({
      id: 1,
      lp: 1000,
      xp: 500,
      category: "selfcare"
    });
  });

  it("should return null for invalid input", () => {
    expect(normalizeTask(null)).toBeNull();
    expect(normalizeTask("1")).toBeNull();
    expect(normalizeTask({ title: "no id" })).toBeNull();
  });
});
