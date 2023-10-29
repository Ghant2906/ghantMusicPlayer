import db from "../models/index"

let getArtistById = (idArtist) => {
    return new Promise(async (resolve, reject) => {
        try {
            let data = await db.Artist.findOne({
                attributes: ['id', 'name', 'avatar'],
                where: {id: idArtist}
            })
            resolve(data)
        } catch (error) {
            console.error('erro: ', error)
        }
    })
}

module.exports = {
    getArtistById: getArtistById
}