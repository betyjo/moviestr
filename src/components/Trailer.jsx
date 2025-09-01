"use client";
import YouTube from "react-youtube";

export default function Trailer({ videoId }) {
  if (!videoId) return null;
  const opts = { width: "100%", height: "360" };
  return <YouTube videoId={videoId} opts={opts} />;
}
