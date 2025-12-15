import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MockAuthService } from "../services/mockDatabase";
import { Loader2 } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [studentId, setStudentId] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await MockAuthService.login(studentId);
    if (user) {
      onLogin(user);
      navigate("/");
    } else {
      setError("Fel student-ID");
    }
    setLoading(false);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Logga in</h2>

        <form onSubmit={handleLogin}>
          <input
            placeholder="Student ID (S-001)"
            value={studentId}
            onChange={(e) => setStudentId(e.target.value)}
          />

          {error && <p className="error">{error}</p>}

          <button className="btn btn-primary">
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
