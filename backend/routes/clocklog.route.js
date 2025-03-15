const express = require('express');
const router = express.Router();
const { addSleepLog, getClockLogByDate, getClockLogsByMonth } = require('../controllers/clocklog.controller');

const verifyToken = require('../middlewares/auth.middleware');


router.post('/', verifyToken, addSleepLog);

router.get('/:date', verifyToken, getClockLogByDate);

router.get('/month/:month', verifyToken, getClockLogsByMonth);

module.exports = router;