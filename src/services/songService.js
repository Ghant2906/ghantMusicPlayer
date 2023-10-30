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
            reject(error)
        }
    })
}

let getTopSongs = () => {
    return new Promise( async (resolve, reject) => {
        try {
            let data = await db.Song.findAll({ 
                limit: 5,
                order: [['totalListen', 'DESC']]
                })
            resolve(data)        
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getSongNewRelease: getSongNewRelease,
    getTopSongs: getTopSongs,
}