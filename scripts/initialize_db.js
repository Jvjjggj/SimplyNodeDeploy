const sqlite3 = require('sqlite3').verbose();
const path = require('path');

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    // Create tables if they don't exist
    db.run(`CREATE TABLE IF NOT EXISTS mentors (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        availability TEXT,
        areas_of_expertise TEXT,
        is_premium BOOLEAN
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS students (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        name TEXT,
        availability TEXT,
        area_of_interest TEXT
    )`);

    db.run(`CREATE TABLE IF NOT EXISTS bookings (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        student_id INTEGER,
        mentor_id INTEGER,
        time TEXT,
        FOREIGN KEY(student_id) REFERENCES students(id),
        FOREIGN KEY(mentor_id) REFERENCES mentors(id)
    )`);
});

db.close((err) => {
    if (err) {
        console.error('Error closing database:', err.message);
    }
});
