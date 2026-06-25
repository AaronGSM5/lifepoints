const allData = [
  {
    id: "1",
    title: "Gym Buddies",
    icon: "rocket",
    description: "Workout group",
    memberCount: 1500,
    categories: ["lifestyle", "gym"]
  },
  {
    id: "2",
    title: "Early Risers",
    icon: "sunrise",
    description: "Productivity club",
    memberCount: 1200,
    categories: ["early"]
  },
  {
    id: "3",
    title: "Book Worms",
    icon: "book",
    description: "Monthly reading club",
    memberCount: 900,
    categories: ["knowledge"]
  },
  {
    id: "4",
    title: "Sugar Free Crew",
    icon: "health",
    description: "Healthy living",
    memberCount: 2100,
    categories: ["health", "lifestyle"]
  },
  {
    id: "5",
    title: "Tech Talk",
    icon: "computer",
    description: "Dev discussions",
    memberCount: 3000,
    categories: ["computers"]
  },
  {
    id: "6",
    title: "Chill guys",
    icon: "heart_hand",
    description: "Meditation daily",
    memberCount: 850,
    categories: ["mindfulness", "health"]
  },
  {
    id: "7",
    title: "1% Club",
    icon: "trending_up",
    description: "Schritt für Schritt zu einer besseren Version deiner selbst.",
    memberCount: 14200,
    categories: ["mindset", "productivity"]
  },
  {
    id: "8",
    title: "Eco Crew",
    icon: "leaf",
    description: "Gemeinsam für unseren Planeten. Jede Tat zählt!",
    memberCount: 8500,
    categories: ["lifestyle", "mindfulness"]
  },
  {
    id: "9",
    title: "Cold Plunge Club",
    icon: "snowflake",
    description: "Mastering dopamine and discipline every single morning.",
    memberCount: 430,
    categories: ["health", "gym"]
  },
  {
    id: "10",
    title: "Deep Focus Squad",
    icon: "hourglass",
    description: "Daily silent pomodoro sessions for deep work.",
    memberCount: 2200,
    categories: ["productivity"]
  },
  {
    id: "11",
    title: "Code & Coffee",
    icon: "coffee",
    description: "Build products, squash bugs, drink espresso.",
    memberCount: 5400,
    categories: ["computers", "creativity"]
  },
  {
    id: "12",
    title: "Night Owls",
    icon: "owl",
    description: "Productive late-night sessions for the sleep-deprived.",
    memberCount: 1800,
    categories: ["early", "productivity"]
  }, // Irony tab
  {
    id: "13",
    title: "No-Sugar Vanguard",
    icon: "shield",
    description: "Accountability group beating sweet cravings.",
    memberCount: 950,
    categories: ["health"]
  },
  {
    id: "14",
    title: "Mindful Journaling",
    icon: "pen",
    description: "Daily prompts to clear your mental clutter.",
    memberCount: 1100,
    categories: ["mindfulness", "creativity"]
  },
  {
    id: "15",
    title: "Calisthenics Kings",
    icon: "body",
    description: "Mastering bodyweight movements and gravity.",
    memberCount: 3100,
    categories: ["gym", "lifestyle"]
  },
  {
    id: "16",
    title: "Fast Learners",
    icon: "brain",
    description: "Discussing mental models, speed reading, and speed learning.",
    memberCount: 4200,
    categories: ["knowledge", "mindset"]
  },
  {
    id: "17",
    title: "Indie Hackers",
    icon: "hammer",
    description: "Solopreneurs building profitable micro-SaaS startups.",
    memberCount: 2600,
    categories: ["computers", "productivity"]
  },
  {
    id: "18",
    title: "Stoic Practice",
    icon: "column",
    description: "Applying ancient philosophy to modern challenges.",
    memberCount: 6100,
    categories: ["mindset", "knowledge"]
  },
  {
    id: "19",
    title: "Daily Walkers",
    icon: "shoes",
    description: "Hit 10k steps every single day without excuses.",
    memberCount: 1350,
    categories: ["health", "lifestyle"]
  },
  {
    id: "20",
    title: "Pixel Artists",
    icon: "palette",
    description: "Sharing isometric and retro dynamic design assets.",
    memberCount: 890,
    categories: ["creativity", "computers"]
  },
  {
    id: "21",
    title: "Hydration Homies",
    icon: "droplet",
    description: "Drink water. Stay hydrated. Simple as that.",
    memberCount: 7400,
    categories: ["health"]
  },
  {
    id: "22",
    title: "UX Craft",
    icon: "layers",
    description: "Critiquing micro-interactions and sleek application UI.",
    memberCount: 4100,
    categories: ["computers", "creativity"]
  },
  {
    id: "23",
    title: "Running Tribes",
    icon: "fire",
    description: "From 5ks to ultramarathons. Keep pushing boundaries.",
    memberCount: 2900,
    categories: ["gym", "lifestyle"]
  },
  {
    id: "24",
    title: "Digital Detoxers",
    icon: "phone_off",
    description: "Reducing screen time to reclaim physical reality.",
    memberCount: 1550,
    categories: ["mindfulness", "mindset"]
  },
  {
    id: "25",
    title: "Audiobook Club",
    icon: "headphones",
    description: "For people who consume literature at 2x speed.",
    memberCount: 3400,
    categories: ["knowledge"]
  },
  {
    id: "26",
    title: "Side Hustle Central",
    icon: "briefcase",
    description: "Building alternative income streams off-hours.",
    memberCount: 9800,
    categories: ["productivity", "mindset"]
  },
  {
    id: "27",
    title: "Yoga Union",
    icon: "lotus",
    description: "Vinyasa, flexibility flows, and breath coordination.",
    memberCount: 1900,
    categories: ["mindfulness", "gym"]
  },
  {
    id: "28",
    title: "Minimalist Living",
    icon: "sparkles",
    description: "Decluttering spaces, digital storage, and minds.",
    memberCount: 5200,
    categories: ["lifestyle", "mindfulness"]
  },
  {
    id: "29",
    title: "No Bullshit Fitness",
    icon: "weight",
    description: "Evidence-based lifting advice, data, and no magic pills.",
    memberCount: 6700,
    categories: ["gym"]
  },
  {
    id: "30",
    title: "AI Explorers",
    icon: "robot",
    description: "Prompt engineering, LLMs, and local machine learning nodes.",
    memberCount: 11200,
    categories: ["computers", "knowledge"]
  },
  {
    id: "31",
    title: "Creative Writers",
    icon: "feather",
    description: "Sharing world-building ideas, lore, and short fiction.",
    memberCount: 1400,
    categories: ["creativity"]
  },
  {
    id: "32",
    title: "Habit Stackers",
    icon: "blocks",
    description: "Atomic habits execution and routine optimization systems.",
    memberCount: 8300,
    categories: ["productivity", "mindset"]
  },
  {
    id: "33",
    title: "Keto Kitchen",
    icon: "avocado",
    description: "Low-carb meal prep, macro tracking, and recipes.",
    memberCount: 2400,
    categories: ["health", "lifestyle"]
  },
  {
    id: "34",
    title: "Financial Freedom",
    icon: "coins",
    description: "Budget trackers, passive investing, and index funds.",
    memberCount: 15300,
    categories: ["knowledge", "productivity"]
  },
  {
    id: "35",
    title: "Home Gym Builders",
    icon: "garage",
    description: "DIY setups, rack designs, and garage workouts.",
    memberCount: 780,
    categories: ["gym"]
  },
  {
    id: "36",
    title: "Breathwork Mastery",
    icon: "wind",
    description: "Wim Hof, box breathing, and autonomic regulation.",
    memberCount: 1600,
    categories: ["mindfulness", "health"]
  },
  {
    id: "37",
    title: "Typing Speedsters",
    icon: "keyboard",
    description: "Chasing 150+ WPM on customized mechanical setups.",
    memberCount: 1250,
    categories: ["computers", "productivity"]
  },
  {
    id: "38",
    title: "Public Speakers",
    icon: "mic",
    description: "Beating stage fright and refining vocal delivery.",
    memberCount: 2100,
    categories: ["creativity", "mindset"]
  },
  {
    id: "39",
    title: "Intermittent Fasters",
    icon: "clock",
    description: "16:8 and OMAD routine tracking support groups.",
    memberCount: 4600,
    categories: ["health"]
  },
  {
    id: "40",
    title: "Game Dev Circle",
    icon: "gamepad",
    description: "Unity, Unreal Engine, and custom C++ physics loops.",
    memberCount: 3800,
    categories: ["computers", "creativity"]
  },
  {
    id: "41",
    title: "Gratitude Loop",
    icon: "sun",
    description: "Posting three clean wins or blessings every single day.",
    memberCount: 2700,
    categories: ["mindfulness", "mindset"]
  },
  {
    id: "42",
    title: "Speed Cubers",
    icon: "cube",
    description: "Solving Rubik's algorithms under sub-10 seconds.",
    memberCount: 640,
    categories: ["knowledge", "productivity"]
  },
  {
    id: "43",
    title: "Sleep Optimizers",
    icon: "moon",
    description: "Circadian rhythms, blue light blocking, Oura rings.",
    memberCount: 3200,
    categories: ["health", "lifestyle"]
  },
  {
    id: "44",
    title: "Cyber Security Labs",
    icon: "lock",
    description: "Capture The Flag matches, network pentesting, defense.",
    memberCount: 7100,
    categories: ["computers"]
  },
  {
    id: "45",
    title: "Music Producers",
    icon: "waveform",
    description: "Mixing tracks, sound synthesis, MIDI orchestration.",
    memberCount: 2300,
    categories: ["creativity"]
  },
  {
    id: "46",
    title: "Zero Waste Warriors",
    icon: "recycle",
    description: "Eliminating microplastics and single-use containers.",
    memberCount: 1750,
    categories: ["lifestyle", "health"]
  },
  {
    id: "47",
    title: "Mental Math Geniuses",
    icon: "calculator",
    description: "Abacus training, speed arithmetic systems.",
    memberCount: 510,
    categories: ["knowledge", "productivity"]
  },
  {
    id: "48",
    title: "Powerlifters Collective",
    icon: "barbell",
    description: "Squat, Bench, Deadlift maxing parameters.",
    memberCount: 4400,
    categories: ["gym"]
  },
  {
    id: "49",
    title: "Solitude Seekers",
    icon: "mountain",
    description: "Embracing intentional isolation to build deep focus.",
    memberCount: 1300,
    categories: ["mindfulness", "mindset"]
  },
  {
    id: "50",
    title: "Linux Ricers",
    icon: "terminal",
    description: "Customizing window managers, dotfiles, and minimal scripts.",
    memberCount: 5900,
    categories: ["computers", "lifestyle"]
  },
  {
    id: "51",
    title: "No-Procrastination Cell",
    icon: "alarm",
    description: "Aggressive mutual accountability pairing agreements.",
    memberCount: 3600,
    categories: ["productivity"]
  },
  {
    id: "52",
    title: "Podcast Creators",
    icon: "broadcast",
    description: "Mic techniques, distribution nodes, interview editing.",
    memberCount: 1500,
    categories: ["creativity"]
  },
  {
    id: "53",
    title: "Med School Grind",
    icon: "dna",
    description: "Anki deck configurations, pathology breakdowns.",
    memberCount: 6800,
    categories: ["knowledge"]
  },
  {
    id: "54",
    title: "Posture Police",
    icon: "spine",
    description: "Fixing text-neck, pelvic tilts, ergonomic seating setups.",
    memberCount: 10400,
    categories: ["health", "lifestyle"]
  },
  {
    id: "55",
    title: "Vector Artists",
    icon: "vector",
    description: "Bezier precision, print designs, minimal flat styling.",
    memberCount: 1100,
    categories: ["creativity"]
  },
  {
    id: "56",
    title: "Consistency Is King",
    icon: "check_all",
    description: "Don't break the daily chain. Whatever your target is.",
    memberCount: 12100,
    categories: ["mindset", "productivity"]
  }
];

// NOTE->Not really scalable if there are communities.length>1000

// Missing: Trending Right now category
// Missing: Recommended for you (needs user preference data)
const getCommunities = async (query = {}) => {
  const rowLimit = parseInt(query.rowLimit, 10) || 3; // How many vertical rails to show
  const cardLimit = parseInt(query.cardLimit, 10) || 4; // How many cards per rail
  const rowCursor = query.rowCursor || null; // For vertical infinite scroll
  const horizontalCategory = query.category || null; // For a specific horizontal swipe fetch
  const cardCursor = query.cardCursor || null; // The horizontal cursor

  const uniqueCategories = [...new Set(allData.flatMap((item) => item.categories))];

  if (horizontalCategory) {
    const filteredItems = allData.filter((item) => item.categories.includes(horizontalCategory));
    return paginateItems(filteredItems, cardCursor, cardLimit);
  }

  let startRowIndex = 0;
  if (rowCursor) {
    const foundIndex = uniqueCategories.indexOf(rowCursor);
    if (foundIndex !== -1) startRowIndex = foundIndex + 1;
  }

  const paginatedCategories = uniqueCategories.slice(startRowIndex, startRowIndex + rowLimit);

  // Build the structures for the visible rails
  const sections = paginatedCategories.map((categoryName) => {
    const matchingItems = allData.filter((item) => item.categories.includes(categoryName));
    const paginationResult = paginateItems(matchingItems, null, cardLimit);

    return {
      category: categoryName,
      title: formatTitle(categoryName), // formatting helper (e.g., "lifestyle" -> "Lifestyle")
      items: paginationResult.data,
      horizontalPagination: paginationResult.pagination
    };
  });

  const hasNextRowPage = startRowIndex + rowLimit < uniqueCategories.length;

  return {
    sections,
    verticalPagination: {
      nextRowCursor: hasNextRowPage ? paginatedCategories[paginatedCategories.length - 1] : null,
      hasNextRowPage
    }
  };
};

// ─── REUSABLE HELPERS ────────────────────────────────────────────────────────

function paginateItems(items, cursor, limit) {
  let startIndex = 0;
  if (cursor) {
    const index = items.findIndex((item) => item.id === cursor);
    if (index !== -1) startIndex = index + 1;
  }

  const slicedItems = items.slice(startIndex, startIndex + limit);
  const hasNextPage = startIndex + limit < items.length;

  return {
    data: slicedItems,
    pagination: {
      nextCardCursor: hasNextPage && slicedItems.length > 0 ? slicedItems[slicedItems.length - 1].id : null,
      hasNextCardPage: hasNextPage
    }
  };
}

function formatTitle(str) {
  return str.charAt(0).toUpperCase() + str.slice(1).replace("_", " ");
}

export default { getCommunities };
