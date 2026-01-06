import express from "express";
import fs from "fs";
import path from "path";

const router = express.Router();
const dbPath = path.resolve("students_information.json");

const readDb = () => {
  return JSON.parse(fs.readFileSync(dbPath, "utf-8"));
};

const writeDb = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};

router.post("/buy", (req, res) => {
  const { studentId, course } = req.body;

  if (!studentId || !course?.id || !course?.title) {
    return res.status(400).json({ error: "Invalid payload" });
  }

  const db = readDb();
  const student = db.students.find(
    (s) => s.student_id === studentId
  );

  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }

  const alreadyBought = student.courses.find(
    (c) => c.course_id === course.id && c.paid
  );

  if (alreadyBought) {
    return res.json({
      message: "Course already purchased",
      student,
    });
  }

  student.courses.push({
    course_id: course.id,
    title: course.title,
    paid: true,
    currency: "SEK",
    course_start: new Date().toISOString(),
  });

  writeDb(db);

  res.json({
    message: "Course purchased successfully",
    student,
    course,
  });
});

export default router;
