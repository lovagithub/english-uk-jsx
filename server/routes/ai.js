import OpenAI from "openai";
import express from "express";

const router = express.Router();

router.post("/gemini/check-answer", async (req, res) => {
  try {
    if (!process.env.OPENAI_API_KEY) {
      throw new Error("OPENAI_API_KEY saknas i miljövariablerna");
    }

    const client = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY,
    });

    const { question, answer } = req.body;

    if (!question || !answer) {
      return res.status(400).json({ error: "question och answer krävs" });
    }

    const response = await client.responses.create({
      model: "gpt-4.1-mini",
      input: `Question: ${question}\nStudent answer: ${answer}`,
    });

    res.json({
      feedback: response.output_text,
    });
  } catch (err) {
    console.error("AI ERROR:", err.message);
    res.status(500).json({ error: err.message });
  }
});

export default router;
