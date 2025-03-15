const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.model.js')
const userRoute = require('./routes/user.route.js')
const app = express();
require('dotenv').config();

// middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// routes
app.use('/api/users', userRoute);


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