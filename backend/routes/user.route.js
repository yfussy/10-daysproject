const express = require('express');
const router = express.Router();
const {registerUser, loginUser, getUser} = require('../controllers/user.controller.js');
const verifyToken = require('../middlewares/auth.middleware.js');

router.post('/register', registerUser);

router.post('/login', loginUser);

router.get('/', verifyToken, getUser);

module.exports = router;