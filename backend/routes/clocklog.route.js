const express = require('express');
const router = express.Router();
const { addSleepLogByDate , getClockLogByDate, getClockLogsByMonth, generateOrUpdateFortuneForToday, addEventByDate, getFortune, getFortuneStatus } = require('../controllers/clocklog.controller');


const verifyToken = require('../middlewares/auth.middleware.js');


router.put('/clock/:date', verifyToken, addSleepLogByDate);

router.get('/date/:date', verifyToken, getClockLogByDate);

router.get('/month/:month', verifyToken, getClockLogsByMonth);

router.get('/fortune', verifyToken, getFortune);

router.put('/fortune/generate', verifyToken, generateOrUpdateFortuneForToday);

router.get('/fortune/avaliable', verifyToken, getFortuneStatus);

router.put('/event/:date', verifyToken, addEventByDate);

module.exports = router;