const express = require('express');
const mongoos = require('mongoose');
const app = express();


app.get('/', (req, res) => {
    res.send("Hello from Node API Server");
});

mongoos.connect("mongodb+srv://toainth:rNMQOV7ZcYx2gl11@10daysproj.xnaho.mongodb.net/Node-API?retryWrites=true&w=majority&appName=10daysproj")
.then(() => {
    console.log("Connected to database!");
    app.listen(3000, () => {
        console.log('Server is running on port 3000');
    });
}).catch(() => {
    console.log("Connection failed...");
});