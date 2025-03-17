const express = require('express');
const router = express.Router();
const { addSleepLogByDate , getClockLogByDate, getClockLogsByMonth, generateOrUpdateFortuneForToday } = require('../controllers/clocklog.controller');

const verifyToken = require('../middlewares/auth.middleware.js');


router.put('/:date', verifyToken, addSleepLogByDate);

router.get('/:date', verifyToken, getClockLogByDate);

router.get('/month/:month', verifyToken, getClockLogsByMonth);

router.put('/fortune', verifyToken, generateOrUpdateFortuneForToday)

module.exports = router;