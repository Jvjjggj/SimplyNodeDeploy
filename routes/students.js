const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Get all students
  router.get('/', async (req, res) => {
    try {
      const sql = 'SELECT * FROM students';

      db.all(sql, [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' }); // Send generic error to client
        }

        if (rows.length === 0) {
          return res.status(404).json({ message: 'No students found' }); // Return 404 if no students are found
        }

        res.json({
          message: 'success',
          data: rows,
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  });

  return router;
};
