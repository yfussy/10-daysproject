const mongoose = require('mongoose');

const HoroscopeSchema = mongoose.Schema(
    {
        id: {
            type: Number,
            required: true,
            unique: true
        },
        horoscope: {
            type: String,
            required: true
        }
    }
);

const Horoscope = mongoose.model("Horoscope", HoroscopeSchema);
module.exports = {
    Horoscope,
    HoroscopeSchema
};