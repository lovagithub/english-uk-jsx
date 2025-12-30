import React from "react";
import { useNavigate } from "react-router-dom";
import { Star, CheckCircle, ArrowRight, Play } from "lucide-react";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <main>

      {/* ================= HERO ================= */}
      <section className="section hero">
        <div className="container text-center">
          <h1 className="hero-title">
            Master English with <br />
            <span className="text-primary">Instant AI Feedback</span>
          </h1>

          <p className="hero-subtitle">
            Don't just learn grammar rules. Speak, get corrected, and understand
            your mistakes through literal Ukrainian translations.
          </p>

          <div className="hero-actions">
            <button
           
              className="btn btn-primary"
              onClick={() => navigate("/preview/a2")}
            >
              Start A2 Course
            </button>

            <button
           
              className="btn btn-primary"
              onClick={() => navigate("/preview/b1")}
            >

              Try B1 Level
            </button>
          </div>
        </div>
      </section>

      {/* ================= VIDEO ================= */}
      <section className="section bg-soft">
        <div className="container text-center">
          <h2 className="section-title">How LinguaAI Works</h2>

          <div className="video-wrapper">
            <iframe
              src="https://www.youtube.com/embed/dQw4w9WgXcQ"
              title="How LinguaAI Works"
              frameBorder="0"
              allowFullScreen
            />
            <div className="video-overlay">
              <Play size={18} />
              <span>Watch how our AI analyzes your pronunciation</span>
            </div>
          </div>
        </div>
      </section>

      {/* ================= STORIES ================= */}
      <section className="section">
        <div className="container">
          <h2 className="section-title text-center">
            Student Success Stories
          </h2>

          <div className="stories-grid">
            {[
              {
                name: "Oksana",
                level: "B1",
                text:
                  "I finally understood why 'I feel myself good' is wrong!"
              },
              {
                name: "Dmytro",
                level: "A2",
                text:
                  "The AI explains rules in Ukrainian instantly."
              },
              {
                name: "Anna",
                level: "B2",
                text:
                  "Passing the interview was easy after practicing here."
              }
            ].map((story, index) => (
              <div className="story-card" key={index}>
                <div className="stars">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={14} />
                  ))}
                </div>

                <p className="story-text">"{story.text}"</p>

                <div className="story-user">
                  <div className="avatar">{story.name[0]}</div>
                  <div>
                    <strong>{story.name}</strong>
                    <div className="muted">Level {story.level}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= PRICING ================= */}
      <section className="section pricing-section">
        <div className="container text-center">
          <h2 className="section-title text-white">Simple Pricing</h2>

          <div className="pricing-grid">
            <div className="pricing-card">
              <h3 className="plan-name">Basic</h3>
              <div className="price">Free</div>

              <ul className="feature-list">
                <li><CheckCircle size={18} /> First 3 A2 lessons</li>
                <li><CheckCircle size={18} /> Text exercises</li>
                <li><CheckCircle size={18} /> Basic grammar</li>
              </ul>

              <button
                className="btn btn-dark"
                onClick={() => navigate("/register")}
              >
                Get Started
              </button>
            </div>

            <div className="pricing-card pricing-highlight">
              <span className="badge">POPULAR</span>

              <h3 className="plan-name">Pro</h3>
              <div className="price">$9 / mo</div>

              <ul className="feature-list">
                <li><CheckCircle size={18} /> Unlimited A2 & B1</li>
                <li><CheckCircle size={18} /> Voice feedback</li>
                <li><CheckCircle size={18} /> Advanced AI</li>
              </ul>

              <button
                className="btn btn-primary"
                onClick={() => navigate("/login")}
              >
                Upgrade Now
              </button>
            </div>
          </div>
        </div>
      </section>

    </main>
  );
};

export default LandingPage;
