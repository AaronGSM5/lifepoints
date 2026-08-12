export const MOCK_CHATS = [
  {
    id: "1",
    userName: "Emilia",
    lastMessage: "Hey, hast du schon die neuen Designs gesehen?",
    time: "11:20",
    unread: 2,
    avatar: "https://picsum.photos/100"
  },
  {
    id: "2",
    userName: "Max",
    lastMessage: "Lass uns später über das Layout sprechen.",
    time: "Gestern",
    unread: 0,
    avatar: "https://picsum.photos/101"
  },
  {
    id: "3",
    userName: "Sarah (Design)",
    lastMessage: "Super, danke dir! 🙌",
    time: "Gestern",
    unread: 0,
    avatar: "https://picsum.photos/102"
  },
  {
    id: "4",
    userName: "Alex",
    lastMessage: "Geht klar.",
    time: "Montag",
    unread: 0,
    avatar: "https://picsum.photos/103"
  }
];

export const DUMMY_MESSAGES = [
  // --- HEUTE ---
  {
    id: "12",
    text: "Klar, machen wir so! 🙌",
    senderId: "me",
    createdAt: new Date().toISOString(),
    time: "14:32"
  },
  {
    id: "11",
    text: "Hört sich perfekt an, ich freu mich.",
    senderId: "otherUser",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    time: "14:15"
  },
  {
    id: "10",
    text: "Treffen wir uns später im Gym?",
    senderId: "otherUser",
    createdAt: new Date(Date.now() - 1000 * 60 * 30).toISOString(),
    time: "14:02"
  },
  {
    id: "9",
    text: "Hast du schon die neuen Features in LifePoints getestet?",
    senderId: "me",
    createdAt: new Date(Date.now() - 1000 * 60 * 90).toISOString(),
    time: "13:00"
  },
  {
    id: "8",
    text: "Moin Aaron! Bist du heute am Start?",
    senderId: "otherUser",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    time: "09:10"
  },

  // --- GESTERN ---
  {
    id: "7",
    text: "Alles klar, gute Nacht! 😴",
    senderId: "me",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    time: "22:15"
  },
  {
    id: "6",
    text: "Ja, der Chat läuft jetzt wirklich extrem flüssig.",
    senderId: "otherUser",
    createdAt: new Date(Date.now() - 86400000 - 1000 * 60 * 30).toISOString(),
    time: "21:30"
  },
  {
    id: "5",
    text: "Ich schau mir noch kurz den Code für die App an.",
    senderId: "otherUser",
    createdAt: new Date(Date.now() - 86400000 - 1000 * 60 * 60).toISOString(),
    time: "21:00"
  },
  {
    id: "4",
    text: "Schreib mir einfach, wenn du fertig bist.",
    senderId: "me",
    createdAt: new Date(Date.now() - 86400000 - 1000 * 60 * 120).toISOString(),
    time: "19:00"
  },

  // --- VOR 3 TAGEN ---
  {
    id: "3",
    text: "Das Wochenende war echt produktiv.",
    senderId: "me",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    time: "18:45"
  },
  {
    id: "2",
    text: "Wie war dein Wochenende? Hast du an Lifepoints gearbeitet?",
    senderId: "otherUser",
    createdAt: new Date(Date.now() - 86400000 * 3 - 1000 * 60 * 30).toISOString(),
    time: "15:20"
  },

  // --- ÄLTER (JUNI) ---
  {
    id: "1",
    text: "Hey Aaron, lange nicht gesehen!",
    senderId: "otherUser",
    createdAt: "2026-06-12T14:28:00.000Z",
    time: "14:28"
  }
];

export const mockChatPartner = {
  name: "Emilia",
  avatar: "https://i.pravatar.cc/150?u=du",
  isOnline: true
};