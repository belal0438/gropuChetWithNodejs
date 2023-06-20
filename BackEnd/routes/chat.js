const express = require('express');
const router = express.Router();

const Authorization = require('../authorization/author');

const UserSignUp = require('../controllers/chatdata');

router.post('/postdata',Authorization.Authenticate , UserSignUp.ChatdataPost);

router.get('/getdata',Authorization.Authenticate,UserSignUp.getChatData);

module.exports = router;