import db from "../models/index"
const axios = require('axios')

let getSongNewRelease = () => {
    return new Promise(async (resolve, reject) => {
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

let getTopSongs = async () => {
    try {
        let data = await db.Song.findAll({
            limit: 5,
            order: [['totalListen', 'DESC']]
        })
        for (let i = 0; i < data.length; i++) {
            try {
                let result = await axios.get(`https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${data[i].keySource}`);
                let source = result.data.data.source['128']
                if(source !== data[i].source){
                    await updateSource(data[i].id, source)
                }
            } catch (error) {
                console.log(error);
            }
        }
        return data;
    } catch (error) {
        console.log(error)
    }
}

let updateSource = (idSong, source) => {
    return new Promise(async (resolve, reject) => {
        try {
            await db.Song.update({ source: source }, {
                where: {
                    id: idSong,
                },
            });
            resolve("update successful")
        } catch (error) {
            reject(error)
        }
    })
}

module.exports = {
    getSongNewRelease: getSongNewRelease,
    getTopSongs: getTopSongs,
}