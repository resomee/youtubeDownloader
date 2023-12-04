"use server";
import ytdl, { videoFormat, videoInfo } from "ytdl-core";

export const getYoutubeInfo = async (id: string): Promise<videoInfo> => {
  "use server";
  const info = await ytdl.getInfo(id);
  return info;
};
