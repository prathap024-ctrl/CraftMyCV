"use client";

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Analyzer from "./Components/Pages/Analyzer";
import Builder from "./Components/Pages/Builder";
import Footer from "./Components/Layouts/Footer";
import Navbar from "./Components/Layouts/Navbar";
import HomeSec from "./Components/Pages/HomeSec";
import SignInPage from "./Auth/Sign-In/page";
import SignUpPage from "./Auth/Sign-Up/page";
import ProtectedRoute from "./Auth/ProtectedRoute";

const AppContent = () => {
  const location = useLocation();
  const hideNavAndFooter = ["/sign-in", "/sign-up"].includes(location.pathname);

  return (
    <div className=" min-h-screen grid-background flex flex-col ">
      {!hideNavAndFooter && <Navbar />}
      <main className={`flex-grow ${!hideNavAndFooter ? "pt-24" : ""} `}>
        <Routes>
          {/* Public + Auth Routes */}
          <Route path="/" element={<HomeSec />} />
          <Route
            path="/analyzer"
            element={
              <ProtectedRoute>
                <Analyzer />
              </ProtectedRoute>
            }
          />
          <Route
            path="/build"
            element={
              <ProtectedRoute>
                <Builder />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
      </main>
      {!hideNavAndFooter && <Footer />}
    </div>
  );
};

const App = () => (
  <Router>
    <AppContent />
  </Router>
);

export default App;
