import React from "react";
import { useNavigate } from "react-router-dom";

const A2Preview = () => {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="container">
        <h1>Engelsk Grammatik – Nivå A2</h1>
        <p>Detta är en gratis förhandsvisning.</p>

        <div className="preview-box">
          <p><strong>Example exercise:</strong></p>
          <p>Tell me your name.</p>
        </div>

        <button
          className="btn btn-primary"
          onClick={() => navigate("/login")}
        >
          Logga in för full kurs
        </button>
      </div>
    </section>
  );
};

export default A2Preview;
