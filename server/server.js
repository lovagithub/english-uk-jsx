import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { GoogleGenAI, Type } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY
});

app.post("/analyze", async (req, res) => {
  const { input, contextQuestion, inputType } = req.body;

  const response = await ai.models.generateContent({
    model: "gemini-2.5-flash",
    contents: [{ text: input }],
    config: { responseMimeType: "application/json" }
  });

  res.json(JSON.parse(response.text));
});

app.listen(3000, () => console.log("Backend running on 3000"));
