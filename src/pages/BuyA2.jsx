import { useNavigate } from "react-router-dom";

const BuyA2 = ({ student }) => {
  const navigate = useNavigate();

  const handleBuy = async () => {
    const res = await fetch("http://localhost:3000/api/buy", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        studentId: student.student_id,
        course: {
          id: "C-ENG-A2",
          title: "English A2"
        }
      })
    });

    const data = await res.json();
    navigate("/course/a2");
  };

  return (
    <div>
      <h1>Köp kurs: English A2</h1>
      <p>Student: {student.name}</p>
      <button onClick={handleBuy}>Köp kurs</button>
    </div>
  );
};

export default BuyA2;

