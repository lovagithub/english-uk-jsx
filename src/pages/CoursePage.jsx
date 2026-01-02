import React, { useState } from "react";
import { Lock, ShoppingCart, Loader2, Mic, Send } from "lucide-react";

// --- EXERCISE CARD KOMPONENT (Stylad för att matcha bild 1) ---
const ExerciseCard = ({ exercise, isPaidUser }) => {
  const isLocked = exercise.isPremium && !isPaidUser;

  return (
    <div className={`exercise-card ${isLocked ? "locked-opacity" : ""}`}>
      <div className="card-header">
        <span className="exercise-number">{exercise.id}</span>
        <h3 className="exercise-title">{exercise.title}</h3>
      </div>
      
      <p className="exercise-question">
        <strong>Question:</strong> {exercise.question}
      </p>

      <div className="input-container">
        <textarea 
          className="exercise-textarea" 
          placeholder="Type your answer here..."
          disabled={isLocked}
        />
      </div>

      <div className="card-actions">
        <button className="btn-action btn-speak" disabled={isLocked}>
          <Mic size={18} /> Speak
        </button>
        <button className="btn-action btn-check" disabled={isLocked}>
          <Send size={18} /> Check
        </button>
      </div>
      
      {isLocked && (
        <div className="lock-overlay">
          <Lock size={16} /> Endast i fullversionen
        </div>
      )}
    </div>
  );
};

// --- HUVUDKOMPONENT: COURSE PAGE ---
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
    { id: "1", title: "Present Simple – Introductions", question: "Tell me your name and how old you are.", isPremium: false },
    { id: "2", title: "Daily Routine", question: "What do you usually do in the morning?", isPremium: false },
    { id: "3", title: "Past Simple – Last Weekend", question: "What did you do last Saturday?", isPremium: true },
    { id: "4", title: "Comparatives", question: "Compare Kyiv and Stockholm. Which is bigger?", isPremium: true },
  ];

  const b1Exercises = [
    { id: "1", title: "Present Perfect vs Past Simple", question: "Have you ever been to London? When did you go?", isPremium: false },
    { id: "2", title: "Future Forms", question: "What are your plans for next summer?", isPremium: false },
    { id: "3", title: "Second Conditional", question: "What would you do if you won a million dollars?", isPremium: true },
    { id: "4", title: "Passive Voice", question: "Describe how your favorite dish is cooked.", isPremium: true },
  ];

  const exercises = level === "A2" ? a2Exercises : b1Exercises;

  return (
    <div className="course-page container">
      {/* Header - Strukturerad för Flexbox (Bild 1) */}
      <div className="course-header">
        <div className="course-header-text">
          <h1>
            Engelsk Grammatik <span className="level-highlight">Nivå {level}</span>
          </h1>
          <p>
            Öva på att tala och skriva. Få omedelbar återkoppling på dina misstag.
          </p>
        </div>

        <span className={`course-badge ${hasAccess ? "active" : "preview"}`}>
          {hasAccess ? "Köpt & Aktiv" : "Gratis Förhandsvisning"}
        </span>
      </div>

      {/* Exercise List */}
      <div className="exercise-list">
        {exercises.map((exercise) => (
          <ExerciseCard
            key={exercise.id}
            exercise={exercise}
            isPaidUser={hasAccess}
          />
        ))}
      </div>
      {/* Nedre sektion - visas om användaren inte har åtkomst */}
{!hasAccess && (
  <div className="locked-course-card">
    <div className="lock-icon-container">
      <Lock size={32} />
    </div>
    
    <h3>Lås upp hela kursen</h3>
    
    <p>
      Få tillgång till alla premiumövningar, obegränsad röstigenkänning 
      och personlig AI-feedback på varje svar.
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
          <ShoppingCart size={20} />
          Köp kursen (199 SEK)
        </>
      )}
    </button>
  </div>
)}
 {/* Buy Section */}
{!hasAccess && (
  <div className="locked-course-card">
    <div className="lock-icon-bg">
      <Lock size={40} />
    </div>
    <h3>Lås upp hela kursen</h3>
    <p>Få tillgång till alla premiumövningar och full AI-feedback.</p>
    <button className="btn-buy" onClick={handleBuy}>
      <ShoppingCart size={20} /> 
      Köp kursen (199 SEK)
    </button>
  </div>
)}

     
    
    </div>
  );
};


export default CoursePage;