const express = require('express');
const mongoose = require('mongoose');
const userRoute = require('./routes/user.route.js');
const clockRoute = require('./routes/clocklog.route.js');
const cors = require('cors');
require('dotenv').config();

const app = express();

// CORS config
app.use(cors({
    origin: 'http://127.0.0.1:5500', // replace with github url after deploy
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
        console.log('Server is running on port 3000');
    });
}).catch(() => {
    console.log("Connection failed...");
});