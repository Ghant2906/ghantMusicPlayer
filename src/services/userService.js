import db from "../models/index"
import bcrypt from 'bcrypt'
var jwt = require('jsonwebtoken');
const { Op } = require('sequelize');
const nodemailer = require('nodemailer');
const crypto = require('crypto');
require('dotenv').config()

const salt = bcrypt.genSaltSync(10);

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.G_MAIL,
        pass: process.env.G_PASS,
    },
});

let handleUserLogin = (email, password) => {
    return new Promise(async (resolve, reject) => {
        try {
            let userData = {}
            let isExist = await checkEmail(email)
            if (isExist) {
                let user = await db.User.findOne({
                    where: { email: email },
                    raw: true
                })

                let checkPass = bcrypt.compareSync(password, user.password)
                if (checkPass) {
                    userData.errCode = 0
                    userData.msg = "OK"
                    userData.token = jwt.sign({ data: user.email }, 'mk')
                } else {
                    userData.errCode = 2
                    userData.msg = 'Wrong password'
                }
            } else {
                userData.errCode = 1
                userData.msg = `Your's email isn't exist`
            }
            resolve(userData)
        } catch (error) {
            reject(error)
        }
    })
}

let checkEmail = (userEmail) => {
    return new Promise(async (resolve, reject) => {
        try {
            let user = await db.User.findOne({
                where: { email: userEmail }
            })
            if (user) {
                resolve(true)
            } else {
                resolve(false)
            }
        } catch (e) {
            reject(e)
        }
    })
}


let hashUserPassword = (password) => {
    return new Promise(async (resolve, reject) => {
        try {
            var hash = await bcrypt.hashSync(password, salt);
            resolve(hash);
        } catch (e) {
            reject(e);
        }
    })
}

let createNewUser = (data) => {
    return new Promise(async (resolve, reject) => {
        try {
            let check = await checkEmail(data.email)
            if (check) {
                resolve({
                    errCode: 1,
                    msg: 'Your email is already!'
                })
            } else {
                let hashPassword = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    userName: data.userName
                })
                resolve({
                    errCode: 0,
                    msg: 'OK'
                })
            }
        } catch (e) {
            reject(e)
        }
    })
}

let getUserByToken = async (token) => {
    return new Promise(async (resolve, reject) => {
        try {
            let dataToken = await jwt.verify(token, 'mk')
            let email = dataToken.data
            let check = await checkEmail(email)
            if (check) {
                let user = await db.User.findOne({
                    attributes: ['id', 'userName', 'email'],
                    where: { email: email },
                    raw: true
                })
                resolve(user)
            } else {
                resolve(`Your's email isn't exist`)
            }
        } catch (error) {
            reject(error)
        }

    })
}

let sendMailVerify = async (email) => {
    return new Promise(async (resovle, reject) => {
        let isExist = await checkEmail(email)
        if (!isExist) {
            resovle({
                errCode: 1,
                msg: `Your's email isn't exist`
            })
        } else {
            const token = crypto.randomBytes(20).toString('hex');

            let now = new Date(Date.now() + 300000)
            const expires = now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });

            await db.User.update({ token: token, tokenExpires: expires }, {
                where: { email: email }
            })

            let link = `${process.env.CLIENT_URL}/reset-password/${token}`

            const mailOptions = {
                from: process.env.G_MAIL,
                to: email,
                subject: 'Reset Password',
                text: `Click on the following link to reset your password: ${link}.
                Note: Only valid for 5 minutes
                `,
            };

            transporter.sendMail(mailOptions, (error, info) => {
                if (error) {
                    console.error(error);
                    resovle({
                        errCode: 1,
                        msg: 'Internal Server Error'
                    });
                } else {
                    console.log('Email sent: ' + info.response);
                    resovle({
                        errCode: 0,
                        msg: 'Sent verify to email successfully'
                    });
                }
            });
        }
    })
}

let getUserByTokenReset = async (token) => {
    return new Promise(async (resolve, reject) => {
        let now = new Date(Date.now())
        let user = await db.User.findOne({
            where: { token: token, tokenExpires: { [Op.gt]: now } },
        })
        if (!user) {
            resolve({
                errCode: 1,
                msg: 'invalid token!'
            })
        } else {
            resolve({
                errCode: 0,
                user: user
            })
        }
    })
}

let resetPassword = async (email, newPass) => {
    return new Promise(async (resolve, reject) => {
        try {
            let hassPassword = await hashUserPassword(newPass)
            let now = new Date(Date.now() - 1000)
            const expires = now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' });

            await db.User.update({ password: hassPassword, tokenExpires: expires}, {
                where: { email: email }
            })
            resolve({
                errCode: 0,
                msg: 'Reset password successfully!'
            })
        } catch (error) {
            reject(error)
        }

    })
}

module.exports = {
    handleUserLogin: handleUserLogin,
    createNewUser: createNewUser,
    getUserByToken: getUserByToken,
    sendMailVerify: sendMailVerify,
    getUserByTokenReset: getUserByTokenReset,
    resetPassword: resetPassword
}