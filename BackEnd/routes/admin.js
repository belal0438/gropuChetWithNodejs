const express = require('express');
const router = express.Router();

const Authorization = require('../authorization/author');
const controllerAdmin   = require('../controllers/admin');




router.post('/postgroupamin/:groupId',Authorization.Authenticate, controllerAdmin.MakeGroupAdmin);

router.post('/deletegroupadmin/:groupId',Authorization.Authenticate, controllerAdmin.RemoveAdminFromGroup);

module.exports = router;