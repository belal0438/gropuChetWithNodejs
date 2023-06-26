const sequelize = require('../util/database');
const Chatdata = require('../models/chatdata');





function IsStringInvalid(str) {
    if (str == undefined || str.length === 0) {
        return true
    } else {
        return false
    }
}




exports.ChatdataPost = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        const data = req.body.data;
        const { groupId } = req.params
        if (IsStringInvalid(data)) {
            return res.status(400).json({ message: "data is not present" })
        }

        let chatdata = await Chatdata.create({
            data: `${req.userdata.name} : ${data}`,
            userId: req.userdata.id,
            groupId: groupId
        })

        await t.commit()
        res.status(201).json({ message: 'data send succesfully' });

    } catch (err) {
        console.log(err);
        await t.rollback()
        res.status(500).json(err);
    }
}




exports.getChatData = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        let getChatData = await Chatdata.findAll();
        await t.commit()
        return res.status(201).json(getChatData)
    } catch (err) {
        await t.rollback()
        return res.status(500).json({
            Error: err
        })
    }
}




exports.getGroupChatData = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        let getChatData = await Chatdata.findAll({ where: { groupId: req.params.groupId } });
        // console.log(getChatData);
        await t.commit()
        return res.status(201).json(getChatData)
    } catch (err) {
        // console.log(err);
        await t.rollback()
        return res.status(500).json({
            Error: err
        })
    }
}