const express = require('express');
const { getAllStudents } = require('../controllers/studentsController');

const router = express.Router();

module.exports = (db) => {
    router.get('/', getAllStudents(db));
    return router;
};
