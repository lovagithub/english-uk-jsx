import { useParams, useNavigate } from "react-router-dom";

const COURSE_MAP = {
  a2: {
    id: "A2",
    title: "English A2",
    price: "299 SEK",
  },
  b1: {
    id: "B1",
    title: "English B1",
    price: "399 SEK",
  },
};

const BuyCourse = ({ currentUser }) => {
  const { level } = useParams();   // 👈 HÄR
  const navigate = useNavigate();

  const course = COURSE_MAP[level?.toLowerCase()];

  if (!course) {
    return <p>❌ Kursen finns inte.</p>;
  }

  const handleBuy = async () => {
    await fetch("http://localhost:3000/api/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: currentUser.student_id,
        course: {
          id: course.id,
          title: course.title,
        },
      }),
    });

    navigate(`/course/${level}`);
  };

  return (
    <div className="buy-page">
      <h1>Köp kurs</h1>

      <p><strong>Student:</strong> {currentUser.name}</p>
      <p><strong>Kurs:</strong> {course.title}</p>
      <p><strong>Pris:</strong> {course.price}</p>

      <button onClick={handleBuy}>
        Köp kurs
      </button>
    </div>
  );
};

export default BuyCourse;
