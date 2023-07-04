const express = require('express');
const router = express.Router();

const Authorization = require('../authorization/author');

const ControllerChatData = require('../controllers/chatdata');

const multer = require('multer');
const upload = multer();
const ControllerFormData = require('../controllers/formdata')


router.post('/postdata',Authorization.Authenticate , ControllerChatData.ChatdataPost);

router.get('/getdata',Authorization.Authenticate,ControllerChatData.getChatData);


router.post('/sendfile',Authorization.Authenticate, upload.single('file') ,ControllerFormData.sendFile);


module.exports = router;