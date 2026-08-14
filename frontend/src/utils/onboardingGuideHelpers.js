export const checkQuestCompletion = (questId, profile = {}, activities = []) => {
  const id = typeof questId === "number" ? String(questId) : questId

  switch (id) {
    case "1": // first habbit tracked
      return Array.isArray(activities) && activities.length > 0;
    case "2": // add description
      return profile.description?.trim().length > 0;
    case "3": // avatar added
      return profile.avatar?.trim().length > 0;
    case "4": // first friend added
      return Array.isArray(profile.friends) && profile.friends.length > 0;
    default:
      return false;
  }
};