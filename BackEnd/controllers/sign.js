const sequelize = require('../util/database');
const UserSignUp = require('../models/signup');
const bcrypt = require('bcrypt');


function IsStringInvalid(str) {
    if (str == undefined || str.length === 0) {
        return true
    } else {
        return false
    }
}




exports.UserSignupPost = async (req, res, next) => {
    const t = await sequelize.transaction();

    try {
        const name = req.body.name;
        const phone = req.body.phone;
        const email = req.body.email;
        const password = req.body.password

        if (IsStringInvalid(name) || IsStringInvalid(phone) || IsStringInvalid(email) || IsStringInvalid(password)) {
            return res.status(400).json({ err: ".somthing is missing" })
        }

        const signupUser = await UserSignUp.findOne({
            where: {
                phone: phone,
                email: email
            }
        });

        if (signupUser) {
            return res.status(403).json({ message: "User Already Exist" })
        } else {

            const saltRounds = 10;
            bcrypt.hash(password, saltRounds, async (err, hash) => {
                if (err) {
                    console.log(err);
                }

                let signuser = await UserSignUp.create({
                    name: name,
                    phone: phone,
                    email: email,
                    password: hash
                })

                await t.commit()
                res.status(201).json({ message: 'succesfully created' });

            });


        }

    } catch (err) {
        await t.rollback()
        res.status(500).json(err);
    }
}
