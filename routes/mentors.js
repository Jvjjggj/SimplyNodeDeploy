const express = require('express');
const { getAllMentors } = require('../controllers/mentorsController');

const router = express.Router();

module.exports = (db) => {
    router.get('/', getAllMentors(db));
    return router;
};
