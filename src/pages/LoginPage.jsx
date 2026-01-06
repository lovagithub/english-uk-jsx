import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.error || "Login failed");
      }

      onLogin(data);
      navigate("/");
    } catch (err) {
      alert("Kunde inte logga in: " + err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Logga in</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Ditt namn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />

          <button disabled={loading} className="btn btn-primary">
            {loading ? <Loader2 className="animate-spin" /> : "Logga in"}
          </button>
        </form>

        <Link to="/register">Skapa konto</Link>
      </div>
    </div>
  );
};

export default LoginPage;
