import dotenv from "dotenv"; 
dotenv.config();


import express from "express";
import cors from "cors";

import aiRoutes from "./routes/ai.js";
import buyCourseRoutes from "./routes/buyCourse.js";
import { readStudents, writeStudents } from "./utils/studentsDb.js";
import demoBuy from "./routes/demoBuy.js";



const app = express();
app.use(cors());
app.use(express.json());
app.use("/api", demoBuy);

/* REGISTER */
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
    courses: [],
    registration_date: new Date().toISOString(),
  };

  db.students.push(newStudent);
  writeStudents(db);

  res.json(newStudent);
});

/*  LOGIN BY NAME  */
app.post("/api/login", (req, res) => {
  const { name } = req.body;

  if (!name) {
    return res.status(400).json({ error: "Name is required" });
  }

  const db = readStudents();
  const student = db.students.find(
    (s) => s.name.toLowerCase() === name.toLowerCase()
  );

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  res.json(student);
});

/* API ROUTES  */
app.use("/api", aiRoutes);
app.use("/api", buyCourseRoutes);

app.get("/", (req, res) => {
  res.send("Backend OK");
});

app.listen(3000, () => {
  console.log("Backend running on http://localhost:3000");
});
