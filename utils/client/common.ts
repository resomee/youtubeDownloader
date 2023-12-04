export const youtube_parser = (url: string): string => {
  var regExp =
    /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
  var match = url.match(regExp);
  if (!match || match[7].length !== 11) {
    throw new Error("Invalid Youtube URL");
  }

  return match[7];
};

export const formatDuration = (ms: number): string => {
  if (ms < 0) ms = -ms;
  const time = {
    day: Math.floor(ms / 86400000),
    hour: Math.floor(ms / 3600000) % 24,
    minute: Math.floor(ms / 60000) % 60,
    second: Math.floor(ms / 1000) % 60,
    millisecond: Math.floor(ms) % 1000,
  };
  return Object.entries(time)
    .filter((val) => val[1] !== 0)
    .map(([key, val], index) => {
      if (index === 0) return `${val}`;
      return `${val}`.padStart(2, "0");
    })
    .join(":");
};

export const getfileSizeFormat = (bytes: number): string => {
  var x = Number(bytes.toFixed(0));
  var s = ["bytes", "KB", "MB", "GB", "TB", "PB"];
  var e = Math.floor(Math.log(x) / Math.log(1024));
  return (x / Math.pow(1024, e)).toFixed(2) + " " + s[e];
};
