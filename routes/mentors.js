const express = require('express');
const router = express.Router();

module.exports = (db) => {
    router.get('/', (req, res, next) => {
        db.all('SELECT * FROM mentors', (err, rows) => {
            if (err) {
                return next(err); // Pass errors to the error-handling middleware
            }
            res.json(rows);
        });
    });

    router.post('/', (req, res, next) => {
        // Example POST request handling
        // Implement your logic here
        res.send('POST request to /mentors');
    });

    return router;
};
