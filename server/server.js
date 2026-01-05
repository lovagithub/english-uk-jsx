import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import aiRouter from "./routes/ai.js";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use("/api", aiRouter);

// Start server
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});
