export const mockProfile = {
  backgroundImg: "",
  profileName: "Tomhtzx",
  profileClass: "Habit Hunter Class",
  profileRank: "Elite",
  profileLevel: 42,
  profileXp: 9020
};



export const mockFeedItems = [
  { id: 1, username: 'mockuser1', description: 'You vs You', image: require("@/../public/assets/sportSelfie2.jpg") },
  { id: 2, username: 'topuser2', description: 'Best Run EVER!', image: require("@/../public/assets/sportSelfie1.jpeg") },
  { id: 3, username: 'notuser3', description: 'Healthy Meal', image: require("@/../public/assets/cooking.webp") },
  { id: 4, username: 'duckuser4', description: 'Helping the homeless', image: require("@/../public/assets/helping.jpg") },
]

export const mockTasks = [
  { id: 1, title: "Hallo Bruder ich grüße dich 👋", difficulty: "easy", xp: 500, lp: 1000, category: 'social', progress: '20%', isLocked: false, icon: 'sun' },
  { id: 2, title: "Hello 👋", difficulty: "easy", xp: 500, lp: 1000, category: 'health', progress: '70%', isLocked: false, icon: 'techCat' },
  { id: 3, title: "Hola 👋", difficulty: "easy", xp: 500, lp: 1000, category: 'social', progress: '0%', isLocked: false, icon: 'sun' },
  { id: 4, title: "Mahlzeit 👋", difficulty: "easy", xp: 500, lp: 1000, category: 'selfcare', progress: '0%', isLocked: true, icon: 'sun' },
  { id: 5, title: "Ich grüße 👋", difficulty: "easy", xp: 500, lp: 1000, category: 'health', progress: '0%', isLocked: false, icon: 'sun' },
  { id: 6, title: "Hundegebell?", difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '0%', isLocked: false, icon: 'sun' },
  { id: 7, title: "Knowledge Test", difficulty: "medium", xp: 700, lp: 1500, category: 'social', progress: '50%', isLocked: false, icon: 'sun' },
  { id: 8, title: "NIEMALS FLUSSABWÄRTS", difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '0%', isLocked: true, icon: 'sun' },
  { id: 9, title: "okEE", difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '0%', isLocked: false, icon: 'sun' },
  { id: 10, title: "Sie dürfen", difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '25%', isLocked: false, icon: 'sun' },
  { id: 11, title: "(Werde dafür lowkey bezahlt)", difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '0%', isLocked: false, icon: 'sun' },
];

export const recommendedTasks = [
  { id: 1, title: 'This', description: 'Descr.', lp: '50 LP', badge: 'NEW', image: require("@/../public/assets/barbellBanner.png") },
  { id: 2, title: 'Just', description: 'Descr..', lp: '75 LP', badge: 'HOT', image: require("@/../public/assets/foodBanner.jpg") },
  { id: 3, title: 'Mock', description: 'Descr...', lp: '150 LP', badge: 'NEW', image: require("@/../public/assets/cleaningBanner.webp") },
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

export const trophyImages = {
  "gym": require("@/../public/assets/trophies/gym.png"),
  "gymTrans": require("@/../public/assets/trophies/gymTrans.png"),
  "sleep": require("@/../public/assets/trophies/sleep.png"),
  "sleepTrans": require("@/../public/assets/trophies/sleepTrans.png"),
  "book": require("@/../public/assets/trophies/book.png"),
  "bookTrans": require("@/../public/assets/trophies/bookTrans.png"),
  "candy": require("@/../public/assets/trophies/candy.png"),
  "candyTrans": require("@/../public/assets/trophies/candyTrans.png"),
}

export const mockTrophies = [
  { id: 1, title: "Gym Rat", description: 'This is just a mock description of this wonderfull trophy you unlocked.', icon: trophyImages['gymTrans'], requirement: 'Do 125 Tasks', progress: 50, goal: 125, unlocked: false },
  { id: 2, title: "Early Riser", description: 'This is just a mock description of this wonderfull trophy you unlocked.', icon: trophyImages['sleepTrans'], requirement: 'Do 125 Tasks', progress: 50, goal: 125, unlocked: false },
  { id: 3, title: "Reader", description: 'This is just a mock description of this wonderfull trophy you unlocked.', icon: trophyImages['bookTrans'], requirement: 'Do 125 Tasks', progress: 50, goal: 125, unlocked: true, justUnlocked: true },
  { id: 4, title: "Sugar Free", description: 'This is just a mock description of this wonderfull trophy you unlocked.', icon: trophyImages['candyTrans'], requirement: 'Do 125 Tasks', progress: 50, goal: 125, unlocked: false }
];

export const mockPublicProfile = {
  profileName: "Sarah Klein",
  profileBio: "Achtsamkeit im Alltag.🌿\n Ich sammle LifePoints durch viele kleine Gesten in der Nachbarschaft.",
  profileLevel: 14,
  profileClass: "Community Helper",
  profileRank: "Elite",
  pinnedTrophies: [
    {
      id: 1,
      title: "Gym Rat",
      description: "This is just a mock description of this wonderfull trophy you unlocked.",
      icon: trophyImages['gymTrans'],
      requirement: "Do 125 Tasks",
      progress: 50,
      goal: 125,
      unlocked: false
    },
    {
      id: 2,
      title: "Early Riser",
      description: "This is just a mock description of this wonderfull trophy you unlocked.",
      icon: trophyImages['sleepTrans'],
      requirement: "Do 125 Tasks",
      progress: 50,
      goal: 125,
      unlocked: true,
      justUnlocked: true
    },
    {
      id: 3,
      title: "Cyborg",
      description: "This is just a mock description of this wonderfull trophy you unlocked.",
      icon: trophyImages['bookTrans'],
      requirement: "Do 125 Tasks",
      progress: 50,
      goal: 125,
      unlocked: false
    }
  ]
};

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

export const mockSettings = [
  {
    title: 'Your Account',
    data: [
      { id: '1', label: 'Edit Profile', icon: 'user', type: 'link', route: '/setting/edit-profile' },
      { id: '2', label: 'Security & Login', icon: 'shield', type: 'link', route: '/setting/security' },
      { id: '3', label: 'Linked Services', icon: 'link', type: 'link', route: '/setting/linked-services' },
      { id: '4', label: 'Notifications', icon: 'bell', type: 'link', route: '/setting/notifications' },
      { id: '5', label: 'Subscription', icon: 'star', type: 'link', route: '/setting/subscription' },
    ],
  },
  {
    title: 'App Experience',
    data: [
      { id: '6', label: 'Appearance', icon: 'moon', type: 'bottom-sheet', actionName: 'openThemePicker' },
      { id: '7', label: 'Language & Region', icon: 'globe', type: 'link', route: '/setting/language' },
      { id: '8', label: 'Storage & Cache', icon: 'hardDrive', type: 'action', actionName: 'clearCache' },
    ],
  },
  {
    title: 'Support & Legal',
    data: [
      { id: '9', label: 'Help & Support', icon: 'help', type: 'link', route: '/setting/support' },
      { id: '10', label: 'Privacy Policy', icon: 'shieldOff', type: 'link', route: '/setting/privacy' },
      { id: '11', label: 'Terms of Service', icon: 'fileText', type: 'link', route: '/setting/terms' },
      { id: '12', label: 'Delete Account', icon: 'userX', type: 'action', actionName: 'deleteAccount', danger: true },
    ],
  },
];

export const mockComments = [
  {
    id: "1",
    username: "Sarah_99",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    text: "Wow, richtig starke Aktion von dir! 🔥",
    time: "2h",
    replies: [
      {
        id: "1-1",
        username: "TomFitness",
        avatar: "https://i.pravatar.cc/150?u=tom",
        text: "Stimme dir absolut zu, Sarah!",
        time: "1h",
      }
    ]
  },
  {
    id: "2",
    username: "TomFitness",
    avatar: "https://i.pravatar.cc/150?u=tom",
    text: "Muss ich auch unbedingt mal wieder machen. Respekt!",
    time: "1h"
  },
  {
    id: "3",
    username: "Sarah_99",
    avatar: "https://i.pravatar.cc/150?u=sarah",
    text: "Wow, richtig starke Aktion von dir! 🔥",
    time: "2h"
  },
]