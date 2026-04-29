import React, { useState, useRef } from "react";
import { Lock, Mic, Send, Loader2 } from "lucide-react";
import { checkAnswerWithAI } from "../services/geminiService";

const ExerciseCard = ({ exercise, isPaidUser }) => {
  const isLocked = exercise.isPremium && !isPaidUser;

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);
  const [isCorrect, setIsCorrect] = useState(null);

  const recognitionRef = useRef(null);

  const handleSpeak = () => {
    if (isLocked || loading) return;

    if (listening) {
      recognitionRef.current?.stop();
      setListening(false);
      return;
    }

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Röstigenkänning stöds inte i denna webbläsare.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer((prev) =>
        prev ? `${prev} ${transcript}` : transcript
      );
    };

    recognition.onerror = () => setListening(false);
    recognition.onend = () => setListening(false);

    recognition.start();
    recognitionRef.current = recognition;
  };

  const handleCheck = async () => {
    if (isLocked || !answer.trim()) return;

    setLoading(true);
    setFeedback("");
    setIsCorrect(null);

    try {
      const result = await checkAnswerWithAI(
        exercise.question,
        answer
      );

      if (!result) {
        setFeedback("Kunde inte analysera svaret.");
        setIsCorrect(false);
      } else {
        const lower = result.toLowerCase();

if (lower.includes("correct: yes")) {
  setIsCorrect(true);
} else if (lower.includes("correct: no")) {
  setIsCorrect(false);
} else {
  setIsCorrect(false);
}

        if (result.toLowerCase().includes("correct: yes")) {
  setIsCorrect(true);
} else {
  setIsCorrect(false);
}

        setFeedback(result);
        setAnswer("");
      }
    } catch (err) {
      setFeedback("AI kunde inte svara just nu.");
      setIsCorrect(false);
    }

    setLoading(false);
  };

  return (
    <div className={`exercise-card ${isLocked ? "locked-state" : ""}`}>
      <div className="card-header">
        <span className="exercise-id">#{exercise.id}</span>
        <h3 className="exercise-title">{exercise.title}</h3>
      </div>

      <p className="exercise-question">
        <strong>Question:</strong> {exercise.question}
      </p>

      <textarea
        className="exercise-textarea"
        placeholder={
          isLocked
            ? "Lås upp kursen för att svara..."
            : "Type or speak your answer..."
        }
        value={answer}
        onChange={(e) => {
  setAnswer(e.target.value);
  setFeedback("");
  setIsCorrect(null);
}}
        disabled={isLocked || loading}
      />

      <div className="controls">
        <button
          className={`btn-control btn-record ${
            listening ? "recording" : ""
          }`}
          onClick={handleSpeak}
          disabled={isLocked || loading}
        >
          <Mic size={18} />
          {listening ? "Lyssnar..." : "Tala in"}
        </button>

        <button
          className="btn-control btn-check"
          onClick={handleCheck}
          disabled={isLocked || loading}
        >
          {loading ? (
            <Loader2 className="animate-spin" size={18} />
          ) : (
            <>
              <Send size={18} /> Rätta
            </>
          )}
        </button>
      </div>

      {feedback && (
        <div className="feedback-section">
          <div className="ai-feedback-box">
            <strong>AI Feedback:</strong>
            <p>{feedback}</p>
          </div>

          <div className="feedback-animation">
            {isCorrect ? (
              <div className="anim-container">
                <div className="anim-char">🧑‍🎓</div>
                <div className="anim-text success">Bra jobbat!</div>
              </div>
            ) : (
              <div className="anim-container">
                <div className="anim-char">😕</div>
                <div className="anim-text error">Försök igen!</div>
              </div>
            )}
          </div>
        </div>
      )}

      {isLocked && (
        <div className="lock-overlay">
          <Lock size={16} className="lock-icon-inline" />
          Endast i fullversionen
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;