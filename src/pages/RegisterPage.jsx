import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Loader2 } from "lucide-react";

const RegisterPage = ({ onLogin }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [password, setPassword] = useState("");
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  
  useEffect(() => {
    setName("");
    setEmail("");
    setPhone("");
    setAddress("");
    setPassword("");
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    setTimeout(() => {
      if (!name || !email || !password || !phone || !address) {
        setError("Vänligen fyll i alla fält.");
        setLoading(false);
        return;
      }

      const newUser = {
        name,
        email,
        phone,
        address,
        password,
        id: Date.now(),
        courses: [] 
      };

      localStorage.setItem("registeredUser", JSON.stringify(newUser));
      onLogin(newUser);
      setLoading(false);
    }, 800);
  };

  return (
    <div className="auth-container">
      <div className="auth-card">
        <h2>Skapa konto</h2>
        <p className="navbar-subtitle">Fyll i dina uppgifter för att börja.</p>

       {error && <div className="auth-error">{error}</div>}

        
        <form onSubmit={handleSubmit} autoComplete="off">
          <input
            type="text"
            placeholder="För- och efternamn"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
            autoComplete="off"
            name="new_name_field"
          />
          
          <input
            type="email"
            placeholder="E-post"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
            autoComplete="off"
            name="new_email_field"
          />

          <input
            type="tel"
            placeholder="Telefonnummer"
            value={phone}
            onChange={(e) => setPhone(e.target.value)}
            required
            autoComplete="off"
            name="new_phone_field"
          />

          <input
            type="text"
            placeholder="Adress"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
            autoComplete="off"
            name="new_address_field" 
          />

          <input
            type="password"
            placeholder="Välj ett lösenord"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
            autoComplete="new-password" 
            name="new_password_field"
          />

         <button type="submit" className="btn btn-primary btn-full-width" disabled={loading}>
            {loading ? <Loader2 className="animate-spin" /> : "Registrera"}
          </button>
        </form>

        <div className="auth-footer">
          Redan medlem? <Link to="/login">Logga in</Link>
        </div>
      </div>
    </div>
  );
};

export default RegisterPage;