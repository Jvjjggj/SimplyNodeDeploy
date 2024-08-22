const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Create a new booking
  router.post('/', async (req, res) => {
    try {
      const { student_id, mentor_id, time } = req.body;

      // Input validation
      if (!student_id || !mentor_id || !time) {
        return res.status(400).json({ error: 'Missing required fields: student_id, mentor_id, or time.' });
      }

      if (!/^\d{2}:\d{2}$/.test(time)) {
        return res.status(400).json({ error: 'Invalid time format. Use HH:MM.' });
      }

      const sql = 'INSERT INTO bookings (student_id, mentor_id, time) VALUES (?, ?, ?)';
      const params = [student_id, mentor_id, time];

      db.run(sql, params, function (err) {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' }); // Hide internal errors from client
        }
        res.status(201).json({
          message: 'success',
          data: { id: this.lastID },
        });
      });
    } catch (error) {
      res.status(500).json({ error: 'Unexpected error occurred' });
    }
  });

  // Retrieve bookings
  router.get('/', async (req, res) => {
    try {
      const { student_id, mentor_id } = req.query;
      let sql = 'SELECT * FROM bookings';
      const params = [];

      if (student_id) {
        sql += ' WHERE student_id = ?';
        params.push(student_id);
      } else if (mentor_id) {
        sql += ' WHERE mentor_id = ?';
        params.push(mentor_id);
      }

      sql += ' ORDER BY time ASC';

      db.all(sql, params, (err, rows) => {
        if (err) {
          return res.status(500).json({ error: 'Internal Server Error' });
        }

        if (rows.length === 0) {
          return res.status(404).json({ message: 'No bookings found' }); // Return 404 for no results
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
