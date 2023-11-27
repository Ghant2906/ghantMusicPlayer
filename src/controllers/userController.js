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
        if(data.errCode == 0){
            res.cookie('token', data.token);
        }
        return res.status(200).json({
            errCode: data.errCode,
            msg: data.msg
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
        idUser: dataUser.id,
        userName: dataUser.userName,
        email: dataUser.email
    })
}

let handleLogout = async (req, res) => {
    res.clearCookie('token');
    return res.status(200).json('delete token successful!')
}

let handleSendMailVerify = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            errCode: 1,
            msg: 'Missing required parameters'
        })
    } else {
        let message = await userService.sendMailVerify(req.body.email);
        return res.status(200).json(message)
    }
}

let getUserByTokenReset = async (req, res) =>{
    let data = await userService.getUserByTokenReset(req.params.token)
    if(data.errCode == 0){
        return res.status(200).json({
            errCode: data.errCode,
            userName: data.user.userName,
            email: data.user.email
        })
    }else{
        return res.status(200).json({
            errCode: data.errCode,
            msg: data.msg
        })
    }
}

let handleResetPassword = async (req, res) => {
    if (!req.body) {
        return res.status(400).json({
            errCode: 1,
            msg: 'Missing required parameters'
        })
    } else {
        let message = await userService.resetPassword(req.body.email, req.body.newPass);
        return res.status(200).json(message)
    }
}


module.exports = {
    handleLogin: handleLogin,
    handleCreateNewUser: handleCreateNewUser,
    getUserByToken: getUserByToken,
    handleLogout: handleLogout,
    handleSendMailVerify: handleSendMailVerify,
    getUserByTokenReset: getUserByTokenReset,
    handleResetPassword: handleResetPassword
}