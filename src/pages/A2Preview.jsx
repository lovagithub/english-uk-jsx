import React from "react";
import { useNavigate } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard.jsx";
import "../course.css"; 

const A2Preview = () => {
  const navigate = useNavigate();

  const previewExercise = {
    id: "1",
    title: "Present Simple – Introductions",
    question: "Tell me your name and how old you are.",
    isPremium: false
  };

  return (
    <div className="course-page">
      <header className="course-header">
        <div className="course-header-text">
          <h1>
            Engelsk Grammatik <span className="level-highlight">Nivå A2</span>
          </h1>
          <p>Öva på att tala och skriva. Detta är en gratis förhandsvisning.</p>
        </div>
        <span className="course-badge preview">Gratis Förhandsvisning</span>
      </header>

      <div className="exercise-list">
        <ExerciseCard exercise={previewExercise} isPaidUser={false} />
      </div>

      <div className="locked-course-card">
        <h3>Vill du ha fler övningar?</h3>
        <p>Logga in för att låsa upp hela kursen och få AI-feedback på allt.</p>
        <button className="btn-buy" onClick={() => navigate("/login")}>
          Logga in för full kurs
        </button>
      </div>
    </div>
  );
};

export default A2Preview;