import userService from "../services/userService"

let handleLogin = async (req, res) => {
    let email = req.body.email;
    let password = req.body.password;

    if (!email || !password) {
        res.status(400).json({
            errCode: 1,
            msg: 'Miising input'
        })
    } else {
        let userData = await userService.handleUserLogin(email, password)

        res.status(200).json({
            errCode: userData.errCode,
            msg: userData.msg,
            user: userData.user
        })
    }


}

let handleCreateNewUser = async (req, res) => {
    if (!req.body) {
        res.status(400).json({
            errCode: 1,
            msg: 'Missing required parameters'
        })
    }else{
        let message = await userService.createNewUser(req.body);
        res.status(200).json(message)
    }
}

module.exports = {
    handleLogin: handleLogin,
    handleCreateNewUser: handleCreateNewUser,
}