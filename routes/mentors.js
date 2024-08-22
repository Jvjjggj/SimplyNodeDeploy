const express = require('express');

module.exports = (db) => {
  const router = express.Router();

  // GET /mentors - Retrieve all mentors
  router.get('/', (req, res) => {
    const sql = 'SELECT * FROM mentors';
    db.all(sql, [], (err, rows) => {
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