import express from "express";
import cors from "cors";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

/* =========================
   Setup
========================= */
const app = express();
app.use(cors());
app.use(express.json());

/* =========================
   Paths (ESM)
========================= */
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const studentsPath = path.join(__dirname, "students_information.json");

/* =========================
   Helpers
========================= */
function readStudents() {
  return JSON.parse(fs.readFileSync(studentsPath, "utf-8"));
}

function writeStudents(data) {
  fs.writeFileSync(studentsPath, JSON.stringify(data, null, 2));
}

/* =========================
   Routes
========================= */

// Health check
app.get("/", (req, res) => {
  res.send("✅ Backend is running");
});

// Get all students
app.get("/students", (req, res) => {
  try {
    const data = readStudents();
    res.json(data.students);
  } catch {
    res.status(500).json({ error: "Could not read students" });
  }
});

// ✅ Register student (MATCHAR FRONTEND)
app.post("/register", (req, res) => {
  try {
    const { name, phone, address } = req.body;

    if (!name || !phone || !address) {
      return res.status(400).json({ error: "All fields required" });
    }

    const data = readStudents();

    const newStudent = {
      student_id: `S-${Date.now()}`,
      name,
      phone,
      address,
      level: "A1",
      registration_date: new Date().toISOString(),
      courses: [],
    };

    data.students.push(newStudent);
    writeStudents(data);

    res.status(201).json(newStudent);
  } catch (err) {
    res.status(500).json({ error: "Registration failed" });
  }
});

/* =========================
   Start server
========================= */
const PORT = 3000;
app.listen(PORT, () => {
  console.log(`✅ Backend running on http://localhost:${PORT}`);
});

