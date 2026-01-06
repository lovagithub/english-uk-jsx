import dotenv from "dotenv";
dotenv.config();


import express from "express";
import cors from "cors";

import aiRoutes from "./routes/ai.js";
import buyCourseRoutes from "./routes/buyCourse.js";
import { readStudents, writeStudents } from "./utils/studentsDb.js";

const app = express();

app.use(cors());
app.use(express.json());

/* ================= REGISTER ================= */
app.post("/register", (req, res) => {
  const { name, phone, address } = req.body;

  if (!name || !phone || !address) {
    return res.status(400).json({ error: "Missing fields" });
  }

  const db = readStudents();

  const newStudent = {
    student_id: `S-${Date.now()}`,
    name,
    phone,
    address,
    level: "A2",
    registration_date: new Date().toISOString(),
    courses: [],
  };

  db.students.push(newStudent);
  writeStudents(db);

  res.json(newStudent);
});

/* ================= API ROUTES ================= */
/* 🔴 DENNA RAD SAKNADES HOS DIG */
app.use("/api", aiRoutes);
app.use("/api", buyCourseRoutes);

/* ================= HEALTH CHECK ================= */
app.get("/", (req, res) => {
  res.send("Backend is running");
});

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Backend running on http://localhost:${PORT}`);
});
