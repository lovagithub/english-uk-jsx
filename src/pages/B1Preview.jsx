import { useNavigate } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard";
import "../course.css";

const B1Preview = () => {
  const navigate = useNavigate();

  const previewExercise = {
    id: "1",
    title: "Problem Solving",
    question:
      "Describe a situation where you had to solve a problem at work or school.",
    isPremium: false,
  };

  return (
    <div className="course-page">
      <header className="course-header">
        <div>
          <h1>
            Engelsk Grammatik <span className="level-highlight">Nivå B1</span>
          </h1>
          <p>Detta är en gratis förhandsvisning.</p>
        </div>
        <span className="course-badge preview">Gratis Förhandsvisning</span>
      </header>

      <ExerciseCard exercise={previewExercise} isPaidUser={false} />

      <div className="locked-course-card">
        <h3>Vill du ha fler övningar?</h3>
        <p>Lås upp hela B1-kursen med avancerade uppgifter.</p>

        {/* 👇 ALLTID till köp – App.jsx avgör login */}
        <button
          className="btn-buy"
          onClick={() => navigate("/buy/b1")}
        >
          Lås upp hela kursen
        </button>
      </div>
    </div>
  );
};

export default B1Preview;
