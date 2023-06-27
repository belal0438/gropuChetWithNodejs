
const sequelize = require('../util/database');
const Group = require('../models/group');
const UserData = require('../models/signup');
const UserGroup = require('../models/usergroup');
const { where } = require('sequelize');





function IsStringInvalid(str) {
    if (str == undefined || str.length === 0) {
        return true
    } else {
        return false
    }
}




exports.CreatGroupdata = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        const group_name = req.body.groupName;
        if (IsStringInvalid(group_name)) {
            return res.status(400).json({ message: "data is not present" })
        }
        // console.log("group name>>>>"+ group_Name);

        const groupNamedata = await Group.create({
            groupName: group_name
        }, { through: { isAdmin: true } })

        // console.log(groupNamedata)

        const groupUserdata = await UserGroup.create({
            userId: req.userdata.id,
            groupId: groupNamedata.id,
            isAdmin: true
        })


        await t.commit()
        return res.status(201).json({ success: true, name: groupNamedata.groupName, id: groupNamedata.id });

    } catch (err) {
        console.log(err)
        await t.rollback()
        res.status(500).json(err);
    }
}






exports.getGroupdata = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        // console.log("req.userdata.id>>>>>", req.userdata.id)
        let userGroup = await UserGroup.findAll({
            where: { userId: req.userdata.id },
            attributes: ["id", "groupId"]
        })
        // console.log("userGroup>>>>>>>>>>>>>", userGroup);
        let ArrayOfGroup = [];
        for (let i = 0; i < userGroup.length; i++) {
            let group = await Group.findOne({
                where: { id: userGroup[i].groupId },
                attributes: ["id", "groupName"]
            })
            ArrayOfGroup.push(group);
        }
        // console.log("ArrayOfGroup>>>>>>>>>",ArrayOfGroup)

        const groups = ArrayOfGroup.map(ele => {
            return { id: ele.id, name: ele.groupName }
        })
        // console.log(groups);
        await t.commit()
        res.status(200).json({ success: true, groups });

    } catch (error) {
        // console.log(error);
        await t.rollback()
        res.status(500).json(error);
    }

}







exports.GroupMemberAdd = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        const { groupId } = req.params;
        const { email } = req.body

        if (IsStringInvalid(groupId)) {
            return res.status(400).json({ message: "Group is not present" })
        }
        // console.log("group name>>>>"+ group_Name);


        const groupUser = await UserGroup.findAll({
            where: { groupId: groupId, userId: req.userdata.id },
        })

        // console.log("groupUserData>>>>>>>>>>",groupUser[0]);
        // console.log("groupUserData>>>>>>>>>>",groupUser[0].isAdmin);

        if (groupUser[0].isAdmin !== true) {
            return res.status(400).json({ success: false, email: email, message: "Only Admin Can Add User" });
        }

        const CheckUser = await UserData.findOne({ where: { email: email } })
        // console.log("CheckUser.id>>>>>>>>>>>>", CheckUser.id);

        if (!CheckUser) {
            return res.status(404).json({ success: false, email: email, message: "User Not Found" });
        }
        const usergroup = await UserGroup.findOne({ where: { userId: CheckUser.id } });
        // console.log(usergroup);
        if (usergroup) {
            return res.status(409).json({ success: true, email: email, message: "User Already in the group" });
        } else {
            const groupUserdata = await UserGroup.create({
                userId: CheckUser.id,
                groupId: groupId,
                isAdmin: false
            })
            await t.commit()
            return res.status(201).json({ success: true, email: email, message: "User Add successfully" });
        }
    } catch (error) {
        // console.log(err)
        await t.rollback()
        res.status(500).json(error);
    }
}



exports.getGroupUserdata = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { groupId } = req.params;
        const ArrayofIdgroupUser = await UserGroup.findAll({
            where: { groupId: groupId },
        })
        // console.log(ArrayofIdgroupUser);

        const Usergroups = ArrayofIdgroupUser.map(ele => {
            return { id: ele.id, userId: ele.userId, groupId: ele.groupId, isAdmin: ele.isAdmin }
        })

        // console.log(Usergroups);
        let groupUserData = [];
        for (let i = 0; i < Usergroups.length; i++) {
            //  console.log(groups[i]);
            let Userdata = await UserData.findOne({ where: { id: Usergroups[i].userId } });
            // // console.log(Userdata.name);
            let usrdata = { name: Userdata.name, email: Userdata.email, isAdmin: Usergroups[i].isAdmin }
            groupUserData.push(usrdata);
        }
        // console.log("groupUserData>>>>>>>>>>",groupUserData);
        await t.commit()
        return res.status(200).json({ success: true, message: groupUserData });

    } catch (error) {
        // console.log(error);
        await t.rollback()
        res.status(500).json(error);
    }

}






exports.forDeleteUserfromGroup = async (req, res) => {
    const t = await sequelize.transaction();
    try {
        let { email } = req.body
        let { groupId } = req.params
        // console.log("email>>>>>>>>", email, "groupid>>>>>>>>", groupId);


        let Usergroup = await UserGroup.findOne({ where: { userId: req.userdata.id, groupId: groupId } });

        if (!Usergroup) {
            return res.status(500).json({ success: false, message: `You are no longer in group !` });
        }

        if (Usergroup.isAdmin == false) {
            if (req.userdata.email == email) {
                await Usergroup.destroy();
                await t.commit()
                return res.status(200).json({ success: true, message: `User has been removed from group !` });
            }
            return res.status(404).json({ success: false, message: `Only admin can removed members from grou!` });
        }

        let Userdata = await UserData.findOne({ where: { email: email } });
        // console.log("req.userdata.id>>>>>>>>>", req.userdata.id)
        // console.log("Userdata.id>>>>>>>>", Userdata.id)

        let usergroup = await UserGroup.findOne({ where: { userId: Userdata.id } })
        // console.log(usergroup)
        if (usergroup.isAdmin === false) {
            usergroup.destroy();
            await t.commit()
            return res.status(204).json({ success: true, message: "user has been removed" });

        } else if (req.userdata.email == email) {
            return res.status(500).json({ success: false, message: `Admin have to remove admin himself before leaving group!` });
        } else {
            return res.status(500).json({ success: false, message: `first remove admin before deleting user!` });
        }

    } catch (error) {
        // console.log(error)
        await t.rollback()
        res.status(500).json(error);
    }

}
