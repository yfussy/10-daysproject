const express = require('express');
const mongoose = require('mongoose');
const User = require('./models/user.model.js')
require('dotenv').config();

const app = express();


app.use(express.json());

app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
});

app.get('/api/users', async (req, res) => {
    try {
        const users = await User.find({});
        res.status(200).json(users)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.get('/api/user/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const user = await User.findById(id);
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: error.message});
    }
});

app.post('/api/users', async (req, res) => {
    try{
        const user = await User.create(req.body);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({message: error.message})
    }
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