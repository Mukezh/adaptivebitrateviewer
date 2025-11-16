import React from "react";
import { motion, useMotionValue, useSpring } from "framer-motion";

const VIDEO_SOURCE = "https://www.pexels.com/download/video/852435/";
const DETACH_TRESHOLD = 50;
const SNAP_X = -130;
const SNAP_Y = 360;
const SNAP_CONDITION_X = -50;
const SNAP_CONDITION_Y = 150;

export const PlayerContainer = () => {
  const x = useMotionValue(0);
  const y = useMotionValue(0);

  const springX = useSpring(x, { damping: 30, stiffness: 160 });
  const springY = useSpring(y, { damping: 30, stiffness: 160 });

  const handleDragEnd = () => {
    const shouldSnapBottomLeft =
      springX.get() < SNAP_CONDITION_X && springY.get() > SNAP_CONDITION_Y;

    x.set(shouldSnapBottomLeft ? SNAP_X : 0);
    y.set(shouldSnapBottomLeft ? SNAP_Y : 0);
  };

  return (
    <div className="w-screen h-screen bg-[#F4F3FA] flex items-center justify-center relative overflow-hidden">
      {/* Controls Layer */}
      <div className="absolute inset-0 z-10 flex items-center justify-center gap-10 pointer-events-none">
        {/* Prev */}
        <motion.div
          animate={{
            y: Math.abs(springX.get()) > DETACH_TRESHOLD ? DETACH_TRESHOLD : 0,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 160 }}
          className="pointer-events-auto"
        >
          <button className="w-20 h-20 text-xl rounded-full border border-white/20 bg-white/30 backdrop-blur-md flex items-center justify-center">
            ⟲ 10s
          </button>
        </motion.div>

        {/* Play (draggable) */}
        <motion.div
          drag
          dragConstraints={{ left: -400, right: 400, top: -400, bottom: 400 }}
          style={{ x: springX, y: springY }}
          onDragEnd={handleDragEnd}
          className="pointer-events-auto"
        >
          <button className="w-24 h-24 text-2xl rounded-full border border-white/20 bg-white/40 backdrop-blur-xl flex items-center justify-center shadow-lg">
            ⏸
          </button>
        </motion.div>

        {/* Next */}
        <motion.div
          animate={{
            y: Math.abs(springX.get()) > DETACH_TRESHOLD ? -DETACH_TRESHOLD : 0,
          }}
          transition={{ type: "spring", damping: 30, stiffness: 160 }}
          className="pointer-events-auto"
        >
          <button className="w-20 h-20 text-xl rounded-full border border-white/20 bg-white/30 backdrop-blur-md flex items-center justify-center">
            30s ⟳
          </button>
        </motion.div>
      </div>

      {/* Video */}
      <video
        src={VIDEO_SOURCE}
        autoPlay
        loop
        muted
        playsInline
        className="w-[100vh] h-[100vw] rotate-90 object-cover bg-black"
      />
    </div>
  );
};
