import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const RegisterPage = ({ onLogin }) => {
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
  });

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      const res = await fetch("http://localhost:3000/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!res.ok) {
        throw new Error("Registration failed");
      }

      const user = await res.json();
      onLogin(user);
      navigate("/");
    } catch (err) {
      console.error(err);
      alert("Kunde inte registrera användare");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Skapa konto</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Namn"
            value={formData.name}
            onChange={(e) =>
              setFormData({ ...formData, name: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Telefon"
            value={formData.phone}
            onChange={(e) =>
              setFormData({ ...formData, phone: e.target.value })
            }
            required
          />

          <input
            type="text"
            placeholder="Adress"
            value={formData.address}
            onChange={(e) =>
              setFormData({ ...formData, address: e.target.value })
            }
            required
          />

          <button className="btn btn-primary" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Registrera"}
          </button>
        </form>

        <Link to="/login">Har du redan konto?</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
