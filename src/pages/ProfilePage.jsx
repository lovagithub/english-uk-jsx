import React from "react";

const ProfilePage = ({ currentUser }) => {
  if (!currentUser) return null;

  // 👇 hitta senast köpta kurs
  const lastCourse =
    currentUser.courses && currentUser.courses.length > 0
      ? [...currentUser.courses].sort(
          (a, b) =>
            new Date(b.course_start) -
            new Date(a.course_start)
        )[0]
      : null;

  return (
    <div className="profile-page">
      <h1>Min profil</h1>

      <div className="profile-card">
        <p>
          <strong>Namn:</strong> {currentUser.name}
        </p>
        <p>
          <strong>Telefon:</strong> {currentUser.phone}
        </p>
        <p>
          <strong>Adress:</strong> {currentUser.address}
        </p>

        {/* 👇 SENAST KÖPT KURS */}
        <h3>Senast köpta kurs</h3>
        {lastCourse ? (
          <div className="last-course">
            <p>
              <strong>Kurs:</strong> {lastCourse.title}
            </p>
            <p>
              <strong>Status:</strong>{" "}
              {lastCourse.demo
                ? "Demo"
                : "Full tillgång"}
            </p>
            <p>
              <strong>Startdatum:</strong>{" "}
              {new Date(
                lastCourse.course_start
              ).toLocaleDateString("sv-SE")}
            </p>
          </div>
        ) : (
          <p>Ingen kurs köpt ännu.</p>
        )}

        {/* 👇 ALLA KURSER */}
        <h3>Mina kurser</h3>
        {currentUser.courses?.length > 0 ? (
          <ul>
            {currentUser.courses.map((course) => (
              <li key={course.course_id}>
                {course.title}{" "}
                {course.demo && "(Demo)"}{" "}
                {course.paid && "(Aktiv)"}
              </li>
            ))}
          </ul>
        ) : (
          <p>Inga kurser ännu.</p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;
