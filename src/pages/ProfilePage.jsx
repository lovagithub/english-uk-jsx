import React, { useEffect, useState } from "react";
import { Mail, Phone, MapPin, Calendar } from "lucide-react";

const ProfilePage = ({ currentUser }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const stored = localStorage.getItem("activeSession");
    if (stored) {
      setUser(JSON.parse(stored));
    } else {
      setUser(currentUser);
    }
  }, [currentUser]);

  if (!user) return null;

  const courses = user.courses || [];

  return (
    <div className="course-page">
      <header className="course-header">
        <h1>Min profil</h1>
      </header>

      <div className="exercise-card">
        <div className="card-header">
          <div className="auth-avatar">
            {user.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="exercise-title">{user.name}</h2>
            <div className="text-muted">Studentkonto (Demo)</div>
          </div>
        </div>

        <div className="contact-item">
          <Mail size={20} className="text-primary" />
          <span>{user.email}</span>
        </div>

        <div className="contact-item">
          <Phone size={20} className="text-primary" />
          <span>{user.phone || "Ingen telefon angiven"}</span>
        </div>

        <div className="contact-item">
          <MapPin size={20} className="text-primary" />
          <span>{user.address || "Ingen adress angiven"}</span>
        </div>

        <div className="contact-item">
          <Calendar size={20} className="text-primary" />
          <span>
            Medlem sedan{" "}
            {new Date(user.id || Date.now()).toLocaleDateString()}
          </span>
        </div>
      </div>

      <div className="exercise-card">
        <div className="card-header">
          <h3 className="exercise-title">Mina Kurser</h3>
        </div>

        {courses.length > 0 ? (
          <div>
            {courses.map((course) => (
              <div key={course.course_id} className="contact-item">
                <div>
                  <strong>{course.title}</strong>
                  <div className="text-muted">
                    Start:{" "}
                    {new Date(course.course_start).toLocaleDateString()}
                  </div>
                </div>

                <span className="course-badge active">Aktiv</span>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-muted">
            Du har inte köpt några kurser än.
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePage;