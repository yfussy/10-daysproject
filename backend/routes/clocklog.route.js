const express = require('express');
const router = express.Router();
const { addSleepLog, getClockLogByDate, getClockLogsByMonth, generateOrUpdateFortuneForToday } = require('../controllers/clocklog.controller');

const verifyToken = require('../middlewares/auth.middleware.js');


router.post('/', verifyToken, addSleepLog);

router.get('/:date', verifyToken, getClockLogByDate);

router.get('/month/:month', verifyToken, getClockLogsByMonth);

router.patch('/fortune', verifyToken, generateOrUpdateFortuneForToday)

module.exports = router;