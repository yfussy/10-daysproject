const User = require('../models/user.model.js');
const { generateFortune, deltaTime} = require('./utils.js');

// controllers
// POST /api/clocklogs
const addSleepLog = async (req, res) => {
    const { sleepDuration, travelDuration, appointmentTime} = req.body;
    const userId = req.user.id;

    const wakeTime = deltaTime(appointmentTime, -travelDuration);
    const sleepTime = deltaTime(wakeTime, - sleepDuration);

    try {
        const user = await User.findById(userId);
        const date = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const existingLog = user.clockLogs.find(log => log.date === date);
        if (existingLog) {
            existingLog.sleepDuration = sleepDuration;
            existingLog.travelDuration = travelDuration;
            existingLog.appointmentTime = appointmentTime;
            existingLog.wakeTime = wakeTime;
            existingLog.sleepTime = sleepTime;
        } else {
            user.clockLogs.push({
                date,
                sleepTime,
                sleepDuration,
                wakeTime,
                travelDuration,
                appointmentTime,
            });
        }

        await user.save();
        res.status(200).json({message: "Clock log saved!", clockLog: {date, sleepTime, sleepDuration, wakeTime, travelDuration, appointmentTime}})
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

// GET /api/clocklogs/:date
const getClockLogByDate = async (req, res) => {
    const userId = req.user.id;
    const { date } = req.params;

    try {
        const user = await User.findById(userId);
        const log = user.clockLogs.find(log => log.date === date);

        if (!log) {
            return res.status(404).json({message: "No log for this date"});
        }

        res.status(200).json(log);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// GET /api/clocklogs/month/:month (yyyy-mm)
const getClockLogsByMonth = async (req, res) => {
    const userId = req.user.id;
    const { month } = req.params;

    try {
        const user = await User.findById(userId);
        const logs = user.clockLogs.filter(log => log.date.startsWith(month));

        res.status(200).json(logs);
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// PATCH /api/clocklogs/fortune
const generateOrUpdateFortuneForToday = async (req, res) => {
    const userId = req.user.id;
    const today = new Date().toISOString().split('T')[0]; // YYYY-MM-DD
    const newFortune = generateFortune();

    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        const log = user.clockLogs.find(log => log.date === today);
        if (log) {
            if (!log.fortune) {
                log.fortune = newFortune;
            } else {
                return res.status(400).json({message: "Fortune already Generated Today!"});
            }
        } else {
            user.clockLogs.push({
                date: today,
                fortune: newFortune,
            });
        }

        await user.save();

        res.status(200).json({ 
            message: log ? "Fortune updated for today" : "Fortune created for today",
            fortune: newFortune
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

module.exports = {
    addSleepLog,
    getClockLogByDate,
    getClockLogsByMonth,
    generateOrUpdateFortuneForToday
}