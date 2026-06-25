import TaskServices from "./task.services.js";

const getHomePage = async () => {
  const data = {
    banner: {
      img: ""
    },
    activeTasks: await TaskServices.getTasks({ filter: { status: "active" } })
  };

  return data;
};

const getProfilePage = async () => {
  const data = {
    user: {
      img: "https://api.dicebear.com/7.x/pixel-art/svg?seed=aaron",
      level: "2",
      user_name: "new_user",
      display_name: "New User",
      ligue: "Couch",
      rank: "Couch Potato",
      description: "Täglich am Coden und produktiv bleiben!",
      xp: {
        current: 0,
        next: 1000
      }
    },
    onboarding: [
      { title: "Log your first task", lifepoints: 50, status: "done" },
      { title: "Add a Description", lifepoints: 15, status: "done" },
      { title: "Add profile picture", lifepoints: 10, status: "done" },
      { title: "Add your first friend", lifepoints: 20, status: "active" }
    ],
    stats: [
      { title: "Streak", value: "45" },
      { title: "Total Points", value: "3420" },
      { title: "Member since", value: "01/2026" }
    ],
    customizables: [
      {
        id: "default",
        title: "Default",
        owned: true
      },
      {
        id: "starter",
        title: "Starter",
        owned: true
      },
      {
        id: "neon_glow",
        title: "Neon Glow",
        owned: true
      },
      {
        id: "solar_flare",
        title: "Cyberpunk Theme",
        owned: false
      }
    ],
    trophies: [
      {
        id: "gym_rat",
        title: "Gym Rat",
        owned: true
      },
      {
        id: "early_riser",
        title: "Early Riser",
        owned: true
      },
      {
        id: "reader",
        title: "Reader",
        owned: true
      },
      {
        id: "sugar_free",
        title: "Sugar Free",
        owned: false
      }
    ],
    impact_journal: [
      {
        title: "Cleanings",
        date: "6/22/2026",
        lifepoints: 1000
      },
      {
        title: "Code Refactoring",
        date: "6/23/2026",
        lifepoints: 250
      },
      {
        title: "Daily Workout",
        date: "6/24/2026",
        lifepoints: 500
      }
    ]
  };

  return data;
};

export default { getProfilePage, getHomePage };
