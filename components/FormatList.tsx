"use client";
import { useVideoFormatStore } from "@/store/useVideoFormatStore";
import { getfileSizeFormat } from "@/utils/client/common";
import {
  ArrowDownTrayIcon,
  SpeakerWaveIcon,
  SpeakerXMarkIcon,
  VideoCameraIcon,
  VideoCameraSlashIcon,
} from "@heroicons/react/24/solid";
import { videoFormat } from "ytdl-core";

export default function FormatList() {
  const info = useVideoFormatStore((state) => state.info);
  if (info === null) return null;

  const formats = info.formats;
  const videoWithAudioFormats = formats.filter(
    (s) => s.qualityLabel && s.audioQuality
  );
  const videoFormats = formats.filter((s) => s.qualityLabel && !s.audioQuality);
  const audioFormats = formats.filter((s) => !s.qualityLabel && s.audioQuality);

  return (
    <section>
      <div className="flex flex-col gap-1 p-4">
        <h2 className="font-bold text-lg">Available Formats</h2>
        <p className="text-gray-600">Select a format to download the video.</p>
      </div>
      <ul className="flex flex-col gap-4 p-4">
        {videoWithAudioFormats.map((format, index) => {
          return <FormatItem format={format} key={`va${index}`} />;
        })}
        {videoFormats.map((format, index) => {
          return <FormatItem format={format} key={`v${index}`} />;
        })}
        {audioFormats.map((format, index) => {
          return <FormatItem format={format} key={`a${index}`} />;
        })}
      </ul>
    </section>
  );
}

type FormatItemProps = {
  format: videoFormat;
};

function FormatItem({ format }: FormatItemProps) {
  const videoIcon = format.hasVideo ? (
    <VideoCameraIcon className="w-5 h-5" />
  ) : (
    <VideoCameraSlashIcon className="w-5 h-5 text-red-500" />
  );

  const audioIcon = format.hasAudio ? (
    <SpeakerWaveIcon className="w-5 h-5" />
  ) : (
    <SpeakerXMarkIcon className="w-5 h-5 text-red-500" />
  );

  const containerTypeColor =
    format.container === "mp4" ? "bg-blue-200" : "bg-red-200";

  const fileSize =
    (((format.bitrate || 0) + (format.audioBitrate || 0)) *
      (Number(format.approxDurationMs) / 1000)) /
    8;

  return (
    <li className="bg-gray-100 p-4 rounded" key={format.itag}>
      <div className="flex justify-between gap-5">
        <div className="flex-shrink-0 w-12 flex justify-between">
          {videoIcon}
          {audioIcon}
        </div>
        <div className="flex-grow flex-shrink justify-between min-w-0">
          <div className="flex flex-shrink gap-3">
            <div className="flex-shrink-0 w-16">
              <span
                className={`rounded ${containerTypeColor} px-2 py-1 text-gray-600 text-sm font-bold uppercase`}
              >
                {format.container}
              </span>
            </div>
            <div className="flex-grow flex-shrink text-ellipsis overflow-hidden whitespace-nowrap min-w-0">
              {format.qualityLabel || format.audioQuality}
            </div>
          </div>
          {!Number.isNaN(fileSize) && (
            <div className="text-gray-400">{getfileSizeFormat(fileSize)}</div>
          )}
        </div>
        <div className="flex-shrink-0">
          <a
            href={format.url}
            className="bg-slate-500 hover:bg-slate-600 text-white rounded flex items-center justify-center p-1"
            target="_blank"
          >
            <ArrowDownTrayIcon className="w-4 h-4" />
          </a>
        </div>
      </div>
    </li>
  );
}
