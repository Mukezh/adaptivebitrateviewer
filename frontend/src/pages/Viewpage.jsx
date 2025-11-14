import { useEffect, useState } from "react";

export const ViewPage = () => {
  const [videos, setVideos] = useState([]); // array of S3 URLs
  const [selected, setSelected] = useState(""); // currently playing URL
  const [loading, setLoading] = useState(true);

  // -------------------------------------------------
  // 1. Fetch the list of video URLs
  // -------------------------------------------------
  useEffect(() => {
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:5000/getVideo");
        if (!res.ok) throw new Error("Network error");

        const json = await res.json();

        // The backend returns { allKeys: [url1, url2, ...] }
        const urls = Array.isArray(json.allKeys) ? json.allKeys : [];

        // (optional) filter only real video files
        const videoUrls = urls.filter((u) => /\.(mp4|webm|ogg|mov)$/i.test(u));
        console.log(videoUrls);
        setVideos(videoUrls);
      } catch (e) {
        console.error(e);
        setVideos([]);
      } finally {
        setLoading(false);
      }
    };

    fetchVideos();
  }, []);

  // -------------------------------------------------
  // 2. Click handler – show the player
  // -------------------------------------------------
  const playVideo = (url) => {
    setSelected(url);
  };

  const goBack = () => setSelected("");

  // -------------------------------------------------
  // 3. Render
  // -------------------------------------------------
  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-[#F2EFCE]">
        <p className="text-3xl">Loading videos…</p>
      </div>
    );
  }

  // ----------------- LIST VIEW -----------------
  if (!selected) {
    return (
      <div className="h-screen flex flex-col items-center bg-[#F2EFCE] overflow-y-auto pt-12">
        <h1 className="text-4xl font-serif mb-8">Uploaded Videos</h1>

        {videos.length === 0 ? (
          <p className="text-xl text-gray-600">No videos found.</p>
        ) : (
          <ol className="space-y-3 w-full max-w-2xl px-4">
            {videos.map((url, i) => {
              // Show a friendly name (just the filename)
              const name =
                "https://adaptive-bit-rate-s3.s3.amazonaws.com/raw-videos/" +
                decodeURIComponent(url.split("/").pop() ?? "");

              return (
                <li
                  key={i}
                  onClick={() => playVideo(name)}
                  className="cursor-pointer hover:underline text-lg "
                >
                  {i + 1}.{name}
                </li>
              );
            })}
          </ol>
        )}
      </div>
    );
  }

  // ----------------- PLAYER VIEW -----------------
  return (
    <div className="h-screen bg-black flex flex-col items-center justify-center relative">
      {/* Back button */}
      <button
        onClick={goBack}
        className="absolute top-6 left-6 z-10 bg-white/80 hover:bg-white text-black px-4 py-2 rounded-md font-medium"
      >
        Back
      </button>

      {/* Video player – responsive */}
      <video
        controls
        autoPlay
        className="max-w-full max-h-full"
        src={selected}
        // Optional: show a poster until it loads
        // poster="https://via.placeholder.com/150?text=Loading..."
      >
        Your browser does not support the video tag.
      </video>
    </div>
  );
};
