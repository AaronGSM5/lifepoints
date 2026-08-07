export const createFeedSlice = (set) => ({
  feedItems: [],
  setFeedItems: (items) => set({ feedItems: items }),
  videoProgress: {},
  setVideoProgress: (id, time) => set((state) => ({ videoProgress: { ...state.videoProgress, [id]: time, } }))
});