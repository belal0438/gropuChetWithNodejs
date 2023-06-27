const SignUpData = require('../models/signup');
const sequelize = require('../util/database');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');


function IsStringInvalid(str) {
    if (str == undefined || str.length === 0) {
        return true
    } else {
        return false
    }
}


function generateAccesKey(id, name) {
    return jwt.sign({ userId: id, name: name }, process.env.TOKEN_SECRET)
}



exports.SignUpDatatForLogin = async (req, res, next) => {
    const t = await sequelize.transaction();
    try {
        const { email, password } = req.body

        if (IsStringInvalid(email) || IsStringInvalid(password)) {
            return res.status(400).json({ success: false, message: "Email id or Password is incorrect" })
        }

        let SignupData = await SignUpData.findAll({ where: { email: email } })
        // console.log(SignupData);
        if (SignupData.length > 0) {
            bcrypt.compare(password, SignupData[0].password, async (err, result) => {
                if (err) {
                    throw new Error('somthing went wrong')
                }
                if (result == true) {
                    await t.commit()
                    return res.status(200).json({
                        success: true, message: "User logged in succesfull",
                        token: generateAccesKey(SignupData[0].id, SignupData[0].name)
                    });
                } else {
                    await t.rollback()
                    return res.status(400).json({ success: false, message: "Password is incorrect" })
                }
            })
        } else {
            await t.rollback()
            return res.status(404).json({ success: false, message: "User doesnot Exist" })
        }



    } catch (err) {
        await t.rollback()
        // console.log(err)
        res.status(500).json({
            message: err,
            success: false
        })
    }
}
