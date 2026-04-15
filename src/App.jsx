import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate, useNavigate } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";
import BuyCourse from "./pages/BuyCourse.jsx";
import CoursePage from "./pages/CoursePage.jsx"; 
import ExternalApiCourse from "./pages/ExternalApiCourse.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const sessionUser = localStorage.getItem("activeSession");
    if (sessionUser) {
      setCurrentUser(JSON.parse(sessionUser));
    }
  }, []);

  const handleLogin = (userData) => {
    setCurrentUser(userData);
    localStorage.setItem("activeSession", JSON.stringify(userData));
    navigate("/profile");
  };

  const handleLogout = () => {
    setCurrentUser(null);
    localStorage.removeItem("activeSession");
    navigate("/");
  };

  return (
    <>
      <NavBar currentUser={currentUser} onLogout={handleLogout} />

      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />
        <Route path="/login" element={<LoginPage onLogin={handleLogin} />} />
        <Route path="/register" element={<RegisterPage onLogin={handleLogin} />} />

        <Route
          path="/profile"
          element={
            currentUser
              ? <ProfilePage currentUser={currentUser} />
              : <Navigate to="/login" replace />
          }
        />

        <Route
          path="/course/:level"
          element={<CoursePage currentUser={currentUser} />}
        />

 
        
          <Route
            path="/course/:level/vocabulary"
            element={<ExternalApiCourse />}
          />
          

 
        <Route
          path="/buy/:level"
          element={
            currentUser
              ? <BuyCourse currentUser={currentUser} />
              : <Navigate to="/login" replace />
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;