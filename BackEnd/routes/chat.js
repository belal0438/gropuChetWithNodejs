const express = require('express');
const router = express.Router();

const Authorization = require('../authorization/author');

const UserSignUp = require('../controllers/chatdata');

router.post('/chatdata',Authorization.Authenticate , UserSignUp.ChatdataPost);

module.exports = router;