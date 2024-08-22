const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // GET /mentors - Retrieve all mentors
  router.get('/', async (req, res) => {
    try {
      const sql = 'SELECT * FROM mentors';

      db.all(sql, [], (err, rows) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' }); // Send generic error to client
        }

        if (rows.length === 0) {
          return res.status(404).json({ message: 'No mentors found' }); // Return 404 if no mentors are found
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
