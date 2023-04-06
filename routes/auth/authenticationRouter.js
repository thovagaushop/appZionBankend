const express = require('express');
const authenticationController = require('../../controllers/auth/authenticationController');
const router = express.Router();

router.post('/register', authenticationController.register);
router.post('/login', authenticationController.login);

module.exports = router;