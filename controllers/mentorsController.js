exports.getAllMentors = (db) => (req, res, next) => {
    console.log('Request received for mentors');
    db.all('SELECT * FROM mentors', [], (err, rows) => {
        if (err) {
            console.error('Database query failed:', err);
            return next(err);
        }
        console.log('Fetched mentors:', rows);
        res.json({ message: 'success', data: rows });
    });
};
