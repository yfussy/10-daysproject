const express = require('express');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();


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