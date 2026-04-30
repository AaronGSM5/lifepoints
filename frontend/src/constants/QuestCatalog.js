export const questCatalog = {
  today: [
    {
      id: "q_daily_01",
      title: "Logge 2 Tasks",
      points: 50,
      target: 2,
      trigger: "TASK_COMPLETED"
    },
    {
      id: "q_daily_02",
      title: "Lade einen Freund ein",
      points: 200,
      target: 1
    }
  ],
  week: [
    {
      id: "q_weekly_01",
      title: "Erreiche einen 5-Tage Streak",
      points: 500,
      target: 5
    },
    {
      id: "q_weekly_02",
      title: "Sammle insgesamt 1000 Lifepoints",
      points: 1000,
      target: 1000
    },
    {
      id: "q_weekly_03",
      title: "Schließe 3 Tasks ab",
      points: 300,
      target: 3,
      trigger: "TASK_COMPLETED"
    }
  ]
};