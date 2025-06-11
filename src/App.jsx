"use client"

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
import LoginPage from "./auth/signin/page";
import SignUpPage from "./auth/signup/page";
import ProtectedRoute from "./auth/ProtectedRoutes/ProtectedRoutes";

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
                <Analyzer />{" "}
              </ProtectedRoute>
            }
          />
          <Route
            path="/build"
            element={
              <ProtectedRoute>
                <Builder />{" "}
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<LoginPage />} />
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
