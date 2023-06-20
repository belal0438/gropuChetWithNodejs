const sequelize = require('../util/database');
const ChatData = require('../models/chatdata');



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
        
        if (IsStringInvalid(data)) {
            return res.status(400).json({ message: "data is not present" })
        }
        let chatdata = await ChatData.create({
            data: data
        })

        await t.commit()
        res.status(201).json({ message: 'data send succesfully' });

    } catch (err) {
        await t.rollback()
        res.status(500).json(err);
    }
}
