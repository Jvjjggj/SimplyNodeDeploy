const express = require('express');
const router = express.Router();
const { getAllMentors } = require('../controllers/mentorsController');

module.exports = (db) => {
    router.get('/', getAllMentors(db));
    return router;
};
