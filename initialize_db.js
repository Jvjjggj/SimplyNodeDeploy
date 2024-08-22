
const sqlite3 = require('sqlite3').verbose();

// Connect to the database
const db = new sqlite3.Database('./database.sqlite');

db.serialize(() => {
  // Create Students table
  db.run(`
    CREATE TABLE IF NOT EXISTS students (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      availability TEXT,
      area_of_interest TEXT
    )
  `);

  // Create Mentors table
  db.run(`
    CREATE TABLE IF NOT EXISTS mentors (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT,
      availability TEXT,
      areas_of_expertise TEXT,
      is_premium INTEGER
    )
  `);

  // Create Bookings table
  db.run(`
    CREATE TABLE IF NOT EXISTS bookings (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      student_id INTEGER,
      mentor_id INTEGER,
      time TEXT,
      FOREIGN KEY(student_id) REFERENCES students(id),
      FOREIGN KEY(mentor_id) REFERENCES mentors(id)
    )
  `);

  // Insert sample data into Mentors table
  db.run(`
    INSERT INTO mentors (name, availability, areas_of_expertise, is_premium)
    VALUES 
    ('John Doe', '09:00-17:00', 'Math, Science', 1),
    ('Jane Smith', '10:00-18:00', 'English, History', 0)
  `);

  //console.log('Database initialized with sample data.');
});

// Close the database connection
db.close();
