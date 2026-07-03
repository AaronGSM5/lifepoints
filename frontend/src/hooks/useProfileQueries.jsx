import { useQuery } from "@tanstack/react-query";

export const apiBaseUrl = "http://localhost:3000/api/v1";

export const profileKeys = {
  me: ["profile", "me"]
};

export const useMyProfile = () => {
  return useQuery({
    queryKey: profileKeys.me,
    queryFn: async () => {
      const res = await fetch(`${apiBaseUrl}/pages/user`);
      if (!res.ok) throw new Error("Error fetching profile");
      const rawData = await res.json();
      return {
        id: "me",
        avatar: rawData.user.img,
        level: rawData.user.level,
        username: rawData.user.user_name,
        name: rawData.user.display_name,
        leagueName: rawData.user.ligue,
        rankName: rawData.user.rank,
        description: rawData.user.description,
        profileXp: rawData.user.xp.current,
        maxXp: rawData.user.xp.next,
        tutorialSteps: rawData.onboarding.map((step, index) => ({
          id: `quest_${index}`,
          title: step.title,
          reward: step.lifepoints,
          completed: step.status === "done",
          icon: "checkmark"
        })),
        stats: rawData.stats.map((stat) => ({
          label: stat.title.toUpperCase(),
          value: stat.value,
          icon: stat.title.includes("Streak") ? "fire" : stat.title.includes("Points") ? "gem" : "calendar",
          color: stat.title.includes("Streak") ? "#FF5733" : "#007ec7"
        })),
        customizables: rawData.customizables.map((c) => ({
          id: c.id,
          name: c.title,
          unlocked: c.owned,
          icon: "star",
          color: "#fff"
        })),
        trophies: rawData.trophies.map((t) => ({
          id: t.id,
          title: t.title,
          unlocked: t.owned,
          icon: "trophy"
        })),
        activities: rawData.impact_journal.map((j, index) => ({
          id: `journal_${index}`,
          title: j.title,
          time: j.date,
          points: j.lifepoints,
          type: "earn"
        }))
      };
    }
  });
};
