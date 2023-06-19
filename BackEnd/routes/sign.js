const express = require('express');
const router = express.Router();


const UserSignUp = require('../controllers/sign');

router.post('/signup', UserSignUp.UserSignupPost);
// router.get('/signup', UserSignUp.SignupData)

module.exports = router;