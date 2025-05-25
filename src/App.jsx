import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Analyzer from "./Components/Pages/Analyzer";
import Builder from "./Components/Pages/Builder";
import HomeSec from "./Components/Pages/home";
import Footer from "./Components/Layouts/Footer";
import Navbar from "./Components/Layouts/Navbar";

const App = () => {
  return (
    <div className="bg-gradient-to-bl from-[#0f172a] via-[#1e1a78] to-[#0f172a]">
      <Router>
        <Navbar />
        <Routes>
          <Route path="/" element={<HomeSec />} />
          <Route path="/analyzer" element={<Analyzer />} />
          <Route path="/builder" element={<Builder />} />
        </Routes>
        <Footer />
      </Router>
    </div>
  );
};

export default App;
