import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  
  useEffect(() => {
    setEmail("");
    setPassword("");
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      const storedUserJson = localStorage.getItem("registeredUser");

      if (!storedUserJson) {
        setError("Ingen användare hittades. Har du registrerat dig?");
        setLoading(false);
        return;
      }

      const storedUser = JSON.parse(storedUserJson);

      if (storedUser.email === email && storedUser.password === password) {
        onLogin(storedUser);
        navigate("/");
      } else {
        setError("Fel e-post eller lösenord.");
      }
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Logga in</h2>
        <p className="navbar-subtitle">Använd dina sparade uppgifter.</p>


        {error && <p className="auth-error">{error}</p>}

        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off" 
            name="email_login_field" 
          />
          <input
            type="password"
            placeholder="Lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password" 
            name="password_login_field"
          />

          
          <button 
            disabled={loading} 
            className="btn btn-primary btn-full-width">
            {loading ? <Loader2 className="animate-spin" /> : "Logga in"}
          </button>
        </form>

        <div className="auth-footer">
          Har du inget konto? <Link to="/register">Registrera dig</Link>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;