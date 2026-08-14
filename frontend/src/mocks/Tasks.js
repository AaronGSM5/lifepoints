import { addOpacity } from "@/utils/colorHelpers";

export const mockActiveTasks = [
  {
    id: 1,
    title: "10-Min Morning Stretch",
    icon: { name: "sun", color: "#d6c100", bg: addOpacity("#d6c100", 0.1) },
    lp: 10,
    substeps: [
      { _id: "s1", title: "Roll out mat", description: "Prepare your space", completed: true },
      { _id: "s2", title: "Neck stretches", description: "Release tension", completed: false }
    ]
  },
  {
    id: 2,
    title: "Deep Work: Coding",
    icon: { name: "code", color: "#dbe2fb", bg: "#2d3448" },
    lp: 6,
    substeps: [
      { _id: "s1", title: "Fes ting", description: "Open VS Code", completed: false },
      { _id: "s2", title: "Mi Bombo!", description: "Get into hyperfocus", completed: false }
    ]
  }
]

export const mockFYTasks = [
  {
    id: 1,
    title: "10-Min Morning Stretch",
    icon: { name: "sun", color: "#d6c100", bg: addOpacity("#d6c100", 0.1) },
    lp: 10
  },
  {
    id: 2,
    title: "Deep Work: Coding",
    icon: { name: "code", color: "#dbe2fb", bg: "#2d3448" },
    lp: 20
  }
];