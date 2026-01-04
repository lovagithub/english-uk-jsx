import { useNavigate } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard";
import "../course.css";

const A2Preview = () => {
  const navigate = useNavigate();

  const previewExercise = {
    id: "1",
    title: "Present Simple – Introductions",
    question: "Tell me your name and how old you are.",
    isPremium: false,
  };

  return (
    <div className="course-page">
      <header className="course-header">
        <div>
          <h1>
            Engelsk Grammatik <span className="level-highlight">Nivå A2</span>
          </h1>
          <p>Detta är en gratis förhandsvisning.</p>
        </div>
        <span className="course-badge preview">Gratis Förhandsvisning</span>
      </header>

      <ExerciseCard exercise={previewExercise} isPaidUser={false} />

      <div className="locked-course-card">
        <h3>Vill du ha fler övningar?</h3>
        <p>Logga in för att låsa upp hela kursen.</p>
        <button className="btn-buy" onClick={() => navigate("/login")}>
          Logga in för full kurs
        </button>
      </div>
    </div>
  );
};

export default A2Preview;
