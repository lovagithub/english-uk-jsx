import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

import A2Preview from "./pages/A2Preview.jsx";
import B1Preview from "./pages/B1Preview.jsx";

import BuyCourse from "./pages/BuyCourse.jsx";
import CoursePage from "./pages/CoursePage.jsx";

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => {
    setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <>
      {/* NAVBAR VISAS PÅ ALLA SIDOR */}
      <NavBar currentUser={currentUser} onLogout={handleLogout} />

      <Routes>
        {/* ===== PUBLIKA SIDOR ===== */}
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />

        {/* ===== AUTH ===== */}
        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<RegisterPage onLogin={handleLogin} />}
        />

        {/* ===== GRATIS FÖRHANDSVISNING ===== */}
        
          <Route path="/preview/a2" element={<A2Preview />} />
          <Route path="/preview/b1" element={<B1Preview />} />
          
        

        {/* ===== KÖP KURS (KRÄVER INLOGG) ===== */}
        <Route
          path="/buy/:level"
          element={
            currentUser ? (
              <BuyCourse currentUser={currentUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ===== KURS (KRÄVER INLOGG) ===== */}
        <Route
          path="/course/:level"
          element={
            currentUser ? (
              <CoursePage currentUser={currentUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

        {/* ===== FALLBACK ===== */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default App;
