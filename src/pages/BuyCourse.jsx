import { useParams, useNavigate } from "react-router-dom";
import { useState } from "react";

const BuyCourse = ({ currentUser }) => {
  const { level } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const price = level === "A2" ? 199 : 399;
  const title = `Engelsk Grammatik – Nivå ${level}`;

  const handleDemoBuy = async () => {
    setLoading(true);

    const res = await fetch("/api/demo-buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: currentUser.student_id,
        level
      }),
    });

    const data = await res.json();

    setLoading(false);

    if (res.ok) {
      alert("✅ Demo-köp genomfört!");
      navigate(`/course/${level}`);
    } else {
      alert(data.error || "Något gick fel");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "2rem auto" }}>
      <h1>Köp kurs (Demo)</h1>

      <h3>Kvitto</h3>
      <p><strong>Student:</strong> {currentUser.name}</p>
      <p><strong>Telefon:</strong> {currentUser.phone}</p>
      <p><strong>Adress:</strong> {currentUser.address}</p>

      <hr />

      <p><strong>Kurs:</strong> {title}</p>
      <p><strong>Pris:</strong> {price} SEK</p>
      <p><strong>Datum:</strong> {new Date().toLocaleDateString()}</p>

      <button
        onClick={handleDemoBuy}
        disabled={loading}
        style={{ marginTop: "1rem" }}
      >
        {loading ? "Genomför..." : "Slutför demo-köp"}
      </button>

      <p style={{ marginTop: "1rem", fontSize: "0.85rem", color: "#666" }}>
        Detta är ett demoköp. Ingen riktig betalning sker.
      </p>
    </div>
  );
};

export default BuyCourse;
