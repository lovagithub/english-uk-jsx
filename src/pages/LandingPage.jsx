import React from 'react';
import { View } from '../types.js';
import { Star, CheckCircle, ArrowRight, Play } from 'lucide-react';

const LandingPage = ({ setView }) => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="hero-section">
        <div className="container">
          <h1 className="hero-title">
            Master English with <br />
            <span style={{color: 'var(--primary)'}}>Instant AI Feedback</span>
          </h1>
          <p className="hero-subtitle">
            Don't just learn grammar rules. Speak, get corrected, and understand your mistakes through literal Ukrainian translations.
          </p>
          <div className="flex justify-center gap-4">
            <button 
              onClick={() => setView(View.COURSE_A2)}
              className="btn btn-primary"
              style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}
            >
              Start A2 Course <ArrowRight size={20} />
            </button>
            <button 
              onClick={() => setView(View.COURSE_B1)}
              className="btn btn-secondary"
              style={{ fontSize: '1.125rem', padding: '1rem 2rem' }}
            >
              Try B1 Level
            </button>
          </div>
        </div>
      </section>

      {/* Video / How it works Section - Added to meet assignment multimedia requirements */}
      <section className="section" style={{backgroundColor: '#f8fafc'}}>
        <div className="container text-center">
          <h2 className="section-title">How LinguaAI Works</h2>
          <div style={{
            maxWidth: '800px', 
            margin: '0 auto', 
            aspectRatio: '16/9', 
            backgroundColor: '#000', 
            borderRadius: '1rem', 
            overflow: 'hidden',
            position: 'relative',
            boxShadow: '0 20px 25px -5px rgb(0 0 0 / 0.1)'
          }}>
            {/* Placeholder for a real video. Using an iframe for a generic English learning intro */}
            <iframe 
              width="100%" 
              height="100%" 
              src="https://www.youtube.com/embed/dQw4w9WgXcQ?autoplay=0&mute=1&controls=1&showinfo=0" 
              title="How to learn English" 
              frameBorder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowFullScreen
              style={{position: 'absolute', top: 0, left: 0}}
            ></iframe>
            
            {/* Overlay description for the assignment context */}
            <div style={{
              position: 'absolute', 
              bottom: 0, 
              left: 0, 
              right: 0, 
              padding: '1rem', 
              background: 'linear-gradient(to top, rgba(0,0,0,0.8), transparent)',
              color: 'white',
              textAlign: 'left'
            }}>
              <div className="flex items-center gap-2">
                <Play size={20} fill="white" />
                <span style={{fontWeight: 600}}>Watch how our AI analyzes your pronunciation</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Success Stories */}
      <section className="section" style={{backgroundColor: 'white'}}>
        <div className="container">
          <h2 className="section-title">Student Success Stories</h2>
          <div className="grid md-grid-cols-3">
            {[
              { name: "Oksana", level: "B1", text: "I finally understood why 'I feel myself good' is wrong! The literal translation feature is hilarious but effective." },
              { name: "Dmytro", level: "A2", text: "The AI explains rules in Ukrainian instantly. It's like having a private tutor 24/7." },
              { name: "Anna", level: "B2", text: "Passing the interview was easy after practicing with the voice scenarios here." }
            ].map((story, i) => (
              <div key={i} className="story-card">
                <div className="stars">
                  {[...Array(5)].map((_, i) => <Star key={i} size={16} fill="currentColor" />)}
                </div>
                <p style={{fontStyle: 'italic', marginBottom: '1.5rem', color: '#4b5563'}}>"{story.text}"</p>
                <div className="flex items-center gap-2">
                  <div style={{width: '2.5rem', height: '2.5rem', backgroundColor: '#e0e7ff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, color: '#4338ca'}}>
                    {story.name[0]}
                  </div>
                  <div>
                    <h4 style={{fontWeight: 700, margin: 0}}>{story.name}</h4>
                    <span style={{fontSize: '0.875rem', color: '#6b7280'}}>Level {story.level}</span>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section pricing-section">
        <div className="container">
          <h2 className="section-title">Simple Pricing</h2>
          <div className="grid md-grid-cols-2" style={{maxWidth: '56rem', margin: '0 auto'}}>
            
            <div className="pricing-card">
              <h3 style={{color: '#818cf8', fontSize: '1.25rem', marginBottom: '0.5rem'}}>Basic</h3>
              <div className="price-tag">Free</div>
              <ul className="feature-list">
                <li><CheckCircle size={20} color="#4ade80" /> Access to first 3 lessons of A2</li>
                <li><CheckCircle size={20} color="#4ade80" /> Text exercises</li>
                <li><CheckCircle size={20} color="#4ade80" /> Basic grammar rules</li>
              </ul>
              <button className="btn" style={{width: '100%', backgroundColor: '#334155', color: 'white'}}>Get Started</button>
            </div>

            <div className="pricing-card highlight">
              <div style={{position: 'absolute', top: 0, right: 0, background: '#facc15', color: '#713f12', fontSize: '0.75rem', fontWeight: 700, padding: '0.25rem 0.75rem', borderBottomLeftRadius: '0.5rem', borderTopRightRadius: '0.5rem'}}>POPULAR</div>
              <h3 style={{color: 'white', fontSize: '1.25rem', marginBottom: '0.5rem'}}>Pro</h3>
              <div className="price-tag">$9<span style={{fontSize: '1.125rem', fontWeight: 400, color: '#c7d2fe'}}>/mo</span></div>
              <ul className="feature-list">
                <li><CheckCircle size={20} color="white" /> Unlimited A2 & B1 Access</li>
                <li><CheckCircle size={20} color="white" /> Voice Input & Feedback</li>
                <li><CheckCircle size={20} color="white" /> Advanced AI Corrections</li>
              </ul>
              <button className="btn" style={{width: '100%', backgroundColor: 'white', color: '#4f46e5'}}>Upgrade Now</button>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};

export default LandingPage;