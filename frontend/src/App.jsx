import { Card } from "./components/card";
import Homepage from "./pages/Homepage";
import { Route, Routes } from "react-router-dom";
import { ViewPage } from "./pages/Viewpage";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Homepage />} />
      <Route path="/upload" element={<Card />} />
      <Route path="/view" element={<ViewPage />} />
    </Routes>
  );
}

export default App;
