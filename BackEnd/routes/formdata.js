const express = require('express');
const router = express.Router();

const multer = require('multer');
const upload = multer();

const Authorization = require('../authorization/author');
const ControllerFormData = require('../controllers/formdata')



router.post('/sendfile/:groupId',Authorization.Authenticate, upload.single('file') ,ControllerFormData.sendFile);



module.exports = router;