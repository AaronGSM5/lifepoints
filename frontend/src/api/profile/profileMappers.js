export const mapUserProfileData = (data) => {
  return {
    id: "me",
    avatar: data.user.img,
    level: data.user.level,
    username: data.user.user_name,
    name: data.user.display_name,
    leagueName: data.user.ligue,
    rankName: data.user.rank,
    description: data.user.description,
    profileXp: data.user.xp.current,
    maxXp: data.user.xp.next,
    tutorialSteps: data.onboarding.map((step, index) => ({
      id: `quest_${index}`,
      title: step.title,
      reward: step.lifepoints,
      completed: step.status === "done",
      icon: "checkmark"
    })),
    stats: data.stats.map((stat) => ({
      label: stat.title.toUpperCase(),
      value: stat.value,
      icon: stat.title.includes("Streak") ? "fire" : stat.title.includes("Points") ? "gem" : "calendar",
      color: stat.title.includes("Streak") ? "#FF5733" : "#007ec7"
    })),
    customizables: data.customizables.map((c) => ({
      id: c.id,
      name: c.title,
      unlocked: c.owned,
      icon: "star",
      color: "#fff"
    })),
    trophies: data.trophies.map((t) => ({
      id: t.id,
      title: t.title,
      unlocked: t.owned,
      icon: "trophy"
    })),
    activities: data.impact_journal.map((j, index) => ({
      id: `journal_${index}`,
      title: j.title,
      time: j.date,
      points: j.lifepoints,
      type: "earn"
    }))
  }
}