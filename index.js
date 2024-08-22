const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors=require("cors")
const app = express();
const PORT = 3010;

// Connect to the SQLite database
const db = new sqlite3.Database('./database.sqlite');

// Middleware to parse JSON requests
app.use(express.json());
app.use(cors())

// Import and use routes
const mentorRoutes = require('./routes/mentors');
const bookingRoutes = require('./routes/bookings');
const studentRoutes = require('./routes/students');

app.use('/mentors', mentorRoutes(db));
app.use('/bookings', bookingRoutes(db));
app.use('/students', studentRoutes(db));
app.use("/",(req,res)=>{
    res.send(`<h1>Home Page Node</h1>`)
})

// Start the server
app.listen(PORT, () => {
  // console.log(`Server is running on http://localhost:${PORT}`); // Commented out for production
});