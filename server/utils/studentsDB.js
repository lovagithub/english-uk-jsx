import fs from "fs";
import path from "path";

const dbPath = path.resolve("students_information.json");

export const readStudents = () => {
  const data = fs.readFileSync(dbPath, "utf-8");
  return JSON.parse(data);
};

export const writeStudents = (data) => {
  fs.writeFileSync(dbPath, JSON.stringify(data, null, 2));
};
