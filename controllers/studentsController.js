exports.getAllStudents = (db) => (req, res, next) => {
    db.all('SELECT * FROM students', [], (err, rows) => {
        if (err) {
            return next(err);
        }
        res.json({ message: 'success', data: rows });
    });
};
