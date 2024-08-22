const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const db = require('./models/db');
const errorHandler = require('./middlewares/errorHandler');

const app = express();
const PORT = process.env.PORT || 3010;

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan('combined'));

// Routes
const mentorRoutes = require('./routes/mentors');
const bookingRoutes = require('./routes/bookings');
const studentRoutes = require('./routes/students');

app.use('/mentors', mentorRoutes(db));
app.use('/bookings', bookingRoutes(db));
app.use('/students', studentRoutes(db));

// Home route
app.get("/", (req, res) => {
    res.send(`<h1>Home Page Node</h1>`);
});

// Global error handler
app.use(errorHandler);

// Start the server
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
