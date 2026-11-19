import { createStore } from "zustand/vanilla";

import { createFeedSlice } from "./createFeedSlice";

describe("createFeedSlice", () => {
  let store;

  beforeEach(() => {
    store = createStore((set, get) => ({
      ...createFeedSlice(set, get)
    }));
  });

  it("should initialize with default feed data", () => {
    expect(store.getState().feedItems).toEqual([])
    expect(store.getState().videoProgress).toEqual({})
  });

  it("should set feed items correctly via setFeedItems", () => {
    store.getState().setFeedItems([{ id: "post1", title: "Hello" }])

    expect(store.getState().feedItems).toEqual([{ id: "post1", title: "Hello" }])
  });

  it("should update video progress for a specific video ID via setVideoProgress", () => {
    store.getState().setVideoProgress("vid_1", 45)

    expect(store.getState().videoProgress["vid_1"]).toBe(45)
  });

  it("should keep existing video progress when updating a new video ID", () => {
    store.getState().setVideoProgress("vid_1", 45)
    store.getState().setVideoProgress("vid_2", 30)

    expect(store.getState().videoProgress["vid_1"]).toBe(45)
    expect(store.getState().videoProgress["vid_2"]).toBe(30)
  });

});