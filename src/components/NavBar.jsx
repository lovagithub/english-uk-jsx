import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_english.jpeg";

const NavBar = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
      {/* VIKTIG WRAPPER – MATCHAR CSS */}
      <div className="navbar-inner">

        {/* LEFT: LOGO */}
        <div
          className="navbar-left"
          onClick={() => navigate("/")}
        >
          <img
            src={logo}
            alt="English Tutor Logo"
            className="navbar-logo"
          />

          <div className="navbar-brand">
            <div className="navbar-title">English Tutor</div>
            <div className="navbar-subtitle">
              Practice speaking — instant feedback
            </div>
          </div>
        </div>

        {/* RIGHT: NAV */}
        <nav className="navbar-right">
          {/* BUY COURSE */}
          <div className="navbar-dropdown">
            <button className="navbar-link">
              Köp kurs ▾
            </button>

            <div className="navbar-dropdown-menu">
              <button onClick={() => navigate("/course/a2")}>
                Nivå A2
              </button>
              <button onClick={() => navigate("/course/b1")}>
                Nivå B1
              </button>
            </div>
          </div>

          {/* CONTACT */}
          <Link to="/contact" className="navbar-link">
            Kontakt
          </Link>

          {/* AUTH */}
          {currentUser ? (
            <>
              <span className="navbar-user">
                Hej,{" "}
                {currentUser.name?.split(" ")[0] ||
                  currentUser.student_id}
              </span>

              <button
                className="navbar-btn navbar-btn-outline"
                onClick={onLogout}
              >
                Logga ut
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="navbar-btn navbar-btn-primary"
            >
              Logga in
            </Link>
          )}
        </nav>

      </div>
    </header>
  );
};

export default NavBar;
