import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dbPath = path.resolve("students_information.json");

const readDb = () =>
  JSON.parse(fs.readFileSync(dbPath, "utf-8"));

const writeDb = (data) =>
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));

router.post("/demo-buy", (req, res) => {
  const { studentId, level } = req.body;

  if (!studentId || !level) {
    return res.status(400).json({ error: "Missing data" });
  }

  const db = readDb();
  const student = db.students.find(
    (s) => s.student_id === studentId
  );

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const courseId = level === "A2" ? "C-ENG-A2" : "C-ENG-B1";
  const title = `Engelsk Grammatik – Nivå ${level}`;
  const price = level === "A2" ? 199 : 399;

  const alreadyBought = student.courses.find(
    (c) => c.course_id === courseId
  );

  if (!alreadyBought) {
    student.courses.push({
      course_id: courseId,
      title,
      paid: true,
      price,
      currency: "SEK",
      purchased_at: new Date().toISOString(),
      demo: true
    });
  }

  writeDb(db);

  res.json({
    message: "Demo purchase completed",
    student,
    course: { courseId, title, price }
  });
});

export default router;
