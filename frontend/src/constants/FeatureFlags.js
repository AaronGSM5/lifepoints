// MVP-Scope (siehe MVP-SCOPE.md im Repo-Root).
// Ausgeblendete Features bleiben im Code erhalten und werden nur aus Navigation & UI genommen.
// Zum Reaktivieren genügt es, das jeweilige Flag auf `true` zu setzen.

const isDev = typeof __DEV__ !== "undefined" && __DEV__;

export const FEATURES = {
  // Tabs
  shop: false,

  // Tasks
  routines: false,
  quests: true,
  taskSubsteps: false,
  forYouTasks: false,
  taskSearch: false,
  suggestTask: false,
  heroCarousel: false,

  // Feed
  comments: false,
  postOptions: false,
  videoPosts: false,
  feedInfiniteScroll: false, // simuliertes Nachladen der Mock-Daten
  lootGame: false,

  // Social
  communities: false,
  chat: false,
  search: false,

  // Profil & Gamification
  trophies: false,
  customizables: false,
  profileStats: false,
  onboardingGuide: false,

  // Onboarding
  onboardingSurvey: false,

  // Benachrichtigungen
  notifications: false,

  // Settings
  subscription: false,
  linkedServices: false,
  appearance: false,
  notificationSettings: false,
  clearCache: false,

  // Dev-Werkzeuge (Logo → /dev, Profil-Reset) nur im Dev-Build
  devTools: isDev
};

export const isFeatureEnabled = (flag) => (flag ? FEATURES[flag] !== false : true);

// Routen, die zu einem deaktivierten Feature gehören, werden im Root-Layout auf Home umgeleitet.
// Schlüssel = Pfad-Präfix (Segmente ohne Gruppen wie "(tabs)"), Wert = Feature-Flag.
export const ROUTE_FEATURES = {
  shop: "shop",
  reward: "shop",
  routine: "routines",
  community: "communities",
  mycommunity: "communities",
  chat: "chat",
  search: "search",
  feed: "videoPosts",
  trophies: "trophies",
  trophy: "trophies",
  customizables: "customizables",
  notifications: "notifications",
  survey: "onboardingSurvey",
  dev: "devTools",
  "setting/subscription": "subscription",
  "setting/linked-services": "linkedServices",
  "setting/appearance": "appearance",
  "setting/notifications": "notificationSettings"
};

export const isRouteEnabled = (segments = []) => {
  const path = segments.filter((segment) => !segment.startsWith("(")).join("/");
  if (!path) return true;

  return Object.entries(ROUTE_FEATURES).every(([prefix, flag]) => {
    const matches = path === prefix || path.startsWith(`${prefix}/`);
    return !matches || isFeatureEnabled(flag);
  });
};
