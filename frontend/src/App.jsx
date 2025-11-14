import { Card } from "./components/card";
import Homepage from "./pages/Homepage";
import { Route, Routes, Navigate } from "react-router-dom";
import { ViewPage } from "./pages/Viewpage";
import VideoPlayer from "./components/VideoPlayer";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/upload" element={<Card />} />
      <Route path="/view" element={<ViewPage />} />
      <Route
        path="hls"
        element={
          <VideoPlayer src="https://adaptive-bit-rate-s3.s3.us-east-1.amazonaws.com/hls/sample/master.m3u8" />
        }
      />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
