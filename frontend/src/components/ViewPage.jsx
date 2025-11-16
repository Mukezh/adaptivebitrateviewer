import ShakaVideoPlayer from "./VideoPlayer";

export default function ViewPlayer() {
  const master =
    "https://adaptive-bit-rate-s3.s3.us-east-1.amazonaws.com/hls/sample/master.m3u8";

  return (
    <div className="flex justify-center items-center h-screen bg-[#F2EFCE]">
      <ShakaVideoPlayer src={master} />
    </div>
  );
}
