import songService from "../services/songService"

let getHomePage = (req, res) => {
    let listSong = songService.getSongNewRelease()
    console.log(listSong)
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