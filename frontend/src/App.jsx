import { Card } from "./components/card";
import Homepage from "./pages/Homepage";
import { Route, Routes, Navigate } from "react-router-dom";
import { ViewPage } from "./pages/Viewpage";
import VideoPlayer from "./components/VideoPlayer";
import ViewPlayer from "./components/ViewPage";
import "shaka-player/dist/controls.css";
import { PlayerContainer } from "./components/Glass";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Homepage />} />
      <Route path="/home" element={<Homepage />} />
      <Route path="/upload" element={<Card />} />
      <Route path="/view" element={<ViewPage />} />
      <Route path="hls" element={<ViewPlayer />} />
      <Route path="/glass" element={<PlayerContainer />} />
      <Route path="*" element={<Navigate to="/home" replace />} />
    </Routes>
  );
}

export default App;
