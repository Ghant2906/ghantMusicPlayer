import user from "../models/user";
import userService from "../services/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if(!email || !password){
        return res.status(500).json({
            errCode: 1,
            msg: 'Miising input'
        })
    }

    let userData = await userService.handleUserLogin(email, password)

    return res.status(200).json({
        errCode: userData.errCode,
        msg: userData.msg,
        user: userData.user
    })
}

let handleCreateNewUser = async (req, res) => {
    if(!req.body){
        return res.status(200).json({
            errCode: 1,
            msg: 'Missing required parameters'
        })
    }
    let message = await userService.createNewUser(req.body);
    return res.status(200).json(message)
}

module.exports = {
    handleLogin: handleLogin,
    handleCreateNewUser: handleCreateNewUser,
}