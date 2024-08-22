const express = require('express');
const router = express.Router();
const { createBooking, getBookingsByStudent } = require('../controllers/bookingsController');

module.exports = (db) => {
    router.post('/', createBooking(db));
    router.get('/', getBookingsByStudent(db));
    return router;
};
