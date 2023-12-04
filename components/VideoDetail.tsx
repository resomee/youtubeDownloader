"use client";
import { useVideoFormatStore } from "@/store/useVideoFormatStore";
import { formatDuration } from "@/utils/client/common";

export default function VideoDetail() {
  const info = useVideoFormatStore((state) => state.info);
  if (info === null) return null;

  const videoDetails = info.videoDetails;
  const isLengthZero = videoDetails.lengthSeconds === "0";

  return (
    <section className="flex gap-4 p-4">
      <div className="flex-shrink-0 w-1/3">
        <img
          src={videoDetails.thumbnails.at(-1)?.url}
          alt=""
          className="w-full"
        />
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="font-bold text-lg">{videoDetails.title}</h2>
        <p className="text-gray-600">{videoDetails.ownerChannelName}</p>
        <div className="flex gap-5">
          {!isLengthZero && (
            <p className="text-gray-600">
              {videoDetails.lengthSeconds}
              {formatDuration(Number(videoDetails.lengthSeconds) * 1000)}
            </p>
          )}
          <p className="text-gray-600">{videoDetails.viewCount} views</p>
        </div>
      </div>
    </section>
  );
}
