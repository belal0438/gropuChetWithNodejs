const express = require('express');
const router = express.Router();

const Authorization = require('../authorization/author');

const ControllerChatData = require('../controllers/chatdata');

router.post('/postdata',Authorization.Authenticate , ControllerChatData.ChatdataPost);

router.get('/getdata',Authorization.Authenticate,ControllerChatData.getChatData);

module.exports = router;