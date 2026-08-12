export const DUMMY_MESSAGES = [
  // --- HEUTE ---
  {
    id: "c12",
    text: "Freut mich, dass das neue Chat-Update so gut ankommt! 🚀 Das Scrolling sollte jetzt super flüssig sein.",
    senderId: "me",
    senderName: "Aaron",
    avatar: "https://i.pravatar.cc/150?u=aaron",
    createdAt: new Date().toISOString(),
    time: "15:05"
  },
  {
    id: "c11",
    text: "Ja, läuft mega! Keine Hänger mehr, wenn man durch die alten Nachrichten scrollt.",
    senderId: "user_alex",
    senderName: "Alex",
    color: "#4ADE80",
    avatar: "https://i.pravatar.cc/150?u=alex",
    createdAt: new Date(Date.now() - 1000 * 60 * 15).toISOString(),
    time: "14:50"
  },
  {
    id: "c10",
    text: "Gibt's schon ein genaues Datum für den Release der neuen Gewohnheiten-Tracker?",
    senderId: "user_lisa",
    senderName: "Lisa",
    color: "#F472B6",
    avatar: "https://i.pravatar.cc/150?u=lisa",
    createdAt: new Date(Date.now() - 1000 * 60 * 95).toISOString(),
    time: "13:30"
  },
  {
    id: "c9",
    text: "Bin gerade noch am Bugfixing, aber sollte am Wochenende in die Beta gehen.",
    senderId: "me",
    senderName: "Aaron",
    avatar: "https://i.pravatar.cc/150?u=aaron",
    createdAt: new Date(Date.now() - 1000 * 60 * 110).toISOString(),
    time: "13:15"
  },

  // --- GESTERN ---
  {
    id: "c8",
    text: "Hat jemand von euch heute schon seine 50 LifePoints vollgemacht? Bin erst bei 20 😅",
    senderId: "user_tom",
    senderName: "Tom",
    color: "#60A5FA",
    avatar: "https://i.pravatar.cc/150?u=tom",
    createdAt: new Date(Date.now() - 86400000).toISOString(),
    time: "20:45"
  },
  {
    id: "c7",
    text: "Klar, hab vorhin schon mein Workout eingetragen und jemandem beim Umzug geholfen 💪",
    senderId: "user_emilia",
    senderName: "Emilia",
    color: "#A78BFA",
    avatar: "https://i.pravatar.cc/150?u=emilia",
    createdAt: new Date(Date.now() - 86400000 - 1000 * 60 * 85).toISOString(),
    time: "19:20"
  },
  {
    id: "c6",
    text: "Stark! Die App motiviert echt enorm, gute Taten in den Alltag einzubauen.",
    senderId: "user_alex",
    senderName: "Alex",
    color: "#4ADE80",
    avatar: "https://i.pravatar.cc/150?u=alex",
    createdAt: new Date(Date.now() - 86400000 - 1000 * 60 * 195).toISOString(),
    time: "17:30"
  },

  // --- VOR 3 TAGEN ---
  {
    id: "c5",
    text: "Moin zusammen! Freue mich aufs Testen.",
    senderId: "user_tom",
    senderName: "Tom",
    color: "#60A5FA",
    avatar: "https://i.pravatar.cc/150?u=tom",
    createdAt: new Date(Date.now() - 86400000 * 3).toISOString(),
    time: "10:20"
  },
  {
    id: "c4",
    text: "Hallo! Richtig coole Idee mit dem Gamification-Ansatz.",
    senderId: "user_lisa",
    senderName: "Lisa",
    color: "#F472B6",
    avatar: "https://i.pravatar.cc/150?u=lisa",
    createdAt: new Date(Date.now() - 86400000 * 3 - 1000 * 60 * 5).toISOString(),
    time: "10:15"
  },
  {
    id: "c3",
    text: "Willkommen in der LifePoints Beta-Community! Teilt hier gerne direkt euer Feedback oder Bugs, die euch auffallen.",
    senderId: "me",
    senderName: "Aaron",
    avatar: "https://i.pravatar.cc/150?u=aaron",
    createdAt: new Date(Date.now() - 86400000 * 3 - 1000 * 60 * 20).toISOString(),
    time: "10:00"
  },

  // --- ÄLTER (JUNI) ---
  {
    id: "c2",
    text: "Hat das geklappt? Test 2...",
    senderId: "me",
    senderName: "Aaron",
    avatar: "https://i.pravatar.cc/150?u=aaron",
    createdAt: "2026-06-12T10:05:00.000Z",
    time: "10:05"
  },
  {
    id: "c1",
    text: "Test-Nachricht für die erste Datenbank-Einrichtung der Community-Chats. Hallo Welt!",
    senderId: "me",
    senderName: "Aaron",
    avatar: "https://i.pravatar.cc/150?u=aaron",
    createdAt: "2026-06-12T10:00:00.000Z",
    time: "10:00"
  }
];