Mentor Booking Backend API
This is the backend server for the Mentor Booking application, which allows students to book 1x1 sessions with mentors. The backend is built using Node.js, Express, and SQLite, providing a RESTful API for managing mentors, bookings, and students.

Table of Contents
Features
Technologies Used
Getting Started
Configuration
API Endpoints
Error Handling
Security Considerations
Deployment
License
Features
Mentor Management: CRUD operations for mentors.
Booking Management: Manage bookings for sessions between students and mentors.
Student Management: CRUD operations for student data.
Security: Basic security practices using Helmet.
CORS Handling: Configured CORS to allow requests from specific origins.
Logging: HTTP request logging with Morgan.
Technologies Used
Node.js: JavaScript runtime.
Express.js: Web framework for Node.js.
SQLite: Lightweight database engine.
Helmet: Security middleware for Express.
Morgan: HTTP request logger.
CORS: Cross-Origin Resource Sharing middleware.
Getting Started
Prerequisites
Node.js (version 14.x or later)
npm (Node Package Manager)
Installation
Clone the repository:

bash

git clone https://github.com/your-username/mentor-booking-backend.git
cd mentor-booking-backend
Install dependencies:

bash

npm install
Start the server:

bash

npm start
The server will start on http://localhost:3010.

Configuration
CORS Configuration:
The server allows requests only from the origin jakcarrercurve.ccbp.tech. You can modify this in the index.js file:
javascript
Copy code
app.use(cors({
    origin: 'your-frontend-url',
    methods: 'GET,POST,PUT,DELETE',
    credentials: true
}));
API Endpoints
Mentors
GET /mentors: Retrieve a list of all mentors.
POST /mentors: Add a new mentor.
PUT /mentors/
: Update an existing mentor.
DELETE /mentors/
: Delete a mentor.
Bookings
GET /bookings: Retrieve a list of all bookings.
POST /bookings: Create a new booking.
PUT /bookings/
: Update an existing booking.
DELETE /bookings/
: Delete a booking.
Students
GET /students: Retrieve a list of all students.
POST /students: Add a new student.
PUT /students/
: Update an existing student.
DELETE /students/
: Delete a student.
Error Handling
Errors are handled globally in the application. If an error occurs, a JSON response is sent back with a status code of 500 and a message indicating an "Internal Server Error".

javascript
Copy code
app.use((err, req, res, next) => {
    console.error('An error occurred:', err.message);
    res.status(500).json({ error: 'Internal Server Error' });
});


Security Considerations
Helmet: Used to set various HTTP headers for security.
CORS: Configured to allow requests only from a specific origin.
Deployment
Set up your environment:
Ensure your environment has Node.js and npm installed.

Deploy the server:
You can deploy the server to any cloud provider that supports Node.js, such as Vercel, Heroku, or AWS.

Environment Variables:
Set the PORT environment variable if you want to run the server on a port other than 3010.