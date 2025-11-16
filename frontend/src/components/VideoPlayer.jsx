import React, { useEffect, useRef } from "react";
import shaka from "shaka-player/dist/shaka-player.ui";

import "shaka-player/dist/controls.css";

export default function ShakaVideoPlayer({ src }) {
  const videoRef = useRef(null);
  const containerRef = useRef(null);

  console.log(src);
  useEffect(() => {
    // Install polyfills
    shaka.polyfill.installAll();

    if (!shaka.Player.isBrowserSupported()) {
      console.error("Browser not supported!");
      return;
    }

    const video = videoRef.current;
    const container = containerRef.current;

    // Create Player + UI overlay
    const player = new shaka.Player(video);
    const ui = new shaka.ui.Overlay(player, container, video);

    const controls = ui.getControls();

    // Enable ABR (Adaptive Bitrate)
    player.configure({
      abr: { enabled: true },
    });

    // Load the HLS stream (.m3u8)
    player
      .load(src)
      .then(() => console.log("The video has now been loaded!"))
      .catch((e) => console.error("Error loading video", e));

    return () => {
      controls.destroy();
      player.destroy();
    };
  }, [src]);

  return (
    <div
      ref={containerRef}
      className="shaka-video-container"
      style={{ width: "100%", maxWidth: "1000px" }}
    >
      <video
        ref={videoRef}
        className="shaka-video rounded-xl"
        // autoPlay
        // controls
        style={{ width: "100%", height: "auto", background: "black" }}
      />
    </div>
  );
}
