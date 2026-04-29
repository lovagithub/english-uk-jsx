const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export const checkAnswerWithAI = async (question, answer) => {
  const prompt = `
You are an English teacher for A2-B1 students.

Question: "${question}"
Student answer: "${answer}"

Task:
Check if the answer MEANS the right thing.

Rules:
- Ignore small grammar mistakes (capital letters, punctuation)
- If meaning is correct → Correct: yes
- If meaning is wrong → Correct: no
- Be simple and encouraging

Reply format:
Correct: yes or no
Förklaring (Swedish): short simple explanation
Correction (English): better example answer
`;
  try {
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1/models/gemini-2.5-flash:generateContent?key=${API_KEY}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          contents: [
            {
              parts: [{ text: prompt }],
            },
          ],
        }),
      }
    );

    if (!response.ok) {
      console.error("HTTP ERROR:", response.status);
      const errText = await response.text();
      console.error("DETAILS:", errText);
      return "AI kunde inte generera feedback.";
    }

    const data = await response.json();

    console.log("AI RESPONSE:", data);

    return (
      data?.candidates?.[0]?.content?.parts?.[0]?.text ||
      "AI kunde inte generera feedback."
    );
  } catch (error) {
    console.error("AI ERROR:", error);
    return "AI kunde inte svara just nu.";
  }
};