export default [
  {
    title: "Morning Hydration",
    description: "Drink 500ml of water immediately after waking up.",
    lifepoints: 10,
    category: ["Health", "Morning Routine"],
    status: "active",
    image: "https://example.com/images/water.jpg",
    icon: "glass-water",
    custom: { streak_goal: 7 }
  },
  {
    title: "Deep Work Session",
    description: "90 minutes of focused work without distractions.",
    lifepoints: 50,
    category: ["Productivity", "Work"],
    status: "active",
    image: "",
    icon: "laptop-code",
    custom: { timer_minutes: 90 }
  },
  {
    title: "Read 10 Pages",
    description: "Read at least 10 pages of a non-fiction book.",
    lifepoints: 15,
    category: ["Education", "Personal Growth"],
    status: "active",
    icon: "book-open",
    custom: {}
  },
  {
    title: "Daily Meditation",
    description: "10 minutes of guided or silent mindfulness.",
    lifepoints: 20,
    category: ["Mental Health"],
    status: "active",
    image: "https://example.com/images/zen.jpg",
    icon: "brain",
    custom: { preferred_app: "Headspace" }
  },
  {
    title: "HIIT Workout",
    description: "Complete a 20-minute high-intensity interval training session.",
    lifepoints: 100,
    category: ["Fitness"],
    status: "active",
    icon: "dumbbell",
    custom: { difficulty: "Hard" }
  },
  {
    title: "Inbox Zero",
    description: "Clear your primary email inbox to zero messages.",
    lifepoints: 30,
    category: ["Organization"],
    status: "active",
    icon: "envelope-open",
    custom: {}
  },
  {
    title: "Evening Walk",
    description: "Take a 30-minute walk outside.",
    lifepoints: 25,
    category: ["Health", "Fitness"],
    status: "active",
    image: "",
    icon: "walking",
    custom: { step_target: 3000 }
  },
  {
    title: "Code Review",
    description: "Review 2 pull requests on GitHub.",
    lifepoints: 40,
    category: ["Work", "Programming"],
    status: "abandoned",
    icon: "git-branch",
    custom: { repo: "main-project" }
  },
  {
    title: "Healthy Meal Prep",
    description: "Prepare lunches for the next three days.",
    lifepoints: 60,
    category: ["Health", "Cooking"],
    status: "active",
    icon: "utensils",
    custom: { calories_per_meal: 600 }
  },
  {
    title: "Practice Instrument",
    description: "Spend 30 minutes practicing scales and a new song.",
    lifepoints: 35,
    category: ["Hobby", "Music"],
    status: "active",
    icon: "music",
    custom: { instrument: "Guitar" }
  },
  {
    title: "Call a Friend",
    description: "Catch up with a friend or family member for at least 15 mins.",
    lifepoints: 40,
    category: ["Social"],
    status: "active",
    icon: "phone",
    custom: {}
  },
  {
    title: "Digital Declutter",
    description: "Delete unused files from the Downloads folder.",
    lifepoints: 15,
    category: ["Organization"],
    status: "active",
    icon: "trash-alt",
    custom: {}
  },
  {
    title: "Stretch Break",
    description: "5 minutes of full-body stretching after sitting.",
    lifepoints: 10,
    category: ["Health"],
    status: "active",
    icon: "user-flex",
    custom: {}
  },
  {
    title: "Journaling",
    description: "Write down three things you are grateful for today.",
    lifepoints: 20,
    category: ["Mental Health"],
    status: "active",
    icon: "pen-fancy",
    custom: { type: "Gratitude" }
  },
  {
    title: "Learn New Word",
    description: "Learn a new word in your target language.",
    lifepoints: 5,
    category: ["Education", "Language"],
    status: "active",
    icon: "language",
    custom: { language: "Spanish" }
  },
  {
    title: "Plant Care",
    description: "Check soil moisture and water all indoor plants.",
    lifepoints: 15,
    category: ["Hobby", "Home"],
    status: "active",
    icon: "leaf",
    custom: {}
  },
  {
    title: "Budget Review",
    description: "Log all expenses from the past 24 hours.",
    lifepoints: 25,
    category: ["Finance"],
    status: "active",
    icon: "wallet",
    custom: { currency: "USD" }
  },
  {
    title: "Cold Shower",
    description: "Finish your shower with 2 minutes of cold water.",
    lifepoints: 45,
    category: ["Health", "Discipline"],
    status: "active",
    icon: "snowflake",
    custom: {}
  },
  {
    title: "No Sugar Day",
    description: "Avoid all processed sugars for the entire day.",
    lifepoints: 80,
    category: ["Health", "Diet"],
    status: "active",
    icon: "cookie-bite",
    custom: { difficulty: "Extreme" }
  },
  {
    title: "Sleep Hygiene",
    description: "No screens 60 minutes before bed.",
    lifepoints: 30,
    category: ["Health", "Sleep"],
    status: "active",
    icon: "moon",
    custom: { bedtime: "22:30" }
  }
];
