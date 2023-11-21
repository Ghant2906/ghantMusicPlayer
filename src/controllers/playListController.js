import playlistService from "../services/playlistService"
import userService from "../services/userService"

let getPlaylistPage = async (req, res) => {
    let user = await userService.getUserByToken(req.cookies.token)
    let playlist = await playlistService.getPlaylistByIdUser(user.id)
    let userName = playlist.shift().userName
    return res.render('playlist.ejs', {userName: userName, listSong: playlist})
}

let getPlaylist = async (req, res) => {
    let playlist = await playlistService.getPlaylistByIdUser(req.params.idUser)
    return res.status(200).json({
        playlist: playlist
    })
}

let addToPlaylist = async (req, res) => {
    if (!req.body.idSong) {
        return res.status(400).json({
            errCode: 1,
            msg: 'There are no songs added to the playlist!'
        })
    } else {
        let message = await playlistService.addToPlaylist(req.body.idSong, req.cookies.token);
        return res.status(200).json(message)
    }
}

module.exports = {
    getPlaylist: getPlaylist,
    addToPlaylist: addToPlaylist,
    getPlaylistPage: getPlaylistPage
}