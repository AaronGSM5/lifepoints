export const questCatalog = {
  today: [
    {
      id: "q_daily_01",
      title: "Log 2 tasks",
      points: 50,
      target: 2,
      trigger: "TASK_COMPLETED"
    },
    {
      id: "q_daily_02",
      title: "Invite a friend",
      points: 200,
      target: 1
    }
  ],
  week: [
    {
      id: "q_weekly_01",
      title: "Reach a 5-day streak",
      points: 500,
      target: 5
    },
    {
      id: "q_weekly_02",
      title: "Collect 1000 LifePoints in total",
      points: 1000,
      target: 1000
    },
    {
      id: "q_weekly_03",
      title: "Complete 3 tasks",
      points: 300,
      target: 3,
      trigger: "TASK_COMPLETED"
    }
  ]
};