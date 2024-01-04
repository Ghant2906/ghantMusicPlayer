import db from "../models/index"
import bcrypt from 'bcrypt'
const jwt = require('jsonwebtoken');
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
                    if (user.status != "Confirmed") {
                        userData.errCode = 3
                        userData.msg = 'User unconfirmed. Please check your email and verify to login!'
                    }else{
                        userData.errCode = 0
                        userData.msg = "OK"
                        userData.token = jwt.sign({ id: user.id, email: user.email, userName: user.userName }, process.env.KEY_COOKIE)
                    } 
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

let sendMailConfirm = (token, email) => {
    let link = `${process.env.CLIENT_URL}/api/confirmRegister/${token}`
    const mailOptions = {
        from: process.env.G_MAIL,
        to: email,
        subject: 'Confirm Register',
        text: `Click on the following link to confirm your account: ${link}.`,
    };
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error(error);
            return ({
                errCode: 1,
                msg: 'Internal Server Error'
            });
        } else {
            return ({
                errCode: 0,
                msg: 'Sent confirm your account to email successfully'
            });
        }
    });
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
                const token = jwt.sign({ email: data.email }, process.env.KEY_SECRET)
                sendMailConfirm(token, data.email)
                let hashPassword = await hashUserPassword(data.password);
                await db.User.create({
                    email: data.email,
                    password: hashPassword,
                    userName: data.userName,
                    status: "Unconfirmed"
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
            let dataToken = jwt.verify(token, process.env.KEY_COOKIE)
            resolve(dataToken)
        } catch (error) {
            reject(error)
        }

    })
}

let confirmRegister = async (token) => {
    let tokenVerify = jwt.verify(token, process.env.KEY_SECRET)
    let email = tokenVerify.email
    let user = await db.User.findOne({
        where: { email: email }
    })
    if (!user) {
        return ({
            errCode: 1,
            errMsg: "Invalid token!"
        })
    } else if (user.status == 'Confirmed') {
        return ({
            errCode: 0,
            errMsg: "Your account has been confirmed"
        })
    } else {
        await db.User.update({ status: "Confirmed" }, {
            where: { email: email }
        })
        return ({
            errCode: 0,
            msg: "Your account has been confirmed"
        })
    }
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
                msg: 'Invalid token!'
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

            await db.User.update({ password: hassPassword, tokenExpires: expires }, {
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
    resetPassword: resetPassword,
    confirmRegister: confirmRegister
}