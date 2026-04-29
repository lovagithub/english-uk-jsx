import { useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Lock, ShoppingCart, Loader2, BookOpen } from "lucide-react";
import ExerciseCard from "../components/ExerciseCard";
import coursesData from "../data/courses.json";
import "../course.css";

const CoursePage = ({ currentUser }) => {
  const navigate = useNavigate();
  const { level } = useParams();
  const [buying, setBuying] = useState(false);

  const course = coursesData.courses.find((c) => c.id === level);

  if (!course) {
    return (
      <div className="course-page">
        <h2>Kursen hittades inte</h2>
      </div>
    );
  }

  const courseId = level === "a2" ? "C-ENG-A2" : "C-ENG-B1";

  const hasAccess = Boolean(
    currentUser?.courses?.some(
      (c) =>
        c.course_id.toLowerCase() === courseId.toLowerCase() &&
        c.paid === true
    )
  );

  const handleBuy = () => {
    setBuying(true);
    navigate(`/buy/${course.id}`);
  };

  const goToVocabulary = () => {
    navigate(`/course/${course.id}/vocabulary`);
  };

  return (
    <div className="course-page">
      <header className="course-header">
        <div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>

          <button
            className="btn-control btn-vocabulary"
            onClick={goToVocabulary}
          >
            <BookOpen size={20} />
            Öva Ordförråd
          </button>
        </div>

        <span
          className={`course-badge ${
            hasAccess ? "active" : "preview"
          }`}
        >
          {hasAccess ? "Köpt & Aktiv" : "Gratis Förhandsvisning"}
        </span>
      </header>

      <div className="exercise-list">
        {course.exercises.map((exercise) => (
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
            Alla premiumövningar, röstigenkänning och personlig autometeserad feedback.
          </p>

          <button
            className="btn-buy"
            onClick={handleBuy}
            disabled={buying}
          >
            {buying ? (
              <Loader2 className="animate-spin" size={20} />
            ) : (
              <>
                <ShoppingCart size={20} /> Köp kursen ({course.price} SEK)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursePage;