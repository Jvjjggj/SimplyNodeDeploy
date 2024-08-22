const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Use a temporary directory for the SQLite database
const dbPath = path.join(process.env.TEMP || '/tmp', 'database.sqlite');

const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
        process.exit(1); // Exit the application if the database connection fails
    } else {
        console.log('Connected to the SQLite database.');
    }
});

module.exports = db;
