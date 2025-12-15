import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import ExerciseCard from "../components/ExerciseCard";
import { COURSE_IDS } from "../services/mockDatabase";
import { Lock, ShoppingCart, Loader2 } from "lucide-react";

const CoursePage = ({ level, currentUser, onBuyCourse }) => {
  const navigate = useNavigate();
  const courseId = level === "A2" ? COURSE_IDS.A2 : COURSE_IDS.B1;
  const hasAccess = currentUser?.courses.some(c => c.course_id === courseId && c.paid);

  const [buying, setBuying] = useState(false);

  const handleBuy = async () => {
    if (!currentUser) return navigate("/login");
    setBuying(true);
    await onBuyCourse(courseId);
    setBuying(false);
  };

  return (
    <div className="container">
      <h1>Engelska nivå {level}</h1>

      <div className="grid">
        {(level === "A2" ? a2Exercises : b1Exercises).map(ex => (
          <ExerciseCard key={ex.id} exercise={ex} isPaidUser={hasAccess} />
        ))}
      </div>

      {!hasAccess && (
        <div className="locked-card">
          <Lock size={40} />
          <p>Lås upp hela kursen</p>
          <button className="btn btn-primary" onClick={handleBuy}>
            {buying ? <Loader2 className="animate-spin" /> : <><ShoppingCart /> Köp kurs</>}
          </button>
        </div>
      )}
    </div>
  );
};

export default CoursePage;
