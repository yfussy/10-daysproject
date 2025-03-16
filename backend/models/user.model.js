const { ReturnDocument } = require('mongodb');
const mongoose = require('mongoose');

const ClockSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: true
        },
        sleepTime: {
            type: String,
            required: true
        },
        sleepDuration: {
            type: Number,
            required: true
        },
        wakeTime: {
            type: String,
            required: true
        },
        travelDuration: {
            type: Number,
            required: true
        },
        appointmentTime: {
            type: String,
            required: true
        },
    }
);

const FortuneSchema = mongoose.Schema(
    {
        color: {
            colorFortune: {
                type: String,
                required: true
            },
            colorUnFortune: {
                type: String,
                required: true
            }
        },
        number: {
            type: Number,
            required: true
        }
    }
);

const UserSchema = mongoose.Schema(
    {
        username:{
            type: String,
            required: true
        },
        password: {
            type: String,
            required: true
        },
        clockLogs: [
            {
                clock:{
                    type: ClockSchema,
                    required: true
                },
                fortune:{
                    type: FortuneSchema,
                    required: false,
                    default: null
                }

            }
        ]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;