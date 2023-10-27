import db from '../models/index'

let getHomePage = (req, res) => {
    res.render('homePage.ejs')
}

module.exports = {
    getHomePage: getHomePage
}