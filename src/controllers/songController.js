import songService from "../services/songService"

let getSongNewReleases = async (req, res) => {
    let listSong = await songService.getSongNewRelease()
    return res.status(200).json({
        listSong: listSong
    })
}

module.exports = {
    getSongNewReleases: getSongNewReleases,
}