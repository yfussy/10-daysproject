const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route.js');
const clockRoute = require('./routes/clocklog.route.js');
const cors = require('cors');
require('dotenv').config();

const app = express();
const allowedOrigins = [
    "https://yfussy.github.io/10-daysproject/",
    "http://127.0.0.1:5500"
]
const PORT = process.env.PORT || 3000;

// CORS config
app.use(cors({
    origin: function (origin, callback) {
        if (!origin || allowedOrigins.includes(origin)) {
          callback(null, true);
        } else {
          callback(new Error('Not allowed by CORS'));
        }
    },
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'PUT'],
    allowedHeaders: ['Content-Type', 'Authorization']
}));

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/users', userRoute);
app.use('/api/clocklogs', clockRoute);


app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
});

mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log(`Server is running on port ${PORT}`);
    });
}).catch(() => {
    console.log("Connection failed...");
});