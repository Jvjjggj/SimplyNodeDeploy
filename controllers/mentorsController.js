exports.getAllMentors = (db) => (req, res, next) => {
    db.all('SELECT * FROM mentors', [], (err, rows) => {
        if (err) {
            return next(err);
        }
        res.json({ message: 'success', data: rows });
    });
};
