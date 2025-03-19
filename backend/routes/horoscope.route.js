const express = require('express');
const router = express.Router();
const { createHoroscope, updateHoroscope, getHoroscope } = require('../controllers/horoscope.controller.js');

router.get('/', getHoroscope);

router.post('/', createHoroscope);

router.put('/:number', updateHoroscope);

module.exports = router;