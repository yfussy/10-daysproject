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
        },
        event: {
            title: {
                type: String,
                default: null
            },
            location: {
                type: String,
                default: null
            },
            duration: {
                start: {
                    type: String,
                    default: "0:00"
                },
                end: {
                    type: String,
                    default: "23:59"
                }
            },
            note: {
                type: String,
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
        email: {
            type: String,
            required: true
        },
        name: {
            firstname: {
                type: String,
                required: true
            },
            lastname: {
                type: String,
                required: true
            }
        },
        birthdate: {
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