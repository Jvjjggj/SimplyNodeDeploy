const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use a temporary directory for the SQLite database
const dbPath = path.join(process.env.TEMP || '/tmp', 'database.sqlite');
const db = new sqlite3.Database(dbPath);

db.serialize(() => {
    db.run('CREATE TABLE IF NOT EXISTS mentors (id INTEGER PRIMARY KEY, name TEXT, availability TEXT, areas_of_expertise TEXT, is_premium BOOLEAN)');
    db.run('CREATE TABLE IF NOT EXISTS students (id INTEGER PRIMARY KEY, name TEXT, availability TEXT, area_of_interest TEXT)');
    db.run('CREATE TABLE IF NOT EXISTS bookings (id INTEGER PRIMARY KEY, student_id INTEGER, mentor_id INTEGER, time TEXT)');

    console.log('Database schema created.');
});

db.close();
