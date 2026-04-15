import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const BuyCourse = ({ currentUser }) => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const price = level === "a2" ? 199 : 399;
  const courseTitle = `Engelsk Grammatik – Nivå ${level.toUpperCase()}`;
  const courseId = level === "a2" ? "C-ENG-A2" : "C-ENG-B1";

  const handleDemoBuy = async () => {
    setLoading(true);

    setTimeout(() => {
      const storedUser = JSON.parse(localStorage.getItem("registeredUser"));
      
      if (!storedUser.courses) {
        storedUser.courses = [];
      }

      const alreadyBought = storedUser.courses.find(c => c.course_id === courseId);
      
      if (!alreadyBought) {
        storedUser.courses.push({
          course_id: courseId,
          title: courseTitle,
          paid: true,
          demo: true,
          course_start: new Date().toISOString()
        });

        localStorage.setItem("registeredUser", JSON.stringify(storedUser));
        localStorage.setItem("activeSession", JSON.stringify(storedUser));
      }

      setLoading(false);
      alert("✅ Demo-köp genomfört!");
      
     
      window.location.href = `/course/${level}`;
      
    }, 1500);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h1>Köp kurs (Demo)</h1>

        <h3>Kvitto</h3>
        
        <div className="receipt-section">
          <p><strong>Student:</strong> {currentUser.name}</p>
          <p><strong>E-post:</strong> {currentUser.email}</p>
        </div>

        <hr />

        
        <div className="receipt-section">
          <p><strong>Kurs:</strong> {courseTitle}</p>
          <p><strong>Pris:</strong> {price} SEK</p>
          <p><strong>Datum:</strong> {new Date().toLocaleDateString()}</p>
        </div>

        <button
          className="btn btn-primary btn-full-width"
          onClick={handleDemoBuy}
          disabled={loading}
        >
          {loading ? "Genomför köp..." : "Slutför demo-köp (Gratis)"}
        </button>

        <p className="navbar-subtitle disclaimer-text">
          Detta är ett skolprojekt. Ingen riktig betalning sker.
        </p>
      </div>
    </div>
  );
};

export default BuyCourse;