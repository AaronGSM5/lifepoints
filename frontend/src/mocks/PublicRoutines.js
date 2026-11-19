import { publicProfiles } from "@/mocks/PublicProfile";

// Öffentliche Routinen (z. B. von Creatorn), die Nutzer als eigene Kopie übernehmen können.
// taskId verweist auf tasksCatalog (src/constants/TasksCatalog.js),
// authorUsername auf publicProfiles (src/mocks/PublicProfile.js).
export const mockPublicRoutines = [
  {
    id: "pub_morning_glow",
    title: "Morning Glow",
    icon: "sun",
    authorUsername: "Velo_Mind",
    description: "Start the day hydrated and moving: three small wins before breakfast.",
    category: "selfcare",
    frequency: { type: "daily", days: [], timesPerWeek: 3 },
    adopters: 1240,
    recommended: true,
    tasks: [
      { taskId: 1, substeps: [] },
      {
        taskId: 5,
        substeps: [
          { title: "Glass of water", description: "Right after waking up" },
          { title: "Second glass", description: "With breakfast" }
        ]
      },
      { taskId: 11, substeps: [] }
    ]
  },
  {
    id: "pub_desk_reset",
    title: "Desk Reset",
    icon: "techCat",
    authorUsername: "PixelPionier",
    description: "Short resets between work sessions to keep your body and eyes fresh.",
    category: "health",
    frequency: { type: "weekdays", days: [1, 2, 3, 4, 5], timesPerWeek: 3 },
    adopters: 860,
    recommended: true,
    tasks: [
      { taskId: 7, substeps: [] },
      { taskId: 9, substeps: [] },
      { taskId: 6, substeps: [] }
    ]
  },
  {
    id: "pub_strong_week",
    title: "Strong Week",
    icon: "dumbbell",
    authorUsername: "Zest_Runner",
    description: "Three short strength sessions a week, any day you like.",
    category: "health",
    frequency: { type: "weekly", days: [], timesPerWeek: 3 },
    adopters: 2310,
    recommended: true,
    tasks: [
      {
        taskId: 8,
        substeps: [
          { title: "5 squats", description: "" },
          { title: "5 push-ups", description: "" },
          { title: "5 sit-ups", description: "" }
        ]
      },
      { taskId: 11, substeps: [] }
    ]
  },
  {
    id: "pub_evening_wind_down",
    title: "Evening Wind-Down",
    icon: "moon",
    authorUsername: "Nox_Echo",
    description: "Prepare tomorrow and calm your mind before going to sleep.",
    category: "selfcare",
    frequency: { type: "daily", days: [], timesPerWeek: 3 },
    adopters: 1580,
    recommended: true,
    tasks: [
      { taskId: 10, substeps: [] },
      { taskId: 2, substeps: [] },
      { taskId: 6, substeps: [] }
    ]
  },
  {
    id: "pub_kindness_weekend",
    title: "Kindness Weekend",
    icon: "heart",
    authorUsername: "Nox_Echo",
    description: "Use your weekend to brighten someone else's day.",
    category: "social",
    frequency: { type: "weekdays", days: [0, 6], timesPerWeek: 3 },
    adopters: 640,
    recommended: false,
    tasks: [
      { taskId: 12, substeps: [] },
      { taskId: 13, substeps: [] },
      { taskId: 3, substeps: [] }
    ]
  },
  {
    id: "pub_digital_detox",
    title: "Digital Detox",
    icon: "leaf",
    authorUsername: "PixelPionier",
    description: "Clean up your digital life twice a week.",
    category: "digital",
    frequency: { type: "weekly", days: [], timesPerWeek: 2 },
    adopters: 410,
    recommended: false,
    tasks: [
      { taskId: 14, substeps: [] },
      { taskId: 15, substeps: [] }
    ]
  }
];

// Anzeige-Daten eines Publishers (Fallback auf den Username, falls kein Profil existiert)
export const getAuthorProfile = (username) => {
  if (!username) return null;
  const profile = publicProfiles.find((entry) => entry.username === username);
  return { username, name: profile?.name || username, avatar: profile?.avatar || null };
};

export const getPublicRoutineById = (id) => mockPublicRoutines.find((routine) => routine.id === id);

export const getPublicRoutinesByAuthor = (username) =>
  mockPublicRoutines.filter((routine) => routine.authorUsername === username);
