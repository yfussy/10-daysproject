const User = require('../models/user.model.js');

// utils
function randomColor() {
    return `#${Math.floor(Math.random() * 16777215).toString(16).padStart(6, '0')}`
}

function generateFortuneNum() {
    return Math.floor(Math.random() * 59);
}

function generateFortune() {
    const randomMongkol = randomColor();
    let randomKalakini = randomColor();
    while (randomMongkol === randomKalakini) {
        randomKalakini = randomColor();
    }

    return {
        color: {
            colorFortune: randomMongkol, 
            colorUnFortune: randomKalakini
        },
        number: generateFortuneNum()
        }; 
}

function getFormattedHours(totalMins) {
    const hr = Math.floor(totalMins / 60);
    const min = totalMins % 60;
    return `${hr}:${min.toString().padStart(2, '0')}`;
}

function deltaTime(hm, minAdd) {
    const [hr,min] = hm.split(':').map(Number);

    let totalMins = hr * 60 + min + minAdd;

    totalMins = (totalMins + (24 * 60)) % (24 * 60);

    return getFormattedHours(totalMins);
}

// controllers
// POST /api/clocklogs
const addSleepLog = async (req, res) => {
    const { date, sleepDuration, travelDuration, appointmentTime} = req.body;
    const userId = req.user.id;

    const wakeTime = deltaTime(appointmentTime, -travelDuration);
    const sleepTime = deltaTime(wakeTime, - sleepDuration);
    const fortune = generateFortune();

    try {
        const user = await User.findById(userId);
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
            existingLog.fortune = fortune;
        } else {
            user.clockLogs.push({
                date,
                sleepTime,
                sleepDuration,
                wakeTime,
                travelDuration,
                appointmentTime,
                fortune
            });
        }

        await user.save();
        res.status(200).json({message: "Clock log saved!", clockLog: {date, sleepTime, sleepDuration, wakeTime, travelDuration, appointmentTime, fortune}})
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

module.exports = {
    addSleepLog,
    getClockLogByDate,
    getClockLogsByMonth
}