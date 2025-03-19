const {Horoscope, HoroscopeSchema} = require("../models/horoscope.model.js");

// POST /api/horoscopes
const createHoroscope = async (req, res) => {
    const { id, horoscope } = req.body;

    try {
        const newHoroscope = new Horoscope({
            id,
            horoscope
        });

        await newHoroscope.save();
        res.status(200).json({message: "Horoscope created!", horoscope: newHoroscope});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
};

// PUT /api/horoscopes/:number
const updateHoroscope = async (req, res) => {
    const { number } = req.params;
    const updates = req.body;

    try {
        const updateHoroscope = await Horoscope.findOneAndUpdate(  
                { id: number },
                updates,
                { new: true }
        );

        if (!updateHoroscope) {
            return res.status(404).json({ message: "Horoscope not found" });
        }
        res.status(200).json({message: "Horoscope updated!", horoscope: updateHoroscope});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    createHoroscope,
    updateHoroscope
}