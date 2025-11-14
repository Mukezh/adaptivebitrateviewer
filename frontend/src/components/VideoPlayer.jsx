import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";

export default function VideoPlayer({ src }) {
  const videoRef = useRef(null);
  const hlsRef = useRef(null);

  const [levels, setLevels] = useState([]);
  const [currentLevel, setCurrentLevel] = useState(-1);

  // TRUE only for real Safari (not Chrome/Edge)
  const isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

  useEffect(() => {
    const video = videoRef.current;
    if (!video || !src) return;

    // cleanup old instance
    if (hlsRef.current) {
      hlsRef.current.destroy();
      hlsRef.current = null;
    }

    if (src.endsWith(".m3u8")) {
      if (isSafari) {
        // REAL SAFARI → native playback
        console.log("Using native Safari HLS");
        video.src = src;
      } else {
        // CHROME / EDGE / FIREFOX → use hls.js
        console.log("Using hls.js");
        const hls = new Hls();
        hlsRef.current = hls;

        hls.loadSource(src);
        hls.attachMedia(video);

        // Get HLS levels
        hls.on(Hls.Events.MANIFEST_PARSED, (_, data) => {
          console.log("LEVELS FROM HLS:", data.levels);
          setLevels(data.levels);
          setCurrentLevel(-1);
        });

        // Error logging
        hls.on(Hls.Events.ERROR, (evt, data) => {
          console.error("HLS ERROR:", data);
        });
      }
    } else {
      video.src = src;
    }

    return () => {
      if (hlsRef.current) hlsRef.current.destroy();
    };
  }, [src]);

  return (
    <video ref={videoRef} controls autoPlay className="max-w-full max-h-full" />
  );
}
