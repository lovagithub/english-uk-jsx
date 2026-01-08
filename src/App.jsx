import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import Footer from "./components/Footer.jsx";

import LandingPage from "./pages/LandingPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";

import A2Preview from "./pages/A2Preview.jsx";
import B1Preview from "./pages/B1Preview.jsx";

import BuyCourse from "./pages/BuyCourse.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import ProfilePage from "./pages/ProfilePage.jsx";

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
   
      <NavBar currentUser={currentUser} onLogout={handleLogout} />

      <Routes>
        
        <Route path="/" element={<LandingPage />} />
        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />
        <Route
          path="/register"
          element={<RegisterPage onLogin={handleLogin} />}
        />

        <Route path="/preview/a2" element={<A2Preview />} />
        <Route path="/preview/b1" element={<B1Preview />} />

      
        <Route
          path="/profile"
          element={
            currentUser ? (
              <ProfilePage currentUser={currentUser} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        />

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

        
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>

     
      <Footer />
    </>
  );
}

export default App;
