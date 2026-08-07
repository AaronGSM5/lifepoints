export const createFeedSlice = (set) => ({
  feedItems: [],
  setFeedItems: (items) => set({ feedItems: items }),
});