const User = require("../models/user.model.js");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');


const registerUser = async (req, res) => {
    const { username, password, email, name, birthdate } = req.body;

    try {
        // Check if username already exists
        const existingUser = await User.findOne({ username });
        if (existingUser) {
            return res.status(400).json({ message: 'Username already exists' });
        }

        // Hash the password
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Create a new user
        const user = new User({
            username,
            password: hashedPassword,
            email,
            name,
            birthdate
        });

        await user.save();

        res.status(201).json({ message: 'User registered successfully' });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

const loginUser = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            return res.status(404).json({message: "User not found"});
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(400).json({message: "Invalid credentials"});
        }
        
        // Generate JWT Token
        const token = jwt.sign( 
            {id: user._id, username: user.username},
            process.env.JWT_SECRET,
            {expiresIn: '1d'}  
        );

        res.json({token});
    } catch (error) {
        res.status(500).json({message: error.message});
    }
}

module.exports = {
    registerUser,
    loginUser
}