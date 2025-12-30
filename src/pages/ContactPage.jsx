import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Loader2, Send, Mail, Phone, MapPin } from "lucide-react";

const ContactPage = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    await new Promise((r) => setTimeout(r, 1500));
    setLoading(false);
    setSubmitted(true);
  };

  /* ================= SUCCESS STATE ================= */
  if (submitted) {
    return (
      <section className="section">
        <div className="container text-center">
          <Send size={40} className="text-primary" />
          <h2 style={{ marginTop: "1rem" }}>Tack för ditt meddelande!</h2>
          <p style={{ margin: "1rem 0", color: "var(--text-muted)" }}>
            Vi återkommer så snart som möjligt.
          </p>
          <button className="btn btn-primary" onClick={() => navigate("/")}>
            Tillbaka till startsidan
          </button>
        </div>
      </section>
    );
  }

  /* ================= FORM ================= */
  return (
    <section className="section">
      <div className="contact-wrapper">
        <div className="contact-grid">
          
          {/* LEFT INFO */}
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

          {/* FORM */}
          <form className="contact-form" onSubmit={handleSubmit}>
            <label>Namn</label>
            <input
              name="name"
              placeholder="Ditt namn"
              required
              onChange={handleChange}
            />

            <label>E-post</label>
            <input
              name="email"
              type="email"
              placeholder="din@email.se"
              required
              onChange={handleChange}
            />

            <label>Meddelande</label>
            <textarea
              name="message"
              placeholder="Hur kan vi hjälpa dig?"
              required
              onChange={handleChange}
            />

            <button className="btn btn-primary" disabled={loading}>
              {loading ? <Loader2 className="animate-spin" /> : "Skicka Meddelande"}
            </button>
          </form>

        </div>
      </div>
    </section>
  );
};

export default ContactPage;
