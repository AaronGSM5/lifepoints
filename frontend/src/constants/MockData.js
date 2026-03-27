export const mockProfile = {
  backgroundImg: "",
  profileName: "Tomhtzx",
  profileClass: "Habit Hunter Class",
  profileRank: "Elite",
  profileLevel: 42,
  profileXp: 9020
};

export const mockSurveyOptions = [
  {
    id: "goals",
    title: "Was ist dein Ziel?",
    options: [
      { label: "Umwelt", icon: "🌱", value: "eco" },
      { label: "Soziales", icon: "🤝", value: "social" },
      { label: "Tierschutz", icon: "🐾", value: "animals" },
      { label: "Nachbarschaft", icon: "🏠", value: "community" }
    ],
    multiple: true
  },
  {
    id: "interests",
    title: "Was liegt dir am Herzen?",
    options: [
      { label: "Umwelt", icon: "🌱", value: "eco" },
      { label: "Soziales", icon: "🤝", value: "social" },
      { label: "Tierschutz", icon: "🐾", value: "animals" },
      { label: "Nachbarschaft", icon: "🏠", value: "community" }
    ],
    multiple: true
  }
]

export const mockFeedItems = [
  { id: 1, username: 'Velo_Mind', description: 'You vs You', image: require("@/../public/assets/posts/sportSelfie2.jpg") },
  { id: 2, username: 'PixelPionier', description: 'Best Run EVER!', image: require("@/../public/assets/posts/sportSelfie1.jpeg") },
  { id: 3, username: 'Nox_Echo', description: 'Healthy Meal', image: require("@/../public/assets/posts/cooking.webp") },
  { id: 4, username: 'Zest_Runner', description: 'Helping the homeless', image: require("@/../public/assets/posts/helping.jpg") },
]

export const mockMyCommunities = [
  {
    id: "5", title: "Early Risers", desc: "Die Community für Frühaufsteher. Wir motivieren uns gegenseitig, jeden Morgen vor der Arbeit die Laufschuhe zu schnüren. Egal ob 3km oder 15km – jeder Schritt zählt!", desc: "Ein Ort für Feedback und Inspiration. Wir teilen unsere neuesten UI/UX Entwürfe, diskutieren über Typografie und helfen uns bei kniffligen Auto-Layout Problemen in Figma.", members: "1.2k Members", icon: "bolt", color: "#059669", bgColor: "#10b981", borderColor: "rgba(16, 185, 129, 0.3)", banner: "https://images.unsplash.com/photo-1476480862126-209bfaa8edc8?q=80&w=1000&auto=format&fit=crop", isLive: false, hasUnread: true, onlineCount: 20, avatars: [
      { url: "https://i.pravatar.cc/150?u=10", isFriend: true },
      { url: "https://i.pravatar.cc/150?u=11", isFriend: true },
      { url: "https://i.pravatar.cc/150?u=12", isFriend: false },
    ]
  },
  {
    id: "6", title: "Code Runners", desc: "Vom Hobbykoch zum Profi. Hier teilen wir Rezepte, misslungene Versuche und die besten Geheimtipps für die perfekte Pasta. Jeden Sonntag gibt es eine neue Cooking-Challenge.", members: "850 Members", icon: "terminal", color: "#3b82f6", bgColor: "#ec4899", borderColor: "rgba(236, 72, 153, 0.3)", banner: "https://images.unsplash.com/photo-1558655146-d09347e92766?q=80&w=1000&auto=format&fit=crop", isLive: true, liveTitle: "Portfolio Review LIVE", hasUnread: false, onlineCount: 45, avatars: [
      { url: "https://i.pravatar.cc/150?u=13", isFriend: true },
      { url: "https://i.pravatar.cc/150?u=14", isFriend: false },
      { url: "https://i.pravatar.cc/150?u=15", isFriend: false },
    ]
  },
  {
    id: "7", title: "Iron Will", desc: "Ein Ort für Feedback und Inspiration. Wir teilen unsere neuesten UI/UX Entwürfe, diskutieren über Typografie und helfen uns bei kniffligen Auto-Layout Problemen in Figma.", members: "3.4k Members", icon: "fitness-center", color: "#ea580c", bgColor: "#f59e0b", borderColor: "rgba(245, 158, 11, 0.3)", banner: "https://images.unsplash.com/photo-1556910103-1c02745aae4d?q=80&w=1000&auto=format&fit=crop", isLive: false, hasUnread: true, onlineCount: 0, avatars: [
      { url: "https://i.pravatar.cc/150?u=16", isFriend: true },
      { url: "https://i.pravatar.cc/150?u=17", isFriend: true },
      { url: "https://i.pravatar.cc/150?u=18", isFriend: true },
    ]
  },
];

export const mockTasks = [
  { id: 1, title: "Bett-Boost", description: 'Schüttle deine Decke auf und mache dein Bett ordentlich.', difficulty: "easy", xp: 500, lp: 1000, category: 'selfcare', progress: '0%', isLocked: false, icon: 'bed', requiresInput: null },
  { id: 2, title: "1-Teil-Ordnung", description: 'Räume genau einen Gegenstand an seinen richtigen Platz.', difficulty: "easy", xp: 500, lp: 1000, category: 'health', progress: '70%', isLocked: false, icon: 'pencil', requiresInput: null },
  { id: 3, title: "Pflanzen-Vati", description: 'Gieße eine Pflanze, die gerade etwas durstig aussieht.', difficulty: "easy", xp: 500, lp: 1000, category: 'social', progress: '0%', isLocked: false, icon: 'sun', requiresInput: null },
  { id: 4, title: "Lüftungs-Moment", description: 'Öffne das Fenster für 5 Minuten zum Stoßlüften.', difficulty: "easy", xp: 500, lp: 1000, category: 'selfcare', progress: '0%', isLocked: true, icon: 'lock', requiresInput: 'Minuten' },
  { id: 5, title: "Wasser-Marsch", description: 'Trink jetzt sofort 1 Glas Wasser.', difficulty: "easy", xp: 500, lp: 1000, category: 'health', progress: '0%', isLocked: false, icon: 'water', requiresInput: 'Gläser' },
  { id: 6, title: "Tiefenatmung", description: 'Atme 5-mal tief ein und bewusst langsam aus.', difficulty: "medium", xp: 700, lp: 1500, category: 'health', progress: '0%', isLocked: false, icon: 'wind', requiresInput: 'Atemzüge' },
  { id: 7, title: "Rücken-Check", description: 'Richte deine Wirbelsäule für 30 Sekunden kerzengerade auf.', difficulty: "medium", xp: 700, lp: 1500, category: 'health', progress: '50%', isLocked: false, icon: 'backCheck', requiresInput: 'Sekunden' },
  { id: 8, title: "Mini-Workout", description: 'Mache 5 Kniebeugen, 5 Liegestütze oder 5 Sit-ups', difficulty: "medium", xp: 700, lp: 1500, category: 'health', progress: '0%', isLocked: true, icon: 'lock', requiresInput: 'Wiederholungen' },
  { id: 9, title: "Bildschirm-Pause", description: 'Schaue für 20 Sekunden auf einen Punkt, der weit entfernt ist.', difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '0%', isLocked: false, icon: 'eyeClosed', requiresInput: 'Sekunden' },
  { id: 10, title: "Vorbereitung", description: 'Lege dir ein Teil für morgen (Kleidung/Tasche) schon jetzt bereit.', difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '25%', isLocked: false, icon: 'clothes', requiresInput: null },
  { id: 11, title: "Stretch-Moment", description: 'Strecke deine Arme einmal so weit wie möglich Richtung Decke.', difficulty: "medium", xp: 700, lp: 1500, category: 'selfcare', progress: '0%', isLocked: false, icon: 'sun', requiresInput: null },
  { id: 12, title: "Digitales Danke", description: 'Sende einer Person, die dir wichtig ist, eine kurze Nachricht in der du ihr zeigst wie dankbar du für sie bist.', difficulty: "medium", xp: 700, lp: 1500, category: 'digital', progress: '0%', isLocked: false, icon: 'techCat', requiresInput: null },
  { id: 13, title: "Freude schenken", description: 'Bereite einem Obdachlosen eine kleine Freude (ein Lächeln, ein nettes Wort oder eine kleine Spende)', difficulty: "medium", xp: 700, lp: 1500, category: 'social', progress: '0%', isLocked: false, icon: 'happy', requiresInput: null },
  { id: 14, title: "Unfollow-Ballast", description: 'Entfolge einem Account, der dir kein gutes Gefühl gibt.', difficulty: "medium", xp: 700, lp: 1500, category: 'digital', progress: '0%', isLocked: false, icon: 'techCat', requiresInput: 'Accounts' },
  { id: 15, title: "App-Frühjahrsputz", description: 'Lösche eine App, die du seit über einem Monat nicht geöffnet hast.', difficulty: "hard", xp: 1000, lp: 2000, category: 'special', progress: '0%', isLocked: false, icon: 'star', requiresInput: 'Apps' },
];

export const recommendedTasks = [
  {
    id: 1, title: 'Gym Session', description: 'WOW 500LP for gettin jacked?', lp: 500, badge: 'NEW', image: require("@/../public/assets/tasks/barbellBanner.png")
  },
  { id: 2, title: 'Healthy Meal', description: 'Mhhh soo good', lp: 75, badge: 'HOT', image: require("@/../public/assets/tasks/foodBanner.jpg") },
  { id: 3, title: 'Cleanup Festival', description: 'Get your things togheter', lp: 150, badge: 'NEW', image: require("@/../public/assets/tasks/cleaningBanner.webp") },
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
  {
    "title": "Tat vollbracht!",
    "message": "Dein Nachweis für „Nachbarschaftshilfe“ wurde bestätigt. +50 LP."
  },
  {
    "title": "Karma-Check",
    "message": "Du hast gerade die Welt ein Stück besser gemacht. Deine LP sind auf dem Weg!"
  },
  {
    "title": "Starke Leistung!",
    "message": "Deine gute Tat wurde in der Community hoch bewertet."
  },
  {
    "title": "Impact-Update",
    "message": "Mit deiner heutigen Tat hast du bereits 3 Menschen geholfen."
  },
  {
    "title": "Punktlandung",
    "message": "Deine 100 LP für den Freiwilligeneinsatz wurden gutgeschrieben."
  },
  {
    "title": "Zeit für eine gute Tat?",
    "message": "In deiner Nähe gibt es jemanden, der Hilfe gebrauchen könnte."
  },
  {
    "title": "Wochenziel im Blick",
    "message": "Nur noch eine gute Tat, um dein Wochenziel von 200 LP zu erreichen!"
  },
  {
    "title": "Morgengruß",
    "message": "Starte den Tag mit einer kleinen Geste. Was ist deine heutige Tat?"
  },
  {
    "title": "Kleine Tat, große Wirkung",
    "message": "Schon 5 Minuten Müll sammeln bringt dir 10 LP und der Natur viel Ruhe."
  },
  {
    "title": "Lust auf Karma?",
    "message": "Schau dir die neuen Herausforderungen in deiner Stadt an."
  },
  {
    "title": "Level Up!",
    "message": "Durch deine 500 LP bist du jetzt vom „Helfer“ zum „Lichtblick“ aufgestiegen."
  },
  {
    "title": "Jahrestag",
    "message": "Ein ganzes Jahr voller guter Taten! Wir schenken dir 100 Bonus-LP."
  },
  {
    "title": "Lokal-Held",
    "message": "Du stehst diese Woche auf Platz 3 der aktivsten Helfer in deiner Stadt."
  },
  {
    "title": "Abzeichen verdient",
    "message": "Du hast das Badge „Umwelt-Schützer“ freigeschaltet! 🌿"
  },
  {
    "title": "Meilenstein",
    "message": "Deine Taten haben insgesamt schon 1.000 LP generiert. Wahnsinn!"
  },
  {
    "title": "Gemeinsam stark",
    "message": "Die Community hat das Spendenziel von 1 Mio. LP erreicht!"
  },
  {
    "title": "LP einlösen",
    "message": "Du hast genug LP gesammelt, um jetzt einen Baum pflanzen zu lassen."
  },
  {
    "title": "Dankeschön",
    "message": "Jemand hat ein „Danke“ für deine letzte Tat hinterlassen. Schau mal rein!"
  },
  {
    "title": "Team-Challenge",
    "message": "Schließe dich mit Freunden zusammen und sammelt gemeinsam LP für ein Projekt."
  },
  {
    "title": "Gute Nachrichten",
    "message": "Dein Impact hat dazu beigetragen, dass das lokale Projekt finanziert wurde."
  }
]

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
  { id: 1, title: "Gym Rat", description: "You've consistently hit the gym a Week. Keep grinding!", icon: trophyImages['gymTrans'], requirement: 'Hit gym for 7 Days', progress: 7, goal: 7, unlocked: true },
  { id: 2, title: "Early Riser", description: 'Early bird gets the worm - and the LP!\nA perfect start to a productive life.', icon: trophyImages['sleepTrans'], requirement: 'Track 10 Tasks before 7:00 AM', progress: 3, goal: 10, unlocked: false },
  { id: 3, title: "Reader", description: "Knowledge is power.\nBy completing your monthly reading goal and sharing your key insights, you've unlocked this scholarly honor.", icon: trophyImages['bookTrans'], requirement: 'Track reading 12 times', progress: 12, goal: 12, unlocked: true, justUnlocked: true },
  { id: 4, title: "Sugar Free", description: "14 days without refined sugar!\nYou've mastered self-discipline and fueled your body with the good stuff. Your health is your wealth.", icon: trophyImages['candyTrans'], requirement: '14 Days without sugar', progress: 11, goal: 14, unlocked: false }
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
    id: "1",
    title: "Zen Masters",
    desc: "Daily meditation & focus. Join our morning breathing sessions to start your day right.",
    icon: "self-improvement",
    bgColor: "rgba(139, 92, 246, 0.15)",
    borderColor: "rgba(139, 92, 246, 0.3)",
    color: "#a78bfa",
    isLive: false,
    liveTitle: "Morning Breathing Session",
    onlineCount: 25,
    members: "1.2k",
    banner: "https://images.unsplash.com/photo-1506126613408-eca07ce68773?q=80&w=1000&auto=format&fit=crop",
    avatars: [
      { id: "a1", url: "https://i.pravatar.cc/150?u=a042581f4e29026024d", isFriend: true },
      { id: "a2", url: "https://i.pravatar.cc/150?u=a04258a2462d826712d", isFriend: false },
      { id: "a3", url: "https://i.pravatar.cc/150?u=a042581f4e29026704d", isFriend: false },
    ]
  },
  {
    id: "2",
    title: "Urban Gardeners",
    desc: "Share your balcony harvest, plant care tips, and connect with nature lovers.",
    icon: "local-florist",
    bgColor: "rgba(16, 185, 129, 0.15)",
    borderColor: "rgba(16, 185, 129, 0.3)",
    color: "#34d399",
    isLive: true,
    liveTitle: "Tomato Harvest Tips & Q&A",
    onlineCount: 55,
    members: "850",
    banner: "https://images.unsplash.com/photo-1585320806297-9794b3e4eeae?q=80&w=1000&auto=format&fit=crop",
    avatars: [
      { id: "b1", url: "https://i.pravatar.cc/150?u=a04258114e29026702d", isFriend: true },
      { id: "b2", url: "https://i.pravatar.cc/150?u=a048581f4e29026701d", isFriend: true },
      { id: "b3", url: "https://i.pravatar.cc/150?u=a042581f4e29026703d", isFriend: false },
    ]
  },
  {
    id: "3",
    title: "Indie Dev Space",
    desc: "Showcase your side projects, get code reviews, and build together.",
    icon: "code",
    bgColor: "rgba(56, 189, 248, 0.15)",
    borderColor: "rgba(56, 189, 248, 0.3)",
    color: "#7dd3fc",
    isLive: false,
    liveTitle: "Live Code Review: UI Refactoring",
    onlineCount: 215,
    members: "5.4k",
    banner: "https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=1000&auto=format&fit=crop",
    avatars: [
      { id: "c1", url: "https://i.pravatar.cc/150?u=a042581f4e29026703d", isFriend: false },
      { id: "c2", url: "https://i.pravatar.cc/150?u=a042581f4e29026708d", isFriend: false },
      { id: "c3", url: "https://i.pravatar.cc/150?u=a042581f4e29026709d", isFriend: false },
      { id: "c4", url: "https://i.pravatar.cc/150?u=a042581f4e29026710d", isFriend: false },
    ]
  },
  {
    id: "4",
    title: "Late Night Beats",
    desc: "Lofi hip hop radio - beats to relax/study to. 24/7 vibes.",
    icon: "headphones",
    bgColor: "rgba(244, 63, 94, 0.15)",
    borderColor: "rgba(244, 63, 94, 0.3)",
    color: "#fb7185",
    isLive: true,
    liveTitle: "24/7 Lofi Hip Hop Radio",
    onlineCount: 2,
    members: "12.8k",
    banner: "https://images.unsplash.com/photo-1516280440614-37939bbacd81?q=80&w=1000&auto=format&fit=crop",
    avatars: []
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

export const mockActivities = [
  {
    id: '1',
    title: 'Nachbarschaftshilfe',
    description: 'Einkäufe für Frau Müller getragen',
    category: 'social',
    points: 50,
    type: 'gain',
    time: 'Vor 10 Min.',
    icon: 'heart',
  },
  {
    id: '2',
    title: 'Morgen-Workout',
    description: '45 Min. Yoga & Dehnen',
    category: 'fitness',
    points: 30,
    type: 'gain',
    time: 'Vor 3 Std.',
    icon: 'dumbbell',
  },
  {
    id: '3',
    title: 'Blutspende-Aktion',
    description: 'DRK Zentrum Stadtmitte',
    category: 'humanitarian',
    points: 250,
    type: 'gain',
    time: 'Gestern',
    icon: 'dumbbell',
  },
  {
    id: '4',
    title: 'Icon-Pack "Nature"',
    description: 'Kauf im LP-Store',
    category: 'store',
    points: 150,
    type: 'spend',
    time: 'Gestern',
    icon: 'shoppingCat',
  },
  {
    id: '5',
    title: 'Mehrweg-Challenge',
    description: 'Eine Woche ohne Einwegplastik',
    category: 'eco',
    points: 100,
    type: 'gain',
    time: 'Vor 2 Tagen',
    icon: 'techCat',
  },
];

export const onboardingSlides = [
  {
    id: "1",
    title: "Mach die Welt etwas besser",
    description: "Laaa",
    icon: '🌍'
  },
  {
    id: "2",
    title: "Mit LifePoints",
    description: "Lalal...",
    icon: '✨'
  },
  {
    id: "3",
    title: "Be good",
    description: "Lalalalalalalala...",
    icon: '🌱'
  },
];

export const mockTutorialSteps = [
  { id: "1", title: "Profilbild hinzufügen", reward: 10, completed: false, icon: "camera", route: '/setting/edit-profile' },
  { id: "2", title: "Ersten Freund adden", reward: 20, completed: false, icon: "profile", route: '/user/Velo_Mind' },
  { id: "3", title: "Erste gute Tat loggen", reward: 50, completed: true, icon: "heart", route: '/tasks' },
  { id: "4", title: "Beschreibung hinzufügen", reward: 15, completed: false, icon: "pencil", route: '/setting/edit-profile' },
]

export const mockTaskTrackingHistory = [
  { id: "1", date: "Heute, 14:30 Uhr", points: 10 },
  { id: "2", date: "Gestern, 09:15 Uhr", points: 10 },
  { id: "3", date: "12. Okt 2023, 18:00 Uhr", points: 10 },
];

export const mockCommunityIcons = [
  "groups",
  "forum",
  "public",
  "diversity-3",
  "emoji-emotions",
  "favorite",
  "fitness-center",
  "directions-run",
  "pool",
  "self-improvement",
  "spa",
  "directions-bike",
  "sports-esports",
  "computer",
  "code",
  "smart-toy",
  "headphones",
  "videocam",
  "palette",
  "camera-alt",
  "music-note",
  "color-lens",
  "theater-comedy",
  "brush",
  "restaurant",
  "local-cafe",
  "local-pizza",
  "local-bar",
  "bakery-dining",
  "flight",
  "landscape",
  "local-florist",
  "pets",
  "explore",
  "park",
  "school",
  "menu-book",
  "lightbulb",
  "work",
  "trending-up",
  "attach-money",
  "local-fire-department",
  "celebration",
  "science",
  "star"
];

export const mockCommunityBadges = [
  "freundlich",
  "chillig",
  "hilfsbereit",
  "respektvoll",
  "safe space",
  "diskussionsfreudig",
  "humorvoll",
  "anfänger",
  "fortgeschritten",
  "expert",
  "pro",
  "mentor",
  "creator",
  "nischen-pro",
  "tech",
  "gaming",
  "fitness",
  "lifestyle",
  "kunst",
  "musik",
  "kochen",
  "outdoor",
  "finanzen",
  "memes",
  "coding",
  "design",
  "fotografie",
  "mindfulness",
  "startup",
  "networking",
  "feedback",
  "support",
  "lokal",
  "global",
  "study-group",
  "hobby",
  "täglich aktiv",
  "wochenend-vibes",
  "voice-chat",
  "text-only",
  "real-life meetups",
  "events"
];

export const mockCommunitySizes = [
  { slots: 50, price: "Gratis" },
  { slots: 250, price: "4.99€" },
  { slots: 1000, price: "14.99€" }
];

export const mockSectionedActivities = [
  {
    title: "Heute",
    data: [
      {
        id: "1",
        title: "Nachbarschaftshilfe",
        description: "Einkäufe für Frau Müller getragen",
        category: "social",
        points: 50,
        type: "gain",
        time: "14:30",
        icon: "heart"
      },
      {
        id: "2",
        title: "Morgen-Workout",
        description: "45 Min. Yoga & Dehnen",
        category: "fitness",
        points: 30,
        type: "gain",
        time: "07:15",
        icon: "dumbbell"
      },
      {
        id: "3",
        title: "Nachbarschaftshilfe",
        description: "Einkäufe für Frau Müller getragen",
        category: "social",
        points: 50,
        type: "gain",
        time: "14:30",
        icon: "heart"
      },
      {
        id: "4",
        title: "Morgen-Workout",
        description: "45 Min. Yoga & Dehnen",
        category: "fitness",
        points: 30,
        type: "gain",
        time: "07:15",
        icon: "dumbbell"
      },
      {
        id: "5",
        title: "Nachbarschaftshilfe",
        description: "Einkäufe für Frau Müller getragen",
        category: "social",
        points: 50,
        type: "gain",
        time: "14:30",
        icon: "heart"
      },
      {
        id: "6",
        title: "Morgen-Workout",
        description: "45 Min. Yoga & Dehnen",
        category: "fitness",
        points: 30,
        type: "gain",
        time: "07:15",
        icon: "dumbbell"
      },
      {
        id: "7",
        title: "Nachbarschaftshilfe",
        description: "Einkäufe für Frau Müller getragen",
        category: "social",
        points: 50,
        type: "gain",
        time: "14:30",
        icon: "heart"
      },
      {
        id: "8",
        title: "Morgen-Workout",
        description: "45 Min. Yoga & Dehnen",
        category: "fitness",
        points: 30,
        type: "gain",
        time: "07:15",
        icon: "dumbbell"
      }
    ]
  },
  {
    title: "Gestern",
    data: [
      {
        id: "9",
        title: "Blutspende-Aktion",
        description: "DRK Zentrum Stadtmitte",
        category: "humanitarian",
        points: 250,
        type: "gain",
        time: "16:00",
        icon: "dumbbell"
      },
      {
        id: "10",
        title: 'Icon-Pack "Nature"',
        description: "Kauf im LP-Store",
        category: "store",
        points: 150,
        type: "spend",
        time: "10:00",
        icon: "sun"
      },
      {
        id: "11",
        title: "Blutspende-Aktion",
        description: "DRK Zentrum Stadtmitte",
        category: "humanitarian",
        points: 250,
        type: "gain",
        time: "16:00",
        icon: "dumbbell"
      },
      {
        id: "12",
        title: 'Icon-Pack "Nature"',
        description: "Kauf im LP-Store",
        category: "store",
        points: 150,
        type: "spend",
        time: "10:00",
        icon: "sun"
      }
    ]
  },
  {
    title: "Letzte Woche",
    data: [
      {
        id: "13",
        title: "Mehrweg-Challenge",
        description: "Eine Woche ohne Einwegplastik",
        category: "eco",
        points: 100,
        type: "gain",
        time: "Mittwoch",
        icon: "globe"
      },
      {
        id: "14",
        title: "Mehrweg-Challenge",
        description: "Eine Woche ohne Einwegplastik",
        category: "eco",
        points: 100,
        type: "gain",
        time: "Mittwoch",
        icon: "globe"
      }
    ]
  }
];