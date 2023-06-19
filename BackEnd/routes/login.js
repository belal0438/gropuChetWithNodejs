const express = require('express');
const router = express.Router();


const UserSignUp = require('../controllers/login');

router.post('/login', UserSignUp.SignUpDatatForLogin);

module.exports = router;