import React from "react";
import { useNavigate } from "react-router-dom";

const B1Preview = () => {
  const navigate = useNavigate();

  return (
    <section className="section">
      <div className="container">
        <h1>Engelsk Grammatik – Nivå B1</h1>
        <p>Detta är en gratis förhandsvisning av B1-nivån.</p>

        <div className="preview-box">
          <p><strong>Example exercise:</strong></p>
          <p>
            Describe a situation where you had to solve a problem at work or
            school.
          </p>
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

export default B1Preview;
