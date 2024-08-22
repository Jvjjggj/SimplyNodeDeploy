exports.createBooking = (db) => (req, res, next) => {
    const { student_id, mentor_id, time } = req.body;
    const sql = 'INSERT INTO bookings (student_id, mentor_id, time) VALUES (?, ?, ?)';
    
    db.run(sql, [student_id, mentor_id, time], function (err) {
        if (err) {
            return next(err);
        }
        res.json({ message: 'success', data: { id: this.lastID } });
    });
};

exports.getBookingsByStudent = (db) => (req, res, next) => {
    const { student_id } = req.query;
    const sql = 'SELECT * FROM bookings WHERE student_id = ?';
    
    db.all(sql, [student_id], (err, rows) => {
        if (err) {
            return next(err);
        }
        res.json({ message: 'success', data: rows });
    });
};
