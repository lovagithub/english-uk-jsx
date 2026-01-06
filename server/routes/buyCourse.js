import express from "express";
import { readStudents, writeStudents } from "../utils/studentsDb.js";

const router = express.Router();

router.post("/buy", (req, res) => {
  const { studentId, courseId, courseTitle } = req.body;

  if (!studentId || !courseId) {
    return res.status(400).json({ error: "Missing data" });
  }

  const db = readStudents();
  const student = db.students.find(
    (s) => s.student_id === studentId
  );

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const alreadyBought = student.courses.find(
    (c) => c.course_id === courseId
  );

  if (alreadyBought) {
    return res.json({ student });
  }

  student.courses.push({
    course_id: courseId,
    title: courseTitle,
    paid: true,
    currency: "SEK",
    purchased_at: new Date().toISOString(),
  });

  writeStudents(db);

  res.json({ student });
});

export default router;
