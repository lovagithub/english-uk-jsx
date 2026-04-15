export const analyzeSubmission = async (
  input,
  contextQuestion,
  inputType = "text"
) => {

  // Returnera ett Promise för att simulera asynkron laddning (som ett riktigt API)
  return new Promise((resolve) => {
    
    setTimeout(() => {
      
      if (!input || input.trim().length === 0) {
        resolve({
          feedback: "Jag hörde inget svar. Försök igen!",
          isCorrect: false
        });
        return;
      }

      if (input.trim().length < 3) {
        resolve({
          feedback: "Det var ett väldigt kort svar. Kan du utveckla det lite?",
          isCorrect: false
        });
        return;
      }

      // LYCKAT SCENARIO (Simulerat)
      resolve({
        feedback: "Detta är ett simulerat svar. Din mening ser grammatiskt korrekt ut och passar frågan! Bra jobbat.",
        isCorrect: true, 
        score: 8
      });

    }, 1500); // 1500 ms = 1.5 sekunder
  });
};