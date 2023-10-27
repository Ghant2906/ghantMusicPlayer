import userService from "../services/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        return res.status(400).json({
            errCode: 1,
            msg: 'Miising input'
        })
    } else {
        let data = await userService.handleUserLogin(email, password)
        return res.status(200).json({
            errCode: data.errCode,
            msg: data.msg,
            token: data.token
        })
    }
}

let handleCreateNewUser = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            errCode: 1,
            msg: 'Missing required parameters'
        })
    } else {
        let message = await userService.createNewUser(req.body);
        return res.status(200).json(message)
    }
}

let getUserByToken = async (req, res) => {
    let dataUser = await userService.getUserByToken(req.params.token)
    return res.status(200).json({
        userName: dataUser.userName,
        email: dataUser.email
    })
}

module.exports = {
    handleLogin: handleLogin,
    handleCreateNewUser: handleCreateNewUser,
    getUserByToken: getUserByToken
}