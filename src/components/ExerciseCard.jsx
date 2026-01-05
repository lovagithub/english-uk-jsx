import { useState, useRef } from "react";
import { Lock, Mic, Send, Loader2 } from "lucide-react";
import { analyzeSubmission } from "../services/geminiService";

const ExerciseCard = ({ exercise, isPaidUser }) => {
  const isLocked = exercise.isPremium && !isPaidUser;

  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState("");
  const [loading, setLoading] = useState(false);
  const [listening, setListening] = useState(false);

  const recognitionRef = useRef(null);

  /* ===========================
     🎤 SPEECH TO TEXT
  =========================== */
  const handleSpeak = () => {
    if (isLocked || loading) return;

    const SpeechRecognition =
      window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Röstigenkänning stöds inte i denna webbläsare.");
      return;
    }

    if (recognitionRef.current) {
      recognitionRef.current.stop();
      recognitionRef.current = null;
      setListening(false);
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;

    recognition.onstart = () => setListening(true);

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setAnswer((prev) => (prev ? prev + " " : "") + transcript);
    };

    recognition.onerror = (event) => {
      if (event.error === "no-speech" || event.error === "aborted") return;
      if (event.error === "not-allowed") {
        alert("Tillåt mikrofonen i webbläsaren.");
      }
    };

    recognition.onend = () => {
      setListening(false);
      recognitionRef.current = null;
    };

    recognition.start();
    recognitionRef.current = recognition;
  };

  /* ===========================
     🧠 AI CHECK
  =========================== */
  const handleCheck = async () => {
    if (isLocked || !answer.trim()) return;

    setLoading(true);
    setFeedback("");

    try {
      const result = await analyzeSubmission(
        answer,
        exercise.question,
        "text"
      );
      setFeedback(result.feedback);
    } catch {
      setFeedback("AI-feedback är inte tillgänglig just nu.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className={`exercise-card ${isLocked ? "locked-opacity" : ""}`}>
      <div className="card-header">
        <span className="exercise-id">{exercise.id}</span>
        <h3 className="exercise-title">{exercise.title}</h3>
      </div>

      <p className="exercise-question">
        <strong>Question:</strong> {exercise.question}
      </p>

      <textarea
        className="exercise-textarea"
        placeholder="Type or speak your answer..."
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
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
          {listening ? "Listening..." : "Speak"}
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
              <Send size={18} /> Check
            </>
          )}
        </button>
      </div>

      {feedback && (
        <div className="ai-feedback">
          <strong>AI Feedback:</strong>
          <p>{feedback}</p>
        </div>
      )}

      {isLocked && (
        <div className="lock-overlay">
          <Lock size={16} /> Endast i fullversionen
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;
