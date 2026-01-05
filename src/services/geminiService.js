export const analyzeSubmission = async (
  input,
  contextQuestion,
  inputType = "text"
) => {
  try {
    const response = await fetch("/api/gemini/check-answer", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        question: contextQuestion,
        answer: input,
      }),
    });

    if (!response.ok) {
      const err = await response.json();
      throw new Error(err.error || "AI request failed");
    }

    return await response.json();
  } catch (err) {
    console.error("analyzeSubmission error:", err.message);
    return {
      feedback: "Kunde inte kontakta AI-tjänsten.",
    };
  }
};
