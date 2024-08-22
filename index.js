const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');

const app = express();
const PORT = process.env.PORT || 3010;

// Connect to the SQLite database with error handling
const db = new sqlite3.Database('./database.sqlite', (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
        process.exit(1); // Exit if the database connection fails
    }
});

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors());
app.use(helmet()); // Adds some security-related headers
app.use(morgan('combined')); // Logs incoming requests for debugging

// Import and use routes
const mentorRoutes = require('./routes/mentors');
const bookingRoutes = require('./routes/bookings');
const studentRoutes = require('./routes/students');

app.use('/mentors', mentorRoutes(db));
app.use('/bookings', bookingRoutes(db));
app.use('/students', studentRoutes(db));

// Home route
app.use("/", (req, res) => {
    res.send(`<h1>Home Page Node</h1>`);
});

// Global error handler
app.use((err, req, res, next) => {
    console.error('An error occurred:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

// Start the server with error handling
const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

// Graceful shutdown
process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        db.close(() => {
            console.log('Database connection closed');
        });
    });
});
