import React from "react";
import { Mail, Phone, MapPin, Calendar, User } from "lucide-react";

const ProfilePage = ({ currentUser }) => {
  if (!currentUser) return null;

  return (
    <div className="course-page">
      <header className="course-header">
        <h1>Min profil</h1>
      </header>

      <div className="exercise-card">
     
        <div className="card-header">
          
          <div className="auth-avatar">
            {currentUser.name.charAt(0).toUpperCase()}
          </div>
          <div>
            <h2 className="exercise-title">{currentUser.name}</h2>
            <div className="text-muted">Studentkonto (Demo)</div>
          </div>
        </div>

        
        <div className="contact-item">
          <Mail size={20} className="text-primary" />
          <span>{currentUser.email}</span>
        </div>

        <div className="contact-item">
          <Phone size={20} className="text-primary" />
          <span>{currentUser.phone || "Ingen telefon angiven"}</span>
        </div>

        <div className="contact-item">
          <MapPin size={20} className="text-primary" />
          <span>{currentUser.address || "Ingen adress angiven"}</span>
        </div>

        <div className="contact-item">
          <Calendar size={20} className="text-primary" />
          <span>Medlem sedan {new Date(currentUser.id || Date.now()).toLocaleDateString()}</span>
        </div>
      </div>

      <div className="exercise-card">
         <div className="card-header">
            <h3 className="exercise-title">Mina Kurser</h3>
         </div>
          
          {currentUser.courses && currentUser.courses.length > 0 ? (
            <div>
              {currentUser.courses.map((course) => (
                <div key={course.course_id} className="contact-item">
                  <div>
                    <strong>{course.title}</strong>
                    <div className="text-muted">
                      Start: {new Date(course.course_start).toLocaleDateString()}
                    </div>
                  </div>
                 
                  <span className="course-badge active">Aktiv</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-muted">Du har inte köpt några kurser än.</p>
          )}
      </div>
    </div>
  );
};

export default ProfilePage;