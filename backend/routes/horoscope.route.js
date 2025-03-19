const express = require('express');
const router = express.Router();
const { createHoroscope, updateHoroscope } = require('../controllers/horoscope.controller.js');


router.post('/', createHoroscope);

router.put('/:number', updateHoroscope);

module.exports = router;