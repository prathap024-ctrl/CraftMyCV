"use client";

import React from "react";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Footer from "./components/Layouts/Footer";
import HomeSec from "./components/Pages/HomeSec";
import SignInPage from "./Auth/Sign-In/page";
import SignUpPage from "./Auth/Sign-Up/page";
import AboutPage from "./components/Pages/AboutPage";
import ContactPage from "./components/Pages/ContactPage";
import DashboardLayout from "./components/Dashboard/DashboardLayout";
import Navbar from "./components/Layouts/Navbar";
import ProtectedRoute from "./Auth/ProtectedRoute";
import { Toaster } from "sonner";

const AppContent = () => {
  const location = useLocation();
  const hideNavAndFooter = ["/sign-in", "/sign-up", "/dashboard"].includes(
    location.pathname
  );

  return (
    <div className=" min-h-screen grid-background flex flex-col ">
      {!hideNavAndFooter && <Navbar />}
      <main className={`flex-grow ${!hideNavAndFooter ? "pt-24" : ""} `}>
        <Routes>
          {/* Public + Auth Routes */}
          <Route path="/" element={<HomeSec />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route
            path="/dashboard"
            element={
              <ProtectedRoute>
                <DashboardLayout />
              </ProtectedRoute>
            }
          />
          <Route path="/sign-in" element={<SignInPage />} />
          <Route path="/sign-up" element={<SignUpPage />} />
        </Routes>
        <Toaster />
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
