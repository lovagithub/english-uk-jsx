import React, { useState } from "react";
import ExerciseCard from "../components/ExerciseCard.jsx";
import { Lock, ShoppingCart, Loader2 } from "lucide-react";

const CoursePage = ({ level = "A2", currentUser, onBuyCourse }) => {
  const [buying, setBuying] = useState(false);

  const courseId = level === "A2" ? "C-ENG-A2" : "C-ENG-B1";
  const courseTitle = `Engelsk Grammatik – Nivå ${level}`;

  const hasAccess =
    currentUser?.courses?.some(
      (c) => c.course_id === courseId && c.paid
    ) || false;

  const handleBuy = async () => {
    if (!currentUser) {
      alert("Du måste logga in först");
      return;
    }

    setBuying(true);
    await onBuyCourse(courseId, courseTitle);
    setBuying(false);
  };

  const a2Exercises = [
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
  ];

  const b1Exercises = [
    {
      id: "1",
      title: "Present Perfect vs Past Simple",
      question: "Have you ever been to London? When did you go?",
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

  const exercises = level === "A2" ? a2Exercises : b1Exercises;

  return (
    <div className="course-page">
      {/* Header */}
      <div className="course-header">
        <h1>
          Engelsk Grammatik <span>Nivå {level}</span>
        </h1>

        <p>
          Öva på att tala och skriva. Få omedelbar återkoppling på dina misstag.
        </p>

        <span className={`course-badge ${hasAccess ? "active" : "preview"}`}>
          {hasAccess ? "Köpt & Aktiv" : "Gratis Förhandsvisning"}
        </span>
      </div>

      {/* Exercises */}
      <div className="exercise-list">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isPaidUser={hasAccess}
          />
        ))}
      </div>

      {/* Buy section */}
      {!hasAccess && (
        <div className="locked-course">
          <Lock size={48} />
          <h3>Lås upp hela kursen</h3>
          <p>
            Få tillgång till alla premiumövningar och full AI-feedback.
          </p>

          <button
            className="btn-primary"
            onClick={handleBuy}
            disabled={buying}
          >
            {buying ? (
              <Loader2 className="spin" />
            ) : (
              <>
                <ShoppingCart size={18} />
                Köp kursen (199 SEK)
              </>
            )}
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
