import songService from "../services/songService"

let getSongNewReleases = async (req, res) => {
    let listSong = await songService.getSongNewRelease()
    return res.status(200).json({
        listSong: listSong
    })
}

let getTopSongs = async (req, res) => {
    let topSongs = await songService.getTopSongs()
    return res.status(200).json({
        topSongs: topSongs
    })
}

module.exports = {
    getSongNewReleases: getSongNewReleases,
    getTopSongs: getTopSongs,
}