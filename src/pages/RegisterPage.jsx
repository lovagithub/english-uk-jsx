import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { MockAuthService } from "../services/mockDatabase";
import { Loader2 } from "lucide-react";

const RegisterPage = ({ onLogin }) => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", phone: "", address: "" });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    const user = await MockAuthService.register(
      formData.name,
      formData.phone,
      formData.address
    );
    onLogin(user);
    navigate("/");
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Skapa konto</h2>

        <form onSubmit={handleSubmit}>
          <input placeholder="Namn" onChange={(e) => setFormData({ ...formData, name: e.target.value })} />
          <input placeholder="Telefon" onChange={(e) => setFormData({ ...formData, phone: e.target.value })} />
          <input placeholder="Adress" onChange={(e) => setFormData({ ...formData, address: e.target.value })} />

          <button className="btn btn-primary">
            {loading ? <Loader2 className="animate-spin" /> : "Registrera"}
          </button>
        </form>

        <Link to="/login">Har du redan konto?</Link>
      </div>
    </div>
  );
};

export default RegisterPage;
