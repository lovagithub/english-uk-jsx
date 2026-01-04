import { GoogleGenAI, Type } from "@google/genai";
import { AIAnalysisResult } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const SYSTEM_INSTRUCTION = `
You are an expert English tutor for Ukrainian students. 
Your task is to evaluate a student's English sentence (text or audio).

1. Identify if the grammar/usage is correct for the given context.
2. If INCORRECT: 
   - Translate the student's *incorrect* English literally into Ukrainian to show why it sounds wrong (e.g., "I have 20 years" -> "Я маю 20 років" instead of "Мені 20 років").
   - Provide the correct English phrase.
   - Explain the grammar rule clearly in Ukrainian.
3. If CORRECT:
   - Provide a natural Ukrainian translation.
   - Explain why it is good (briefly) in Ukrainian.

Return strictly JSON.
`;

const RESPONSE_SCHEMA = {
  type: Type.OBJECT,
  properties: {
    isCorrect: { type: Type.BOOLEAN },
    transcribedText: { type: Type.STRING, description: "What the user said or wrote" },
    literalUkrainianTranslation: { type: Type.STRING, description: "Literal translation emphasizing errors" },
    correctEnglishPhrase: { type: Type.STRING },
    explanation: { type: Type.STRING, description: "Explanation in Ukrainian" },
  },
  required: ["isCorrect", "transcribedText", "literalUkrainianTranslation", "correctEnglishPhrase", "explanation"],
};

export const analyzeSubmission = async (
  input: string | Blob, 
  contextQuestion: string, 
  inputType: 'text' | 'audio'
): Promise<AIAnalysisResult> => {
  
  try {
    const modelId = "gemini-2.5-flash"; // Good balance of speed and multimodal
    
    let contents: any[] = [];
    const promptText = `Context Question: "${contextQuestion}". \n\nAnalyze the following student response.`;

    if (inputType === 'text' && typeof input === 'string') {
      contents = [
        { text: promptText },
        { text: `Student Answer: "${input}"` }
      ];
    } else if (inputType === 'audio' && input instanceof Blob) {
       const base64Audio = await blobToBase64(input);
       contents = [
         { text: promptText },
         {
           inlineData: {
             mimeType: input.type,
             data: base64Audio
           }
         }
       ];
    }

    const response = await ai.models.generateContent({
      model: modelId,
      contents: { parts: contents },
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        responseSchema: RESPONSE_SCHEMA,
      },
    });

    const jsonText = response.text;
    if (!jsonText) throw new Error("No response from AI");
    
    return JSON.parse(jsonText) as AIAnalysisResult;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback error object
    return {
      isCorrect: false,
      transcribedText: "",
      literalUkrainianTranslation: "Помилка з'єднання.",
      correctEnglishPhrase: "Error connecting to AI.",
      explanation: "Будь ласка, спробуйте ще раз."
    };
  }
};

// Helper to convert Blob to Base64
const blobToBase64 = (blob: Blob): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      const base64String = (reader.result as string).split(',')[1];
      resolve(base64String);
    };
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
};
