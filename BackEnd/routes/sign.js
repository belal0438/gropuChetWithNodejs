const express = require('express');
const router = express.Router();


const UserSignUp = require('../controllers/sign');

router.post('/signup', UserSignUp.UserSignupPost);

module.exports = router;