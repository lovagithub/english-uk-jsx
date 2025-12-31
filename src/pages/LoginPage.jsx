import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const res = await fetch("http://localhost:3000/students");
      const students = await res.json();

      const user = students.find(
        (s) => s.student_id === studentId
      );

      if (!user) {
        setError("Fel student-ID");
        setLoading(false);
        return;
      }

      onLogin(user);
      navigate("/");
    } catch (err) {
      setError("Kunde inte logga in");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Logga in</h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Student ID (t.ex. S-001)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
            required
          />

          {error && <p className="error">{error}</p>}

          <button className="btn btn-primary" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Logga in"}
          </button>
        </form>

        <p>
          Inget konto? <Link to="/register">Registrera dig</Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
