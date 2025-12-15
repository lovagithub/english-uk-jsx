export const analyzeSubmission = async (input, contextQuestion, inputType) => {
  try {
    let payloadInput = input;

    if (inputType === "audio" && input instanceof Blob) {
      payloadInput = await blobToBase64(input);
    }

    const response = await fetch("http://localhost:3000/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        input: payloadInput,
        contextQuestion,
        inputType
      })
    });

    const data = await response.json();
    return data;

  } catch (err) {
    console.error(err);
    return {
      isCorrect: false,
      explanation: "Serverfel"
    };
  }
};
