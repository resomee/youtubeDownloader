import { videoInfo } from "ytdl-core";
import { create } from "zustand";

interface VideoFormatStore {
  info: videoInfo | null;
  setVideoInfo: (info: videoInfo) => void;
}

export const useVideoFormatStore = create<VideoFormatStore>((set) => ({
  info: null,
  setVideoInfo: (info: videoInfo) => set({ info }),
}));
