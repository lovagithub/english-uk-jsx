// ===============================
// 1️⃣ Ladda .env FÖRST (viktigt)
// ===============================
import dotenv from "dotenv";

const result = dotenv.config();

// Debug-loggar (kan tas bort senare)
console.log("dotenv result:", result.error ? result.error : "OK");
console.log("OPENAI_API_KEY exists:", !!process.env.OPENAI_API_KEY);

// Stoppa servern direkt om API-nyckeln saknas
if (!process.env.OPENAI_API_KEY) {
  console.error("❌ OPENAI_API_KEY saknas. Kontrollera .env-filen.");
  process.exit(1);
}

// ===============================
// 2️⃣ Importera resten
// ===============================
import express from "express";
import cors from "cors";
import aiRoutes from "./routes/ai.js";

// ===============================
// 3️⃣ Skapa appen
// ===============================
const app = express();

app.use(cors());
app.use(express.json());

// ===============================
// 4️⃣ Routes
// ===============================
app.use("/api", aiRoutes);

// Hälsokontroll
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// ===============================
// 5️⃣ Starta servern
// ===============================
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
