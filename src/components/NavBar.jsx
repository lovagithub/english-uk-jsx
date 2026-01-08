import React from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/logo_english.jpeg";

const NavBar = ({ currentUser, onLogout }) => {
  const navigate = useNavigate();

  return (
    <header className="navbar">
    
      <div className="navbar-inner">

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

       
        <nav className="navbar-right">
         
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

          
          <Link to="/contact" className="navbar-link">
            Kontakt
          </Link>

          
          {currentUser ? (
            <>
             
              <Link to="/profile" className="navbar-link">
                Min profil
              </Link>

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
