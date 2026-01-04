export const analyzeSubmission = async (
  input,
  contextQuestion,
  inputType
) => {
  try {
    let payloadInput = null;

    if (inputType === "text" && typeof input === "string") {
      payloadInput = input;
    }

    if (inputType === "audio" && input instanceof Blob) {
      payloadInput = await blobToBase64(input);
    }

    const response = await fetch(
      "http://localhost:3000/api/ai/analyze",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: payloadInput,
          contextQuestion,
          inputType,
        }),
      }
    );

    if (!response.ok) {
      throw new Error("AI backend not available");
    }

    return await response.json();

  } catch (err) {
    console.error("analyzeSubmission error:", err);
    return {
      isCorrect: false,
      transcribedText: "",
      literalUkrainianTranslation: "Помилка з'єднання.",
      correctEnglishPhrase: "",
      explanation: "Будь ласка, спробуйте ще раз.",
    };
  }
};

/* ===== helper ===== */
const blobToBase64 = (blob) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onloadend = () =>
      resolve(reader.result.split(",")[1]);
    reader.onerror = reject;
    reader.readAsDataURL(blob);
  });
