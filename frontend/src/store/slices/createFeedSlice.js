export const createFeedSlice = (set) => ({
  feedItems: [],
  setFeedItems: (items) => set({ feedItems: items }),
  videoProgress: {},
  setVideoProgress: (id, time) => set((state) => ({ videoProgress: { ...state.videoProgress, [id]: time, } })),

  // MVP: eigene Posts werden lokal gespeichert, bis es einen Posts-Endpoint gibt
  myPosts: [],
  addPost: (post) => set((state) => ({ myPosts: [post, ...state.myPosts] })),
  removePost: (postId) => set((state) => ({ myPosts: state.myPosts.filter((post) => post.id !== postId) }))
});
