import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo_english from "../assets/logo_english.jpeg";

const NavBar = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="header">
      {/* LOGO */}
      <div
        className="logo"
        onClick={() => navigate("/")}
        style={{ cursor: "pointer" }}
      >
        <img src={logo_english} alt="English Tutor Logo" />
        <div>
          <div className="logo-title">English Tutor</div>
          <div className="logo-subtitle">
            Practice speaking — instant feedback
          </div>
        </div>
      </div>

      {/* NAV */}
      <nav className="nav">
        {/* DROPDOWN */}
        <div className="dropdown">
          <button className="btn nav-btn">Köp kurs ▾</button>
          <div className="dropdown-content">
            <button onClick={() => navigate("/course/a2")}>Nivå A2</button>
            <button onClick={() => navigate("/course/b1")}>Nivå B1</button>
          </div>
        </div>

        {/* CONTACT */}
        <Link to="/contact" className="btn nav-btn">
          Kontakt
        </Link>

        {/* AUTH */}
        {currentUser ? (
          <>
            <button className="btn nav-btn" disabled>
              Hej, {currentUser.name?.split(" ")[0] || currentUser.student_id}
            </button>
            <button className="btn btn-primary" onClick={onLogout}>
              Logga ut
            </button>
          </>
        ) : (
          <Link to="/login" className="btn btn-primary">
            Logga in
          </Link>
        )}
      </nav>
    </header>
  );
};

export default NavBar;
