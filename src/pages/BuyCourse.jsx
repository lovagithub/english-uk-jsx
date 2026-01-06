import { useNavigate, useParams } from "react-router-dom";
import "../course.css";

const BuyCourse = ({ currentUser }) => {
  const navigate = useNavigate();
  const { level } = useParams();

  const course =
    level === "a2"
      ? { id: "C-ENG-A2", title: "English A2", price: 199 }
      : { id: "C-ENG-B1", title: "English B1", price: 399 };

  const handleBuy = async () => {
    try {
      const res = await fetch("/api/buy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          studentId: currentUser.student_id,
          course,
        }),
      });

      if (!res.ok) {
        throw new Error("Purchase failed");
      }

      await res.json();
      navigate(`/course/${level}`);
    } catch (err) {
      alert("Kunde inte genomföra köpet");
      console.error(err);
    }
  };

  return (
    <div className="course-page">
      <h1>Köp kurs</h1>

      <div className="locked-course-card">
        <p>
          <strong>Student:</strong> {currentUser.name}
        </p>
        <p>
          <strong>Telefon:</strong> {currentUser.phone}
        </p>
        <p>
          <strong>Adress:</strong> {currentUser.address}
        </p>

        <hr style={{ margin: "1rem 0" }} />

        <p>
          <strong>Kurs:</strong> {course.title}
        </p>
        <p>
          <strong>Pris:</strong> {course.price} SEK
        </p>

        <button className="btn-buy" onClick={handleBuy}>
          Köp kurs
        </button>
      </div>
    </div>
  );
};

export default BuyCourse;
