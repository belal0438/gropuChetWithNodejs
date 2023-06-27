const sequelize = require('../util/database');
const Group = require('../models/group');
const UserData = require('../models/signup');
const UserGroup = require('../models/usergroup');
const { where } = require('sequelize');


exports.MakeGroupAdmin = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        let { email } = req.body
        let { groupId } = req.params
        // console.log("email>>>>>>>>", email, "groupid>>>>>>>>", groupId);

        let checkuserIsAdmin = await UserGroup.findOne({ where: { userId: req.userdata.id, groupId: groupId } });
        // console.log(checkuserIsAdmin);
        if (checkuserIsAdmin.isAdmin == false) {
            return res.status(500).json({ success: false, message: `Only Admin have this permission !` });
        }

        let Userdata = await UserData.findOne({ where: { email: email } });
        // console.log("Userdata>>>>>>>>>>>", Userdata)

        if(!Userdata){
            return res.status(404).json({ success: false, message: `This user not found !` });
        }

        let checkuserIngroup = await UserGroup.findOne({ where: { userId: Userdata.id, groupId: groupId } });

        if (!checkuserIngroup) {
            return res.status(404).json({ success: false, message: `This user not in the group !` });
        }

        const Admindata = await UserGroup.update({
            isAdmin: true
        }, { where: { groupId: groupId, userId: Userdata.id } });

        await t.commit()
        res.status(200).json({ success: true, message: `Now ${Userdata.name} is also Admin !` });

    } catch (error) {
        console.log(error)
        await t.rollback()
        res.status(500).json(error);

    }

}






exports.RemoveAdminFromGroup = async (req, res,) => {
    const t = await sequelize.transaction();
    try {

        let { email } = req.body
        let { groupId } = req.params
        // console.log("email>>>>>>>>", email, "groupid>>>>>>>>", groupId);

        let checkuserIsAdmin = await UserGroup.findOne({ where: { userId: req.userdata.id, groupId: groupId } });
        // console.log(checkuserIsAdmin);
        if (checkuserIsAdmin.isAdmin == false) {
            return res.status(500).json({ success: false, message: `Only Admin have this permission !` });
        }

        let checkAllAdmin = await UserGroup.findAll({ where: { isAdmin: true, groupId: groupId } });
        // console.log("checkAllAdmin>>>>>>>>>>>>>>>>>>",checkAllAdmin)

        if(checkAllAdmin.length == 1){
            return res.status(404).json({ success: false, message: `make another user as an Admin !` })
        }

        let userdata = await UserData.findOne({ where: { email: email } });


        const data = await UserGroup.update({
            isAdmin: false
        }, { where: { userId: userdata.id, groupId: groupId } });

        await t.commit()
        res.status(200).json({ success: true, message: `User ${userdata.name} is no longer admin now !` });;
    } catch (error) {
        // console.log(error)
        await t.rollback()
        res.status(500).json(error);

    }

}