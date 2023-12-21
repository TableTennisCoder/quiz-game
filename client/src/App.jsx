import {BrowserRouter, Routes, Route} from "react-router-dom";
import Home from "./pages/Home";
import Play from "./pages/Play";
import GameOver from "./components/play/game/GameOver";

import "./App.css";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/play" element={<Play />} />
        <Route path="/gameOver" element={<GameOver />} />
      </Routes>
    </BrowserRouter>
  );
}
