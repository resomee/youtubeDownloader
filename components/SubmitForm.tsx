"use client";
import { useVideoFormatStore } from "@/store/useVideoFormatStore";
import { youtube_parser } from "@/utils/client/common";
import { getYoutubeInfo } from "@/utils/server/youtube";
import React, { useState } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/solid";
import LoadingSpinner from "./LoadingSpinner";

const trueBorderColor = "border-gray-300";
const falseBorderColor = "border-red-500";

export default function SubmitForm() {
  const [isLoading, setIsLoading] = useState(false);
  const [url, setUrl] = useState("");
  const [validState, setValidState] = useState({
    state: true,
    color: trueBorderColor,
  });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const id = youtube_parser(url);
      getYoutubeInfo(id)
        .then((videoInfo) => {
          useVideoFormatStore.getState().setVideoInfo(videoInfo);
        })
        .finally(() => {
          setIsLoading(false);
        });
      setValidState({ state: true, color: trueBorderColor });
    } catch (error) {
      setValidState({ state: false, color: falseBorderColor });
    }
  };
  return (
    <section className="flex flex-col gap-4 p-4">
      <p className="text-gray-600">
        Download Youtube videos as MP4 or WEBM files.
      </p>
      <form onSubmit={handleSubmit}>
        <div className="flex gap-1">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            className={`border ${validState} rounded p-2 flex-grow`}
            placeholder="https://www.youtube.com/watch?v=..."
          />
          <button
            type="submit"
            className="bg-slate-500 hover:bg-slate-600 text-slate-100 rounded p-2 flex-shrink-0 "
          >
            <MagnifyingGlassIcon className="h-5 w-5" aria-hidden="true" />
          </button>
        </div>
        {!validState.state && (
          <div className="text-red-500 text-sm mt-1">잘못된 주소입니다.</div>
        )}
      </form>
      {isLoading && <LoadingSpinner />}
    </section>
  );
}
