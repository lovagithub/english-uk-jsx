import React from "react";
import { useNavigate } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard.jsx";
import "../course.css";

const B1Preview = () => {
  const navigate = useNavigate();

  const previewExercise = {
    id: "1",
    title: "Problem Solving",
    question: "Describe a situation where you had to solve a problem at work or school.",
    isPremium: false
  };

  return (
    <div className="course-page container">
      <header className="course-header">
        <div className="course-header-text">
          <h1>
            Engelsk Grammatik <span className="level-highlight">Nivå B1</span>
          </h1>
          <p>Öva på mer avancerad engelska. Testa denna övning helt gratis.</p>
        </div>
        <span className="course-badge preview">Gratis Förhandsvisning</span>
      </header>

      <div className="exercise-list">
        <ExerciseCard exercise={previewExercise} isPaidUser={false} />
      </div>

      <div className="locked-course-card" style={{ marginTop: '3rem' }}>
        <h3>Fortsätt lära dig</h3>
        <p>Hela B1-kursen innehåller 20+ avancerade övningar.</p>
        <button className="btn-buy" onClick={() => navigate("/login")}>
          Logga in för full kurs
        </button>
      </div>
    </div>
  );
};

export default B1Preview;