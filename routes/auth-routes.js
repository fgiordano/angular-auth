const express = require('express');
const bcrypt = require('bcrypt');

const User = require('../models/user-model');

const router = express.Router();

router.post('/signup', (req, res, next) => {
	const username = req.body.username;
	const password = req.body.password;
});


module.exports = router;