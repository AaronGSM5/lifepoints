const getPosts = async (req, res) => {
  const data = [
    {
      id: "1",
      img: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e",
      user: {
        img: "https://randomuser.me/api/portraits/women/44.jpg",
        name: "Sarah Jenkins"
      },
      likes: 142,
      date: "2026-06-21"
    },
    {
      id: "2(s",
      img: "https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05",
      user: {
        img: "https://randomuser.me/api/portraits/men/32.jpg",
        name: "Alex Rivera"
      },
      likes: 89,
      date: "2026-06-22"
    },
    {
      id: "3",
      img: "https://images.unsplash.com/photo-1502082553048-f009c37129b9",
      user: {
        img: "https://randomuser.me/api/portraits/women/12.jpg",
        name: "Emma Chen"
      },
      likes: 310,
      date: "2026-06-20"
    }
  ];

  return data;
};

export default { getPosts };
