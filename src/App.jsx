import React from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import StarsBackground from "./components/StarsBackground";
import MoodTracker from "./components/MoodTracker";
import Meditation from "./components/Meditation";
import DailyInspiration from "./components/DailyInspiration";
import Landing from "./components/Landing";
import Footer from "./components/Footer";
import About from "./components/AboutUs";
import SpotifyPlaylist from "./components/SpotifyPlaylist";

function App() {
  return (
    <Router>
      <StarsBackground>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/about" element={<About />} />
          <Route path="/mood-tracker" element={<MoodTracker />} />
          <Route path="/spotify-playlist" element={<SpotifyPlaylist />} />
          <Route path="/meditate" element={<Meditation />} />
          <Route path="/daily-inspiration" element={<DailyInspiration />} />
        </Routes>
        <Footer />
      </StarsBackground>
    </Router>
  );
}

export default App;