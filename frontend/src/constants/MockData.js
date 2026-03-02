export const mockProfile = {
  backgroundImg: "",
  profileName: "Tomhtzx",
  profileClass: "Habit Hunter Class",
  profileRank: "Elite",
  profileLevel: 42,
  profileXp: 9020
};

export const mockTasks = [
  { id: 1, title: "Hallo Bruder ich grüße dich 👋", difficulty: "easy", xp: 500, lp: 1000, category: 'social', progress: '20%', isLocked: false },
  { id: 2, title: "Hello 👋", difficulty: "easy", xp: 500, lp: 1000, category: 'health', progress: '70%', isLocked: false },
  { id: 3, title: "Hola 👋", difficulty: "easy", xp: 500, lp: 1000, category: 'social', progress: '0%', isLocked: false },
  { id: 4, title: "Mahlzeit 👋", difficulty: "easy", xp: 500, lp: 1000, category: 'selfcare', progress: '0%', isLocked: true },
  { id: 5, title: "Ich grüße 👋", difficulty: "easy", xp: 500, lp: 1000, category: 'health', progress: '0%', isLocked: false },
  { id: 6, title: "Hundegebell?", difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '0%', isLocked: false },
  { id: 7, title: "Knowledge Test", difficulty: "medium", xp: 700, lp: 1500, category: 'social', progress: '50%', isLocked: false },
  { id: 8, title: "NIEMALS FLUSSABWÄRTS", difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '0%', isLocked: true },
  { id: 9, title: "okEE", difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '0%', isLocked: false },
  { id: 10, title: "Sie dürfen", difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '25%', isLocked: false },
  { id: 11, title: "(Werde dafür lowkey bezahlt)", difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '0%', isLocked: false },
  { id: 12, title: "Mock Task 12", difficulty: "hard", xp: 1000, lp: 2000, category: 'social', progress: '0%', isLocked: false },
  { id: 13, title: "Mock Task 13", difficulty: "hard", xp: 1000, lp: 2000, category: 'selfcare', progress: '0%', isLocked: false },
  { id: 14, title: "Mock Task 14", difficulty: "hard", xp: 1000, lp: 2000, category: 'health', progress: '0%', isLocked: false },
  { id: 15, title: "Mock Task 15", difficulty: "hard", xp: 1000, lp: 2000, category: 'selfcare', progress: '75%', isLocked: false },
  { id: 16, title: "Mock Task 16", difficulty: "hard", xp: 1000, lp: 2000, category: 'social', progress: '0%', isLocked: false },
  { id: 17, title: "Mock Task 17", difficulty: "hard", xp: 1000, lp: 2000, category: 'selfcare', progress: '0%, isLocked: false' }
];

export const recommendedTasks = [
  { id: 1, title: 'This', description: 'Descr.', lp: '50 LP', badge: 'NEW', image: require("@/../public/assets/sportevent.png") },
  { id: 2, title: 'Just', description: 'Descr..', lp: '75 LP', badge: 'HOT', image: require("@/../public/assets/sportevent.png") },
  { id: 3, title: 'Mock', description: 'Descr...', lp: '150 LP', badge: 'NEW', image: require("@/../public/assets/sportevent.png") },
]

export const mockRewards = [
  {
    id: "r1",
    image: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?q=80&w=400",
    brand: "ADIDAS",
    title: "15% Off Storewide",
    points: 450,
    icon: "shoppingCat",
    category: "fashion",
    isLocked: false,
    description: "Hol dir 15% Rabatt auf das gesamte Sortiment in allen offiziellen Adidas Stores und online. Gilt nicht für limitierte Sneaker-Releases."
  },
  {
    id: "r2",
    image: "https://images.unsplash.com/photo-1509042239860-f550ce710b93?q=80&w=400",
    brand: "STARBUCKS",
    title: "Free Tall Coffee",
    points: 300,
    icon: "coffeeCat",
    category: "food",
    isLocked: false,
    description: "Starte deinen Tag richtig! Löse diesen Coupon für einen kostenlosen Tall Filterkaffee oder Caffè Americano in teilnehmenden Filialen ein."
  },
  {
    id: "r3",
    image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=400",
    brand: "AMAZON",
    title: "$10 Gift Card",
    points: 2000,
    icon: "techCat",
    category: "tech",
    isLocked: true,
    description: "Eine 10$ Geschenkkarte für dein nächstes Tech-Upgrade. Der Code wird direkt in deinem Profil hinterlegt."
  },
  {
    id: "r4",
    image: "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?q=80&w=400",
    brand: "NIKE",
    title: "20% Off Shoes",
    points: 800,
    icon: "shoppingCat",
    category: "fashion",
    isLocked: false,
    description: "Zeit für neue Kicks. Erhalte 20% auf alle regulären Lauf- und Trainingsschuhe."
  }
];

export const mockNotifications = [
  { title: "Hello" },
  { title: "Hola" },
  { title: "Mahlzeit" },
  { title: "Ich grüße" },
  { title: "Hallo Bruder ich grüße dich" },
  { title: "Hundegebell?" },
  { title: "Knowledge Test" },
  { title: "NIEMALS FLUSSABWÄRTS" },
  { title: "okEE" },
  { title: "Sie dürfen" },
  { title: "(Werde dafür lowkey bezahlt)" }
];

export const mockTrophies = [
  { id: 1, title: "Gym Rat", icon: "dumbbell", unlocked: false },
  { id: 2, title: "Early Riser", icon: "sun", unlocked: false },
  { id: 3, title: "Cyborg", icon: "robot", unlocked: false },
  { id: 4, title: "Reader", icon: "book", unlocked: true, justUnlocked: true },
  { id: 5, title: "Sugar Free", icon: "candy", unlocked: false },
  { id: 6, title: "Sleeper", icon: "bed", unlocked: false },
  { id: 7, title: "Gym Rat", icon: "dumbbell", unlocked: true, justUnlocked: true },
  { id: 8, title: "Early Riser", icon: "sun", unlocked: false },
  { id: 9, title: "Cyborg", icon: "robot", unlocked: false },
  { id: 10, title: "Reader", icon: "book", unlocked: false },
  { id: 11, title: "Sugar Free", icon: "candy", unlocked: false },
  { id: 12, title: "Sleeper", icon: "bed", unlocked: true, justUnlocked: true },
  { id: 13, title: "Gym Rat", icon: "dumbbell", unlocked: false },
  { id: 14, title: "Early Riser", icon: "sun", unlocked: true, justUnlocked: true },
  { id: 15, title: "Cyborg", icon: "robot", unlocked: false },
  { id: 16, title: "Reader", icon: "book", unlocked: false },
  { id: 17, title: "Sugar Free", icon: "candy", unlocked: true, justUnlocked: true },
  { id: 18, title: "Sleeper", icon: "bed", unlocked: false },
  { id: 19, title: "Gym Rat", icon: "dumbbell", unlocked: true, justUnlocked: true },
  { id: 20, title: "Early Riser", icon: "sun", unlocked: false },
  { id: 21, title: "Cyborg", icon: "robot", unlocked: false },
  { id: 22, title: "Reader", icon: "book", unlocked: false },
  { id: 23, title: "Sugar Free", icon: "candy", unlocked: false },
  { id: 24, title: "Sleeper", icon: "bed", unlocked: false },
  { id: 25, title: "Gym Rat", icon: "dumbbell", unlocked: false },
  { id: 26, title: "Early Riser", icon: "sun", unlocked: false },
  { id: 27, title: "Cyborg", icon: "robot", unlocked: true, justUnlocked: true },
  { id: 28, title: "Reader", icon: "book", unlocked: false },
  { id: 29, title: "Sugar Free", icon: "candy", unlocked: false },
  { id: 30, title: "Sleeper", icon: "bed", unlocked: false }
];


export const mockRecommendedCommunities = [
  {
    title: "Zen Masters",
    desc: "Daily meditation & focus",
    icon: "spa",
    iconColor: "#a855f7",
    bgColor: "rgba(168, 85, 247, 0.2)",
    borderColor: "rgba(168, 85, 247, 0.1)"
  },
  {
    title: "Page Turners",
    desc: "Read 15 mins every day",
    icon: "menu-book",
    iconColor: "#3b82f6",
    bgColor: "rgba(59, 130, 246, 0.2)",
    borderColor: "rgba(59, 130, 246, 0.1)"
  },
  {
    title: "Marathon Elites",
    desc: "Competitive long distance running",
    icon: "directions-run",
    iconColor: "#10b981",
    bgColor: "rgba(16, 185, 129, 0.2)",
    borderColor: "rgba(16, 185, 129, 0.1)"
  },
  {
    title: "Healthy Bites",
    desc: "Clean eating and meal prep tips",
    icon: "restaurant",
    iconColor: "#f97316",
    bgColor: "rgba(249, 115, 22, 0.2)",
    borderColor: "rgba(249, 115, 22, 0.1)"
  },
  {
    title: "Hydration Heroes",
    desc: "Track and meet water goals",
    icon: "water-drop",
    iconColor: "#0ea5e9",
    bgColor: "rgba(14, 165, 233, 0.2)",
    borderColor: "rgba(14, 165, 233, 0.1)"
  }
];