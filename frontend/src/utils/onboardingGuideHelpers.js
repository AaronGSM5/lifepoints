export const checkQuestCompletion = (questId, profile, activities) => {
  switch (questId) {
    case "1": // profileAvatar added
      return !!profile.profileAvatar && profile.profileAvatar !== "";
    case "2": // first friend added
      return Array.isArray(profile.friends) && profile.friends.length > 0;
    case "3": // first habbit tracked
      return Array.isArray(activities) && activities.length > 0;
    case "4": // add description
      return !!profile.profileDescription && profile.profileDescription.trim().length > 0;
    default:
      return false;
  }
};