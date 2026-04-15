import React, { useState, useEffect } from "react";
import "../course.css"; 
import { Mic, Volume2, RefreshCw, CheckCircle, XCircle } from "lucide-react";

const ExternalApiCourse = () => {
  const [wordData, setWordData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [listening, setListening] = useState(false);
  const [spokenText, setSpokenText] = useState("");
  const [feedbackMsg, setFeedbackMsg] = useState(null); 

  const practiceWords = [
    "education", "technology", "nature", "science", "future", 
    "freedom", "adventure", "knowledge", "university", "language"
  ];

  useEffect(() => {
    fetchRandomWordData();
  }, []);

  const fetchRandomWordData = async () => {
    setLoading(true);
    setError(null);
    setSpokenText("");
    setFeedbackMsg(null);
    
    const randomWord = practiceWords[Math.floor(Math.random() * practiceWords.length)];
    
    try {
      const response = await fetch(`https://api.dictionaryapi.dev/api/v2/entries/en/${randomWord}`);
      if (!response.ok) throw new Error("Kunde inte hämta data");
      const data = await response.json();
      setWordData(data[0]); 
    } catch (err) {
      setError("Kunde inte ladda övningen. Kontrollera din internetanslutning.");
    } finally {
      setLoading(false);
    }
  };

  const handleSpeak = () => {
    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

    if (!SpeechRecognition) {
      alert("Din webbläsare stöder inte röstigenkänning.");
      return;
    }

    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
      setSpokenText("Lyssnar...");
      setFeedbackMsg(null);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSpokenText(transcript);
      checkPronunciation(transcript);
    };

    recognition.onerror = () => {
      setListening(false);
      setSpokenText("Hörde inget, försök igen.");
    };

    recognition.onend = () => setListening(false);
    recognition.start();
  };

  const checkPronunciation = (transcript) => {
    if (!wordData) return;
    const correctWord = wordData.word.toLowerCase();
    const userWord = transcript.toLowerCase().replace(/[.,!?]/g, ""); 

    if (userWord === correctWord) {
      setFeedbackMsg("correct");
    } else {
      setFeedbackMsg("incorrect");
    }
  };

  if (loading) return (
    <div className="course-page">
      <div className="centered-message">
        <p>Hämtar nytt ord...</p>
      </div>
    </div>
  );
  
  if (error) return <div className="course-page"><p>{error}</p></div>;

  return (
    <div className="course-page">
      <header className="course-header">
        <div>
          <h1>Vocabulary Practice</h1>
          <p className="text-muted text-small">
            Data från <strong>Free Dictionary API</strong> & Webbläsarens mikrofon
          </p>
        </div>
        
        <button className="btn btn-secondary" onClick={fetchRandomWordData}>
          <RefreshCw size={18} className="icon-right" /> Nytt ord
        </button>
      </header>

      {wordData && (
        <div className="exercise-card">
          
          <div className="card-header-flex">
             <h2 className="exercise-title text-capitalize">
               {wordData.word}
             </h2>
             
             {wordData.phonetics.find(p => p.audio) && (
                <button 
                  className="btn-control btn-record btn-compact" 
                  onClick={() => new Audio(wordData.phonetics.find(p => p.audio).audio).play()}
                >
                  <Volume2 size={20} /> Lyssna
                </button>
             )}
          </div>

          <div className="definition-section">
            <p><strong>Definition:</strong> {wordData.meanings[0].definitions[0].definition}</p>
            {wordData.meanings[0].definitions[0].example && (
                <p className="text-muted text-italic">
                  " {wordData.meanings[0].definitions[0].example} "
                </p>
            )}
          </div>

          <div className="pronunciation-box">
            <p className="exercise-question">
              <strong>Uppgift:</strong> Tryck på mikrofonen och säg ordet <em>"{wordData.word}"</em> högt.
            </p>
            
            <div className="flex-center">
               <button 
                 className={`btn-control btn-record btn-wide ${listening ? "recording" : ""}`} 
                 onClick={handleSpeak}
               >
                 <Mic size={20} /> {listening ? "Lyssnar..." : "Tala nu"}
               </button>
            </div>

            {spokenText && (
              <div className="result-box">
                <p className="text-muted text-small">Du sa:</p>
                <div className="spoken-text-display">
                  "{spokenText}"
                </div>

                {feedbackMsg === "correct" && (
                  <div className="feedback-success">
                    <CheckCircle size={20} /> Perfekt uttal!
                  </div>
                )}

                {feedbackMsg === "incorrect" && (
                  <div className="feedback-error">
                    <XCircle size={20} /> Försök igen!
                  </div>
                )}
              </div>
            )}
          </div>

        </div>
      )}
    </div>
  );
};

export default ExternalApiCourse;