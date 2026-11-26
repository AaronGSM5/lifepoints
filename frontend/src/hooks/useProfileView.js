import { useMemo } from "react";

import { useMyProfile } from "@/api/profile/useMyProfile";
import useStore from "@/store/useStore";
import { getRequiredXpForNextLevel } from "@/utils/xpHelpers";

// MVP: Fortschritt (Level, XP, Journal) entsteht lokal im Store, solange Task-Abschlüsse nicht
// ans Backend synchronisiert werden. Stammdaten (Name, Avatar, …) kommen aus /pages/user, falls erreichbar.
export const mapActivityToJournalEntry = (activity) => ({
  id: activity.id,
  title: activity.title,
  time: activity.time,
  points: activity.points,
  type: "earn"
});

export const useProfileView = () => {
  const { data: apiProfile, isLoading, isError, failureCount } = useMyProfile();
  const localProfile = useStore((state) => state.profile);
  const activities = useStore((state) => state.activities);

  const profileData = useMemo(() => {
    const base = apiProfile || {};
    const level = localProfile?.level || base.level || 1;
    // Lokal bearbeitete Stammdaten haben Vorrang, bis /profile/update im Backend existiert
    const preferLocal = Boolean(localProfile?.hasLocalProfileEdits);
    const pick = (key) => (preferLocal ? localProfile?.[key] || base[key] : base[key] || localProfile?.[key]);

    return {
      ...base,
      name: pick("name"),
      username: pick("username"),
      avatar: pick("avatar"),
      description: pick("description"),
      activeFrame: localProfile?.activeFrame,
      activeStatusBadge: localProfile?.activeStatusBadge,
      level,
      profileXp: localProfile?.profileXp ?? base.profileXp ?? 0,
      maxXp: getRequiredXpForNextLevel(level),
      activities: (activities || []).map(mapActivityToJournalEntry)
    };
  }, [apiProfile, localProfile, activities]);

  return {
    data: profileData,
    // Lokale Daten reichen zum Anzeigen: nach dem ersten Fehlversuch nicht auf Retries warten
    isLoading: isLoading && !isError && !failureCount,
    isError
  };
};
