import artistService from "../services/artistService"

let getArtistById = async (req, res) => {
    let artist = await artistService.getArtistById(req.query.id)
    return res.status(200).json({
        artist: artist
    })
}

module.exports = {
    getArtistById: getArtistById
}