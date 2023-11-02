import songService from "../services/songService"
import artistService from "../services/artistService"

let getHomePage = async (req, res) => {
    let listSongNewRelease = await songService.getSongNewRelease()

    let listArtistSongNewRelease = await Promise.all(listSongNewRelease.map(({ idArtist }) => (artistService.getArtistById(idArtist))))

    let topSongs = await songService.getTopSongs()

    let listArtistTopSong = await Promise.all(topSongs.map(({ idArtist }) => (artistService.getArtistById(idArtist))))

    res.render('homePage.ejs', { listSong: listSongNewRelease, listArtist: listArtistSongNewRelease, topSongs: topSongs, listArtistTopSong: listArtistTopSong })
}

module.exports = {
    getHomePage: getHomePage,
}