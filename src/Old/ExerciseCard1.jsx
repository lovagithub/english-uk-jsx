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
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/webm' });
        processInput(audioBlob, 'audio');
        stream.getTracks().forEach(track => track.stop());
      };

      mediaRecorder.start();
      setIsRecording(true);
      setErrorMsg(null);
    } catch (err) {
      console.error(err);
      setErrorMsg("Microphone access denied or not available.");
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
      setErrorMsg("Failed to analyze. Please try again.");
    } finally {
      setIsAnalyzing(false);
    }
  };

  const resetExercise = () => {
    setResult(null);
    setInputText('');
    setErrorMsg(null);
  };

  // Locked State
  if (exercise.isPremium && !isPaidUser) {
    return (
      <div className="locked-exercise">
        <div className="locked-overlay-icon">
          <Lock size={32} style={{ color: '#94a3b8', marginBottom: '0.5rem' }} />
          <span style={{ fontSize: '0.875rem', fontWeight: 600, color: '#64748b', textTransform: 'uppercase' }}>Premium Only</span>
        </div>
        <h3 className="exercise-title" style={{filter: 'blur(2px)'}}>{exercise.title}</h3>
        <p style={{filter: 'blur(2px)'}}>{exercise.question}</p>
      </div>
    );
  }

  return (
    <div className="exercise-card">
      <h3 className="exercise-title">
        <span className="exercise-id">{exercise.id}</span>
        {exercise.title}
      </h3>
      <p className="exercise-question">Question: {exercise.question}</p>

      {/* Input Area */}
      {!result && (
        <div>
          <textarea
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
            placeholder="Type your answer here..."
            className="input-textarea"
            disabled={isAnalyzing || isRecording}
          />
          
          <div className="controls">
            <button
              onClick={isRecording ? stopRecording : startRecording}
              disabled={isAnalyzing}
              className={`btn-control btn-record ${isRecording ? 'recording' : ''}`}
            >
              {isRecording ? <><VolumeX size={20}/> Stop</> : <><Mic size={20}/> Speak</>}
            </button>
            
            <button
              onClick={handleTextSubmit}
              disabled={!inputText.trim() || isAnalyzing || isRecording}
              className="btn-control btn-check"
            >
               {isAnalyzing ? <Loader2 className="animate-spin" size={20} /> : <><Send size={20}/> Check</>}
            </button>
          </div>
          {errorMsg && <p style={{color: 'var(--error)', textAlign: 'center', marginTop: '0.5rem'}}>{errorMsg}</p>}
        </div>
      )}

      {/* Result Area */}
      {result && (
        <div className={`result-box ${result.isCorrect ? 'result-correct' : 'result-incorrect'}`}>
          
          <div className="text-center" style={{marginBottom: '1rem'}}>
             {result.isCorrect ? (
               <div>
                 <div style={{fontSize: '3rem', marginBottom: '0.5rem'}} className="animate-bounce">🎉</div>
                 <h4 style={{fontSize: '1.5rem', fontWeight: 700, color: '#15803d', margin: 0}}>Чудово!</h4>
               </div>
             ) : (
               <div>
                 <div style={{fontSize: '3rem', marginBottom: '0.5rem'}}>🤔</div>
                 <h4 style={{fontSize: '1.5rem', fontWeight: 700, color: '#b91c1c', margin: 0}}>Майже...</h4>
               </div>
             )}
          </div>

          <div style={{textAlign: 'left'}}>
            <div className="feedback-section fb-user">
              <span className="feedback-label">Ви сказали:</span>
              <p className="feedback-text">"{result.transcribedText}"</p>
            </div>

            {!result.isCorrect && (
               <div className="feedback-section fb-error">
                <span className="feedback-label" style={{color: '#dc2626'}}>Як це звучить (буквально):</span>
                <p className="feedback-text">"{result.literalUkrainianTranslation}"</p>
              </div>
            )}

            <div className="feedback-section fb-correct">
              <span className="feedback-label" style={{color: '#16a34a'}}>{result.isCorrect ? 'Правильно:' : 'Краще сказати:'}</span>
              <p className="feedback-text">{result.correctEnglishPhrase}</p>
            </div>

            <div className="feedback-section fb-explain">
              <span className="feedback-label" style={{color: '#4f46e5'}}>Пояснення:</span>
              <p className="feedback-text" style={{fontSize: '1rem'}}>{result.explanation}</p>
            </div>
          </div>

          <button 
            onClick={resetExercise}
            className="btn btn-secondary"
            style={{width: '100%', marginTop: '1.5rem', justifyContent: 'center'}}
          >
            <RotateCcw size={16} /> Try Another
          </button>
        </div>
      )}
    </div>
  );
};

export default ExerciseCard;