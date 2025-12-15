import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import fs from "fs";
import path from "path";
import { GoogleGenAI } from "@google/genai";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json({ limit: "50mb" }));

/* =========================
   Google Gemini (AI)
========================= */
const ai = new GoogleGenAI({
  apiKey: process.env.API_KEY
});

app.post("/analyze", async (req, res) => {
  try {
    const { input } = req.body;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: [{ text: input }],
      config: { responseMimeType: "application/json" }
    });

    res.json(JSON.parse(response.text));
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "AI error" });
  }
});

/* =========================
   Student data (JSON)
========================= */
const studentsPath = path.join(
  process.cwd(),
  "server",
  "students_informationen.json"
);

app.get("/students", (req, res) => {
  try {
    const data = fs.readFileSync(studentsPath, "utf-8");
    res.json(JSON.parse(data));
  } catch (err) {
    res.status(500).json({ error: "Could not read students file" });
  }
});

/* =========================
   Start server
========================= */
app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
