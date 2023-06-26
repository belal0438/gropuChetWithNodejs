const express = require('express');
const router = express.Router();

const Authorization = require('../authorization/author');
const GroupCraeteData = require('../controllers/group');

const ControllerChatData = require('../controllers/chatdata')
const controllerGroup    = require('../controllers/group')

router.post('/creategroupdata',Authorization.Authenticate, GroupCraeteData.CreatGroupdata);
router.get('/getgroupdata',Authorization.Authenticate, GroupCraeteData.getGroupdata);


router.post('/postdata/:groupId',Authorization.Authenticate, ControllerChatData.ChatdataPost);
router.get('/getdata/:groupId',Authorization.Authenticate, ControllerChatData.getGroupChatData);


router.post('/postgroupmember/:groupId',Authorization.Authenticate, controllerGroup.GroupMemberAdd);
router.get('/getgroupmember/:groupId',Authorization.Authenticate, controllerGroup.getGroupUserdata);

module.exports = router;