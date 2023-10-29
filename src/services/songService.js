import db from "../models/index"

let getSongNewRelease = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.Song.findAll({ 
                limit: 12,
                order: [['createdAt', 'DESC']]
                })
            resolve(data)        
        } catch (error) {
            console.error('erro: ', error)
        }
    })
}

module.exports = {
    getSongNewRelease: getSongNewRelease,
}