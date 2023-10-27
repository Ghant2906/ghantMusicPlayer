let getHomePage = (req, res) => {
    res.render('homePage.ejs')
}

let checkLogin = (req, res) => {
    isLogin = req.cookies.token
    if(isLogin){
        return true
    }else{
        return false
    }
}

module.exports = {
    getHomePage: getHomePage,
    checkLogin: checkLogin
}