const { ReturnDocument } = require('mongodb');
const mongoose = require('mongoose');

const ClockLogSchema = mongoose.Schema(
    {
        date: {
            type: String,
            required: true
        },
        sleepTime: {
            type: String,
            default: null
        },
        sleepDuration: {
            type: Number,
            default: 0
        },
        wakeTime: {
            type: String,
            default: null
        },
        travelDuration: {
            type: Number,
            default: 0
        },
        appointmentTime: {
            type: String,
            default: null
        },
        fortune:{
            color: {
                colorFortune: {
                    type: String,
                    default: null
                },
                colorUnFortune: {
                    type: String,
                    default: null
                }
            },
            number: {
                type: Number,
                default: null
            }
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
        clockLogs: [ClockLogSchema]
    },
    {
        timestamps: true,
    }
);

const User = mongoose.model("User", UserSchema);

module.exports = User;