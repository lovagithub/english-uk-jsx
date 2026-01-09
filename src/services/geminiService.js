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

    const data = await response.json();

   
    if (typeof data.isCorrect === "boolean") {
      return data;
    }

   
    const feedbackText = (data.feedback || "").toLowerCase();

    const negativeKeywords = [
      "incorrect",
      "not correct",
      "wrong",
      "try again",
      "mistake",
      "error",
    ];

    const isCorrect = !negativeKeywords.some(word =>
      feedbackText.includes(word)
    );

    return {
      feedback: data.feedback,
      isCorrect,
    };
  } catch (err) {
    console.error("analyzeSubmission error:", err.message);
    return {
      feedback: "Kunde inte kontakta AI-tjänsten.",
      isCorrect: false,
    };
  }
};
