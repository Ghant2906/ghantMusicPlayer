import db from "../models/index"
const axios = require('axios')
const Sequelize = require('sequelize');
const Op = Sequelize.Op;
import artistService from '../services/artistService'

let getSongNewRelease = async () => {
    try {
        let data = await db.Song.findAll({
            limit: 12,
            order: [['createdAt', 'DESC']]
        })
        for (let i = 0; i < data.length; i++) {
            try {
                let result = await axios.get(`https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${data[i].keySource}`);
                let source = result.data.data.source['128']
                data.source = source
            } catch (error) {
                console.log(error);
            }
        }
        return data
    } catch (error) {
        console.log(error);
    }
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
                data.source = source
            } catch (error) {
                console.log(error);
            }
        }
        return data;
    } catch (error) {
        console.log(error)
    }
}

let getSearchSongs = async (nameSong) => {
    try {
        let data = await db.Song.findAll({
            where: {
                name: {
                    [Op.like]: '%' + nameSong + '%'
                }
            }
        })
        for (let i = 0; i < data.length; i++) {
            try {
                let result = await axios.get(`https://mp3.zing.vn/xhr/media/get-source?type=audio&key=${data[i].keySource}`);
                if (result.data.data) {
                    let source = result.data.data.source['128']
                    data[i].source = source
                    data[i].artist = await artistService.getArtistById(data[i].idArtist)
                }else{
                    console.log('abc: ', result)
                    console.log('eee: ', data[i].keySource)
                    break;
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

module.exports = {
    getSongNewRelease: getSongNewRelease,
    getTopSongs: getTopSongs,
    getSearchSongs, getSearchSongs
}