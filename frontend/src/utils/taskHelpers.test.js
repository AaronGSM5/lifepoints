import { calculateStepPoints, calculateTaskProgress } from "./taskHelpers";

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