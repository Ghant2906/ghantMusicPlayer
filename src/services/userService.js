import db from "../models/index"
import bcrypt from 'bcrypt'
var jwt = require('jsonwebtoken');

const salt = bcrypt.genSaltSync(10);

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
                    attributes: ['userName', 'email'],
                    where: { email: email },
                    raw: true
                })
                resolve(user)
            } else {
                resolve("Email không tồn tại!!!")
            }
        } catch (error) {
            reject(error)
        }

    })
}

let getPlaylistByIdUser = async (idUser) => {
    try {
        let data = await db.Playlist.findAll({
            where: { idUser: idUser },
            attributes: [],
            include: [
                {
                    model: db.PlaylistDetail,
                    attributes: [],
                    include: [
                        {
                            model: db.Song,
                            attributes: ['id', 'name', 'idArtist'],
                        },
                    ],
                },
                {
                    model: db.User,
                    attributes: ['userName']
                }
            ],
            raw: true,
            nest: true
        })

        // {userName: data[0].User.userName}
        let listSong = [];
        data.forEach( playlist => {
            listSong.push(playlist.PlaylistDetails.Song)
        });
        return listSong
    } catch (error) {
        console.log(error)
    }
}

let handleLogout = async (cookie) => {
    // try {
    //     let token = cookie.split('=')[1]
    //     (token)
    //     return 'logout successful!'
    // } catch (error) {
    //     console.log(error);
    // }
}

module.exports = {
    handleUserLogin: handleUserLogin,
    createNewUser: createNewUser,
    getUserByToken: getUserByToken,
    getPlaylistByIdUser: getPlaylistByIdUser,
    handleLogout: handleLogout
}