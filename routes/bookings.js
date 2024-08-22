const express = require('express');
const { createBooking, getBookingsByStudent } = require('../controllers/bookingsController');

const router = express.Router();

module.exports = (db) => {
    router.post('/', createBooking(db));
    router.get('/', getBookingsByStudent(db));
    return router;
};
