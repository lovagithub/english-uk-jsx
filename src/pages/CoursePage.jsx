import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, ShoppingCart, Loader2 } from "lucide-react";
import ExerciseCard from "../components/ExerciseCard";
import "../course.css";

const CoursePage = ({ currentUser }) => {
  const navigate = useNavigate();
  const { level } = useParams();
  const [buying, setBuying] = useState(false);

  const courseId = level === "a2" ? "C-ENG-A2" : "C-ENG-B1";
  const courseTitle = `Engelsk Grammatik – Nivå ${level.toUpperCase()}`;

  const hasAccess =
    currentUser?.courses?.some(
      (c) => c.course_id === courseId && c.paid
    ) || false;

  const handleBuy = () => {
    setBuying(true);
    navigate(`/buy/${level}`);
  };

  const exercises =
    level === "a2"
      ? [
          {
            id: "1",
            title: "Present Simple – Introductions",
            question: "Tell me your name and how old you are.",
            isPremium: false,
          },
          {
            id: "2",
            title: "Daily Routine",
            question: "What do you usually do in the morning?",
            isPremium: false,
          },
          {
            id: "3",
            title: "Past Simple – Last Weekend",
            question: "What did you do last Saturday?",
            isPremium: true,
          },
          {
            id: "4",
            title: "Comparatives",
            question: "Compare Kyiv and Stockholm. Which is bigger?",
            isPremium: true,
          },
        ]
      : [
          {
            id: "1",
            title: "Problem Solving",
            question:
              "Describe a situation where you had to solve a problem at work or school.",
            isPremium: false,
          },
          {
            id: "2",
            title: "Future Forms",
            question: "What are your plans for next summer?",
            isPremium: false,
          },
          {
            id: "3",
            title: "Second Conditional",
            question: "What would you do if you won a million dollars?",
            isPremium: true,
          },
          {
            id: "4",
            title: "Passive Voice",
            question: "Describe how your favorite dish is cooked.",
            isPremium: true,
          },
        ];

  return (
    <div className="course-page">
      <header className="course-header">
        <div>
          <h1>
            Engelsk Grammatik{" "}
            <span className="level-highlight">
              Nivå {level.toUpperCase()}
            </span>
          </h1>
          <p>Öva på att tala och skriva. Få omedelbar återkoppling.</p>
        </div>

        <span className={`course-badge ${hasAccess ? "active" : "preview"}`}>
          {hasAccess ? "Köpt & Aktiv" : "Gratis Förhandsvisning"}
        </span>
      </header>

      <div className="exercise-list">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isPaidUser={hasAccess}
          />
        ))}
      </div>

      {!hasAccess && (
        <div className="locked-course-card">
          <Lock size={36} />
          <h3>Lås upp hela kursen</h3>
          <p>
            Alla premiumövningar, röstigenkänning och personlig AI-feedback.
          </p>

          <button className="btn-buy" onClick={handleBuy} disabled={buying}>
            {buying ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <ShoppingCart size={20} /> Köp kursen (199 SEK)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
