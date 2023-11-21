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
        return data;
    } catch (error) {
        console.log(error)
    }
}

let getSearchSongs = async (nameSong) => {
    try {
        let data = await db.Song.findAll({
            where: Sequelize.literal(`MATCH (name) AGAINST ('${nameSong}')`),
        })
        for (let i = 0; i < data.length; i++) {
            try {       
                data[i].artist = await artistService.getArtistById(data[i].idArtist)
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