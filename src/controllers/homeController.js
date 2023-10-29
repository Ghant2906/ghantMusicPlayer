import songService from "../services/songService"
import artistService from "../services/artistService"

let getHomePage = async (req, res) => {
    let listSong = await songService.getSongNewRelease()

    let listArtist = await Promise.all(listSong.map(({ idArtist }) => (artistService.getArtistById(idArtist))))

    // let listArtist = {}
    // for(let i=0; i<listSong.length; i++){
    //     listArtist[i] = await artistService.getArtistById(listSong[i].idArtist)
    // }
    
    res.render('homePage.ejs', { listSong: listSong, listArtist: listArtist })
}

module.exports = {
    getHomePage: getHomePage,
}