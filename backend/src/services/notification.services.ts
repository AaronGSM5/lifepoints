const getNotifications = async () => {
  const data = {
    announcements: [
      {
        title: "System Upgrade Complete",
        date: "2026-06-24T16:18:34Z",
        description: "We've upgraded our servers to improve performance and stability. Enjoy a faster experience!",
        icon: "sparkle"
      },
      {
        title: "New Feature Available",
        date: "2026-06-24T15:20:34Z",
        description: "You can now customize your profile dashboard with new widgets and dark mode themes.",
        icon: "wand"
      },
      {
        title: "Scheduled Maintenance",
        date: "2026-06-23T09:00:00Z",
        description:
          "Brief database optimization will occur this Sunday at 2:00 AM UTC. Expect up to 5 minutes of downtime.",
        icon: "wrench"
      },
      {
        title: "Community Milestone!",
        date: "2026-06-20T12:30:15Z",
        description: "We just crossed 10,000 active users! Thank you to everyone for being a part of our journey.",
        icon: "trophy"
      }
    ]
  };

  return data;
};

export default { getNotifications };
