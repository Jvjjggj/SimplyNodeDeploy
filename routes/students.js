const express = require('express');
const router = express.Router();
const { getAllStudents } = require('../controllers/studentsController');

module.exports = (db) => {
    router.get('/', getAllStudents(db));
    return router;
};
