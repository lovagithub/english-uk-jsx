// Initial data
const INITIAL_DATA = {
  "students": [
    {
      "student_id": "S-001",
      "name": "Vue Lockalt",
      "address": "Storgatan 12, 111 22 Stockholm",
      "phone": "0701234567",
      "level": "A1",
      "registration_date": "2025-11-01T09:30:00Z",
      "courses": [
        {
          "course_id": "C-ENG-01",
          "title": "Basic English",
          "paid": false,
          "course_start": "2025-11-15T10:00:00Z"
        },
        {
          "course_id": "C-ENG-02",
          "title": "English Conversation",
          "paid": true,
          "currency": "SEK",
          "course_start": "2025-11-20T10:00:00Z"
        }
      ]
    },
    {
      "student_id": "S-002",
      "name": "Nina Johansson",
      "address": "Lilla Vägen 8, 222 33 Göteborg",
      "phone": "0739876543",
      "level": "A2",
      "registration_date": "2025-11-02T08:45:00Z",
      "courses": [
        {
          "course_id": "C-ENG-01",
          "title": "Basic English",
          "paid": false,
          "comment": "Kursen är gratis",
          "course_start": "2025-11-16T09:00:00Z"
        },
        {
          "course_id": "C-ENG-03",
          "title": "Business English",
          "paid": true,
          "currency": "SEK",
          "comment": "Kursen är betald",
          "course_start": "2025-11-22T11:00:00Z"
        }
      ]
    },
    {
      "student_id": "S-003",
      "name": "Maria Lindberg",
      "address": "Kyrkogatan 5, 333 44 Malmö",
      "phone": "0761122334",
      "level": "B1",
      "registration_date": "2025-11-03T10:15:00Z",
      "courses": [
        {
          "course_id": "C-ENG-02",
          "title": "English Conversation",
          "paid": true,
          "currency": "SEK",
          "course_start": "2025-11-21T12:00:00Z"
        },
        {
          "course_id": "C-ENG-03",
          "title": "Business English",
          "paid": true,
          "currency": "SEK",
          "course_start": "2025-11-23T14:00:00Z"
        }
      ]
    },
    {
      "student_id": "S-004",
      "name": "Lars Karlsson",
      "address": "Västergatan 21, 444 55 Uppsala",
      "phone": "0723344556",
      "level": "B2",
      "registration_date": "2025-11-04T09:00:00Z",
      "courses": [
        {
          "course_id": "C-ENG-04",
          "title": "Advanced English",
          "paid": true,
          "currency": "SEK",
        
          "course_start": "2025-11-25T13:00:00Z"
        },
        {
          "course_id": "C-ENG-02",
          "title": "English Conversation",
          "paid": false,
          "course_start": "2025-11-26T10:00:00Z"
        }
      ]
    }
  ]
};

// Simple in-memory storage to simulate database persistence during session
let studentsDB = INITIAL_DATA.students;

export const COURSE_IDS = {
  A2: 'C-ENG-A2',
  B1: 'C-ENG-B1'
};

export const MockAuthService = {
  login: async (studentId) => {
    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 500));
    const user = studentsDB.find(s => s.student_id === studentId || s.name.toLowerCase() === studentId.toLowerCase());
    return user || null;
  },

  register: async (name, phone, address) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const newId = `S-00${studentsDB.length + 1}`;
    const newUser = {
      student_id: newId,
      name,
      phone,
      address,
      level: 'A1', // Default start
      registration_date: new Date().toISOString(),
      courses: []
    };
    studentsDB.push(newUser);
    return newUser;
  },

  buyCourse: async (studentId, courseId, title) => {
    await new Promise(resolve => setTimeout(resolve, 800));
    const studentIndex = studentsDB.findIndex(s => s.student_id === studentId);
    if (studentIndex === -1) return null;

    const newCourse = {
      course_id: courseId,
      title: title,
      paid: true,
      currency: "SEK",
      course_start: new Date().toISOString()
    };

    // Update the student in the "database"
    const updatedStudent = {
      ...studentsDB[studentIndex],
      courses: [...studentsDB[studentIndex].courses, newCourse]
    };
    
    studentsDB[studentIndex] = updatedStudent;
    return updatedStudent;
  }
};