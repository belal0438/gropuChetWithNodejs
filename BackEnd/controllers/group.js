
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
        }, {through:{isAdmin: true }})

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
        const ArrayOfGroup = await Group.findAll({
            attributes: ["id", "groupName"]
        })


    
        // console.log(ArrayOfGroup);

        const groups = ArrayOfGroup.map(ele => {
            return { id: ele.id, name: ele.groupName }
        })
        // console.log(groups);
        // await t.commit()
        res.status(200).json({ success: true, groups });

    } catch (error) {
        await t.rollback()
        console.log(error);

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

        const CheckUser = await UserData.findOne({ where: { email: email } })
        //    console.log(CheckUser.id);

        if (!CheckUser) {
            return res.status(404).json({ success: false, email: email, message: "User Not Found" });
        }
       const usergroup = await UserGroup.findOne({where:{userId: CheckUser.id}});
    //    console.log(usergroup.userId);

       if(CheckUser.id === usergroup.userId){
        return res.status(409).json({ success: true, email: email, message: "User Already in the group" });
       }

        
        const groupUserdata = await UserGroup.create({
            userId: CheckUser.id,
            groupId: groupId,
            isAdmin: false
        })

        // console.log(groupUserdata)
        await t.commit()
        return res.status(201).json({ success: true, email: email, message: "User Add successfully" });

    } catch (err) {
        // console.log(err)
        await t.rollback()
        res.status(500).json(err);
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
        // console.log(groupUserData);

        await t.commit()
        return res.status(200).json({ success: true, message: groupUserData });

    } catch (error) {
        console.log(error);
        await t.rollback()
    }

}
