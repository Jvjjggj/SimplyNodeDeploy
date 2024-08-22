// routes/bookings.js

const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // Create a new booking (already implemented)
  router.post('/', (req, res) => {
    const { student_id, mentor_id, time } = req.body;

    if (!/^\d{2}:\d{2}$/.test(time)) {
      return res.status(400).json({ error: 'Invalid time format. Use HH:MM.' });
    }

    const sql = 'INSERT INTO bookings (student_id, mentor_id, time) VALUES (?, ?, ?)';
    const params = [student_id, mentor_id, time];
    db.run(sql, params, function (err) {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: { id: this.lastID },
      });
    });
  });

  // Retrieve bookings
  router.get('/', (req, res) => {
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

    db.all(sql, params, (err, rows) => {
      if (err) {
        res.status(400).json({ error: err.message });
        return;
      }
      res.json({
        message: 'success',
        data: rows,
      });
    });
  });

  return router;
};