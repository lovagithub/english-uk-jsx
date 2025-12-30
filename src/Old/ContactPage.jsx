import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Send, Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  if (submitted) {
    return (
      <div className="auth-container">
        <div className="auth-card text-center">
          <Send size={32} className="success-icon" />
          <h2>Tack för ditt meddelande!</h2>
          <p>Vi återkommer så snart som möjligt.</p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Tillbaka till startsidan
          </button>
        </div>
      </div>
    );
  }

  return (
    <section className="section">
      <div className="container grid md-grid-cols-2 gap-4">
        <div className="contact-info">
          <h3>Kontaktinformation</h3>

          <div className="contact-item">
            <Mail /> <span>support@linguaai.se</span>
          </div>
          <div className="contact-item">
            <Phone /> <span>08-123 456 78</span>
          </div>
          <div className="contact-item">
            <MapPin /> <span>Sveavägen 42, Stockholm</span>
          </div>
        </div>

        <div className="auth-card">
          <form onSubmit={handleSubmit}>
            <input name="name" placeholder="Namn" required onChange={handleChange} />
            <input name="email" type="email" placeholder="E-post" required onChange={handleChange} />
            <textarea name="message" placeholder="Meddelande" required onChange={handleChange} />

            <button className="btn btn-primary" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Skicka"}
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default ContactPage;
