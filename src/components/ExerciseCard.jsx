import React, { useState, useRef } from 'react';
import { Mic, Send, Lock, RotateCcw, VolumeX, Loader2 } from 'lucide-react';
import { analyzeSubmission } from '../services/geminiService.js';

const ExerciseCard = ({ exercise, isPaidUser }) => {
  const [inputText, setInputText] = useState('');
  const [isRecording, setIsRecording] = useState(false);
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [result, setResult] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);
  
  const mediaRecorderRef = useRef(null);
  const audioChunksRef = useRef([]);

  const handleTextSubmit = async () => {
    if (!inputText.trim()) return;
    processInput(inputText, 'text');
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = (event) => {
        if (event.data.size > 0) audioChunksRef.current.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        processInput(audioBlob, 'audio');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
    } catch (err) {
      setErrorMsg("Kunde inte starta mikrofonen.");
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const processInput = async (input, type) => {
    setIsAnalyzing(true);
    setResult(null);
    try {
      const analysis = await analyzeSubmission(input, exercise.question, type);
      setResult(analysis);
    } catch (e) {
      setErrorMsg("Kunde inte analysera svaret.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  // Inuti ExerciseCard.jsx
if (exercise.isPremium && !isPaidUser) {
  return (
    <div className="locked-exercise">
      <div className="premium-badge-overlay">
        <Lock size={32} className="lock-icon-gray" />
        <span className="premium-text">Premium Only</span>
      </div>
      
      <div className="locked-content-blur">
        <div className="card-header">
          <span className="exercise-id">{exercise.id}</span>
          <h3 className="exercise-title">{exercise.title}</h3>
        </div>
        <p className="exercise-question">Question: {exercise.question}</p>
        <div className="input-textarea-placeholder"></div>
      </div>
    </div>
  );


  }

  return (
    <div className="exercise-card">
      <div className="card-header">
        <span className="exercise-id">{exercise.id}</span>
        <h3 className="exercise-title">{exercise.title}</h3>
      </div>
      <p className="exercise-question">Question: {exercise.question}</p>

      {!result ? (
        <>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your answer here..."
            className="input-textarea"
            disabled={isAnalyzing || isRecording}
          />
          <div className="controls">
            <button onClick={isRecording ? stopRecording : startRecording} className={`btn-control btn-record ${isRecording ? 'recording' : ''}`}>
              {isRecording ? <><VolumeX size={20}/> Stop</> : <><Mic size={20}/> Speak</>}
            </button>
            <button onClick={handleTextSubmit} disabled={!inputText.trim() || isAnalyzing} className="btn-control btn-check">
               {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <><Send size={20}/> Check</>}
            </button>
          </div>
        </>
      ) : (
        <div className={`result-box ${result.isCorrect ? 'result-correct' : 'result-incorrect'}`}>
           <div className="text-center">
             <h4>{result.isCorrect ? '🎉 Utmärkt!' : '🤔 Nästan rätt...'}</h4>
           </div>
           <div className="feedback-section">
             <span className="feedback-label">Du sa:</span>
             <p className="feedback-text">"{result.transcribedText}"</p>
           </div>
           <button onClick={() => setResult(null)} className="btn-control btn-record" style={{width: '100%', marginTop: '1rem'}}>
             <RotateCcw size={16} /> Försök igen
           </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;