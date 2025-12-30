import React, { useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import NavBar from "./components/NavBar.jsx";
import LandingPage from "./pages/LandingPage.jsx";
import CoursePage from "./pages/CoursePage.jsx";
import LoginPage from "./pages/LoginPage.jsx";
import RegisterPage from "./pages/RegisterPage.jsx";
import ContactPage from "./pages/ContactPage.jsx";
import A2Preview from "./pages/A2Preview";
import B1Preview from "./pages/B1Preview";



function App() {
  const [currentUser, setCurrentUser] = useState(null);

  const handleLogin = (user) => setCurrentUser(user);
  const handleLogout = () => setCurrentUser(null);

  return (
    <>
      <NavBar currentUser={currentUser} onLogout={handleLogout} />

      <Routes>
        <Route path="/preview/a2" element={<A2Preview />} />
        <Route path="/preview/b1" element={<B1Preview />} />
        <Route path="/" element={<LandingPage />} />

        <Route
          path="/login"
          element={<LoginPage onLogin={handleLogin} />}
        />

        <Route
          path="/register"
          element={<RegisterPage onLogin={handleLogin} />}
        />

        <Route path="/contact" element={<ContactPage />} />

        <Route
          path="/course/a2"
          element={
            currentUser ? (
              <CoursePage level="A2" currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />

        <Route
          path="/course/b1"
          element={
            currentUser ? (
              <CoursePage level="B1" currentUser={currentUser} />
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </>
  );
}

export default App;
