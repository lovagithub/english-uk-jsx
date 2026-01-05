import OpenAI from "openai";
import express from "express";

const router = express.Router();

router.post("/gemini/check-answer", async (req, res) => {
  try {
    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({
        error: "question och answer krävs",
      });
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Question: ${question}\nStudent answer: ${answer}\nGive short feedback.`,
    });

    const feedback =
      response.output_text ||
      response.output?.[0]?.content?.[0]?.text ||
      "No feedback generated.";

    res.json({
      feedback,
    });
  } catch (err) {
    console.error("AI FULL ERROR:", err);
    res.status(500).json({
      error: err.message || "AI error",
    });
  }
});

export default router;
