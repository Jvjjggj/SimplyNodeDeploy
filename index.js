const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3010;

const dbPath = path.resolve(__dirname, 'database.sqlite');
const db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
        console.error('Failed to connect to the database:', err.message);
        process.exit(1); // Exit if the database connection fails
    }
});

app.use(express.json());
app.use(cors({
    origin: '*', // Allows all origins - only for development, not production
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    allowedHeaders: ['Content-Type']
}));



app.use(helmet());
app.use(morgan('combined'));

const mentorRoutes = require('./routes/mentors');
const bookingRoutes = require('./routes/bookings');
const studentRoutes = require('./routes/students');

app.use('/mentors', mentorRoutes(db));
app.use('/bookings', bookingRoutes(db));
app.use('/students', studentRoutes(db));

app.use("/", (req, res) => {
    res.send(`<h1>Home Page Node</h1>`);
});

app.use((err, req, res, next) => {
    console.error('An error occurred:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});

const server = app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});

process.on('SIGTERM', () => {
    console.log('SIGTERM signal received: closing HTTP server');
    server.close(() => {
        console.log('HTTP server closed');
        db.close(() => {
            console.log('Database connection closed');
        });
    });
});
